import { PortfolioPlayer } from '@/components/portfolio-player';
import { AiRecommendationsSheet } from '@/components/ai-recommendations-sheet';
import { AiRecommendationsContent } from '@/components/ai-recommendations-content';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Force dynamic rendering to check for new content on every request.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-background">
      <PortfolioPlayer />
      <AiRecommendationsSheet>
        <Suspense fallback={<div className="p-6 space-y-4"><Skeleton className="h-24 w-full" /><Skeleton className="h-64 w-full" /><Skeleton className="h-64 w-full" /></div>}>
          {/* <AiRecommendationsContent /> */}
          <div className="p-6">AI Recommendations temporarily disabled for build</div>
        </Suspense>
      </AiRecommendationsSheet>
    </main>
  );
}
