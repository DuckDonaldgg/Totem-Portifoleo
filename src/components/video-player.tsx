'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Skeleton } from './ui/skeleton';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface VideoPlayerProps {
  videoId: string;
  onEnded: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain';
}

let apiReadyPromise: Promise<void> | null = null;

function loadYouTubeAPI() {
  if (apiReadyPromise) {
    return apiReadyPromise;
  }

  apiReadyPromise = new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
      resolve();
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  });

  return apiReadyPromise;
}

export function VideoPlayer({ videoId, onEnded, onError, objectFit = 'contain' }: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use a stable ID for the player container
  const playerContainerId = `youtube-player-${React.useId()}`;

  useEffect(() => {
    loadYouTubeAPI().then(() => setIsApiReady(true));

    return () => {
      // Clean up player on unmount
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const onPlayerStateChange = useCallback((event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsLoading(false);
    }
    if (event.data === window.YT.PlayerState.ENDED) {
      onEnded();
    }
  }, [onEnded]);

  const onPlayerError = useCallback((event: any) => {
    console.error('YouTube Player Error:', event.data);
    if (onError) {
      onError();
    } else {
      // Fallback: if no error handler, try to skip (by treating as ended)
      onEnded();
    }
  }, [onError, onEnded]);

  useEffect(() => {
    if (isApiReady) {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      const player = new window.YT.Player(playerContainerId, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 0,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.unMute();
            event.target.setVolume(100);
            event.target.playVideo();
          },
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
      playerRef.current = player;
    }
  }, [videoId, isApiReady, onPlayerStateChange, onPlayerError, playerContainerId]);

  // CSS for "cover" effect on an iframe is non-trivial.
  // One way is to scale the iframe.
  // A cleaner way for "cover" on 16:9 content in arbitrary container:
  // If container is taller than 16:9, we need to increase width and shift left.
  // If container is wider than 16:9, we need to increase height and shift up.
  // BUT, we can't easily know container aspect ratio in JS without resize listeners.
  // A CSS-only approximation using a wrapper:
  // pointer-events: none because we are zooming and might obscure controls (but controls are off).

  const coverStyle: React.CSSProperties = objectFit === 'cover' ? {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '177.78vh', // 16:9 aspect ratio (16/9 * 100vh)
    height: '100vh',
    minWidth: '100%',
    minHeight: '56.25vw', // 9/16 * 100vw
    transform: 'translate(-50%, -50%)',
  } : {};
  // Note: The simple CSS above is a common trick but has edge cases. 
  // For a robust universal "cover", we'd need JS to calculate window aspect ratio.
  // Given this is a totem, likely full screen 1080x1920 (9:16).
  // If 9:16, 177.78vh width will be huge, ensuring coverage.
  // If 16:9, 100vh height ensures coverage.

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full z-10" />}
      <div className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {objectFit === 'cover' ? (
          <div style={coverStyle}>
            <div id={playerContainerId} className="w-full h-full" />
          </div>
        ) : (
          <div id={playerContainerId} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
