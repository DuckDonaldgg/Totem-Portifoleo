'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface PhotoCarouselProps {
  items: { url: string; hint: string; legend?: string }[];
  onFinished: () => void;
  objectFit?: 'cover' | 'contain';
}

const PHOTO_DISPLAY_DURATION = 8000; // 8 seconds per photo
const TOTAL_LOOPS = 1;

const ANIMATION_VARIANTS = [
  "animate-in fade-in duration-1000 zoom-in-95",
  "animate-in slide-in-from-right-12 duration-1000 fade-in",
  "animate-in slide-in-from-bottom-12 duration-1000 fade-in",
  "animate-in slide-in-from-left-12 duration-1000 fade-in",
  "animate-in zoom-in-50 duration-1000 fade-in"
];

export function PhotoCarousel({ items, onFinished, objectFit = 'contain' }: PhotoCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api || items.length === 0) {
      return;
    }

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    const interval = setInterval(() => {
      api.scrollNext();
    }, PHOTO_DISPLAY_DURATION);

    const totalDuration = items.length * PHOTO_DISPLAY_DURATION * TOTAL_LOOPS;
    const finishTimeout = setTimeout(onFinished, totalDuration);

    return () => {
      api.off('select', onSelect);
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, [api, items, onFinished]);

  if (items.length === 0) {
    // Handle empty items array, maybe show a placeholder or finish immediately
    React.useEffect(() => onFinished(), [onFinished]);
    return null;
  }

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full"
      opts={{ loop: true }}
    >
      <CarouselContent className="h-full">
        {items.map((item, index) => (
          <CarouselItem key={index} className="h-full">
            <div className={cn(
              "relative w-full h-full transition-all",
              index === currentIndex && "z-10",
              index === currentIndex && ANIMATION_VARIANTS[index % ANIMATION_VARIANTS.length]
            )}>
              <Image
                src={item.url}
                alt={`Imagem do portfólio ${index + 1}`}
                fill
                className={objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                data-ai-hint={item.hint}
                priority={index === 0}
                sizes="100vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Show the fallback element (last child of parent)
                  const parent = target.parentElement;
                  if (parent && parent.lastElementChild) {
                    (parent.lastElementChild as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
              {item.legend && (
                <div className="absolute bottom-20 left-4 right-4 md:left-12 md:right-12 z-20">
                  <div className="bg-black/60 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-2xl animate-in slide-in-from-bottom-5 duration-1000 fade-in delay-500 fill-mode-forwards">
                    <p className="text-white/90 text-lg md:text-2xl font-light tracking-wide text-center leading-relaxed">
                      {item.legend}
                    </p>
                  </div>
                </div>
              )}
              <div className="hidden absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-500">
                <span className="text-sm font-medium">Imagem indisponível</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
