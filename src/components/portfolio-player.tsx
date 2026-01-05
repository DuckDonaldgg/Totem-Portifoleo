'use client';
import { useState, useEffect, useCallback } from 'react';
import { mediaQueue, type MediaQueueItem } from '@/lib/data';
import { VideoPlayer } from './video-player';
import { PhotoCarousel } from './photo-carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { DynamicBackground } from './dynamic-background';

export function PortfolioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState<MediaQueueItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    // Set a short timeout to allow for fade-out/fade-in animations
    const transitionTimeout = setTimeout(() => {
      setCurrentItem(mediaQueue[currentIndex]);
      setIsTransitioning(false);
    }, 500); // Corresponds to animation duration

    return () => clearTimeout(transitionTimeout);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % mediaQueue.length);
  }, []);

  if (!currentItem) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <DynamicBackground />
      <div className={`absolute inset-0 transition-opacity duration-500 z-10 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentItem.type === 'video' && (
          <VideoPlayer
            key={currentIndex}
            videoId={currentItem.id}
            onEnded={handleNext}
            onError={handleNext}
            objectFit={currentItem.objectFit || 'cover'}
          />
        )}
        {currentItem.type === 'photos' && (
          <PhotoCarousel key={currentIndex} items={currentItem.items} onFinished={handleNext} objectFit={currentItem.objectFit} />
        )}
      </div>
    </div>
  );
}
