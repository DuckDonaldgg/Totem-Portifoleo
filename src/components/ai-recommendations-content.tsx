import { recommendRelatedContent, type PortfolioItem, type RecommendRelatedContentOutput } from '@/ai/flows/recommend-related-content';
import { allPortfolioItems, mediaQueue } from '@/lib/data';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bot } from 'lucide-react';

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function AiRecommendationsContent() {
  const currentQueueForAI: PortfolioItem[] = [];
  if (mediaQueue.length > 0) {
    const firstItem = mediaQueue[0];
    if (firstItem.type === 'video') {
      currentQueueForAI.push({
        type: 'video',
        url: `https://www.youtube.com/watch?v=${firstItem.id}`,
        metadata: firstItem.metadata
      });
    } else if (firstItem.type === 'photos' && firstItem.items.length > 0) {
      currentQueueForAI.push({
        type: 'photo',
        url: firstItem.items[0].url,
        metadata: firstItem.metadata,
      });
    }
  }

  const currentQueueUrls = mediaQueue.flatMap(item =>
    item.type === 'video' ? `https://www.youtube.com/watch?v=${item.id}` : item.items.map(p => p.url)
  );

  const portfolioItemsForAI = allPortfolioItems.filter(item => !currentQueueUrls.includes(item.url));

  let output: RecommendRelatedContentOutput;
  try {
    output = await recommendRelatedContent({
      currentQueue: currentQueueForAI,
      portfolioItems: portfolioItemsForAI,
      numRecommendations: 3,
    });
  } catch (error) {
    console.error("Failed to generate AI recommendations:", error);
    output = { recommendations: [] };
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 h-full">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          AI Content Recommendations
        </SheetTitle>
        <SheetDescription>
          Based on the portfolio's content, here are some suggested additions to the queue.
        </SheetDescription>
      </SheetHeader>
      <div className="space-y-6 py-4">
        {output.recommendations.map((rec, index) => {
          const videoId = rec.item.type === 'video' ? getYouTubeId(rec.item.url) : null;
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : rec.item.url;

          const title = (rec.item.metadata?.title as string) || (rec.item.metadata?.category as string) || `Recommended ${rec.item.type}`;

          return (
            <Card key={index} className="overflow-hidden border-accent/20 bg-background/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-primary">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
                  <Image src={thumbnailUrl} alt="Recommendation thumbnail" fill className="object-cover" data-ai-hint="recommendation thumbnail" sizes="(max-width: 768px) 100vw, 450px" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-semibold text-foreground">Reason:</span> {rec.reason}
                </p>
                {rec.similarityScore && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Similarity:</span> {Math.round(rec.similarityScore * 100)}%
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
        {output.recommendations.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            <p>No new recommendations at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
