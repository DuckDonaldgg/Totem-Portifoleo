'use server';

/**
 * @fileOverview Recommends related content for the portfolio display queue.
 *
 * - recommendRelatedContent - A function that suggests related content based on portfolio items.
 * - RecommendRelatedContentInput - The input type for the recommendRelatedContent function.
 * - RecommendRelatedContentOutput - The return type for the recommendRelatedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioItemSchema = z.object({
  type: z.enum(['photo', 'video']).describe('The type of portfolio item.'),
  url: z.string().url().describe('The URL of the portfolio item.'),
  metadata: z.record(z.any()).optional().describe('Optional metadata associated with the item, such as tags, descriptions, or categories.'),
});

export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;

const RecommendRelatedContentInputSchema = z.object({
  currentQueue: z.array(PortfolioItemSchema).describe('The current queue of portfolio items.'),
  portfolioItems: z.array(PortfolioItemSchema).describe('The available portfolio items to choose from.'),
  numRecommendations: z.number().int().positive().default(3).describe('The number of related content recommendations to return.'),
});

export type RecommendRelatedContentInput = z.infer<typeof RecommendRelatedContentInputSchema>;

const RecommendationSchema = z.object({
  item: PortfolioItemSchema.describe('The recommended portfolio item.'),
  reason: z.string().describe('The reason why this item is recommended.'),
  similarityScore: z.number().optional().describe('A score indicating the similarity between the recommended item and the current queue.'),
});

const RecommendRelatedContentOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('The list of recommended portfolio items.'),
});

export type RecommendRelatedContentOutput = z.infer<typeof RecommendRelatedContentOutputSchema>;

export async function recommendRelatedContent(input: RecommendRelatedContentInput): Promise<RecommendRelatedContentOutput> {
  return recommendRelatedContentFlow(input);
}

const recommendRelatedContentPrompt = ai.definePrompt({
  name: 'recommendRelatedContentPrompt',
  input: {schema: RecommendRelatedContentInputSchema},
  output: {schema: RecommendRelatedContentOutputSchema},
  prompt: `You are an AI assistant that recommends related content for a portfolio display queue.

  Analyze the current queue of portfolio items and suggest new items from the available portfolio items to add to the queue.
  Consider the type of item (photo or video), the content itself (based on a high-level understanding of the URL), and any available metadata (tags, descriptions, categories) to determine similarity and relevance.

  Current Queue:
  {{#each currentQueue}}
  - Type: {{this.type}}, URL: {{this.url}}, Metadata: {{JSONstringify this.metadata}}}
  {{/each}}

  Available Portfolio Items:
  {{#each portfolioItems}}
  - Type: {{this.type}}, URL: {{this.url}}, Metadata: {{JSONstringify this.metadata}}}
  {{/each}}

  Number of Recommendations: {{numRecommendations}}

  Format your response as a JSON object with a 'recommendations' array. Each recommendation should include the 'item' (the recommended portfolio item), a 'reason' for the recommendation, and an optional 'similarityScore' (a number between 0 and 1, where 1 is the most similar).
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const recommendRelatedContentFlow = ai.defineFlow(
  {
    name: 'recommendRelatedContentFlow',
    inputSchema: RecommendRelatedContentInputSchema,
    outputSchema: RecommendRelatedContentOutputSchema,
  },
  async input => {
    const {output} = await recommendRelatedContentPrompt(input);
    return output!;
  }
);
