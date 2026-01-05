import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

let aiInstance;

if (apiKey) {
  try {
    aiInstance = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    });
  } catch (e) {
    console.warn("Failed to initialize Genkit:", e);
    aiInstance = createMockAi();
  }
} else {
  console.warn("GOOGLE_GENAI_API_KEY not found. AI features will be disabled.");
  aiInstance = createMockAi();
}

function createMockAi() {
  return {
    definePrompt: (config: any) => {
      return async (input: any) => {
        console.warn("AI Prompt executed in mock mode.");
        return { output: { recommendations: [] } }; // Mock specific for our use case or generic
      };
    },
    defineFlow: (config: any, fn: any) => {
      // Return the function itself or a wrapper
      return async (input: any) => {
        console.warn("AI Flow executed in mock mode.");
        try {
          return await fn(input);
        } catch (e) {
          return { recommendations: [] }; // Fallback
        }
      };
    },
    generate: async () => ({ text: "AI disabled" }),
  } as any;
}

export const ai = aiInstance;
