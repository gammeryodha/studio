'use server';

/**
 * @fileOverview AI flow to suggest improvements to a generated video based on quality and engagement metrics.
 *
 * - suggestVideoImprovements - A function that takes a video and suggests improvements.
 * - SuggestVideoImprovementsInput - The input type for the suggestVideoImprovements function.
 * - SuggestVideoImprovementsOutput - The return type for the suggestVideoImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVideoImprovementsInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      'The video to analyze, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  title: z.string().describe('The title of the video.'),
  description: z.string().describe('The description of the video.'),
  tags: z.string().describe('The tags associated with the video.'),
});
export type SuggestVideoImprovementsInput = z.infer<
  typeof SuggestVideoImprovementsInputSchema
>;

const SuggestVideoImprovementsOutputSchema = z.object({
  suggestedTitle: z.string().describe('The suggested title for the video.'),
  suggestedDescription: z
    .string()
    .describe('The suggested description for the video.'),
  suggestedTags: z.string().describe('The suggested tags for the video.'),
  suggestedEdits: z
    .string()
    .describe('The suggested edits for the video.'),
});
export type SuggestVideoImprovementsOutput = z.infer<
  typeof SuggestVideoImprovementsOutputSchema
>;

export async function suggestVideoImprovements(
  input: SuggestVideoImprovementsInput
): Promise<SuggestVideoImprovementsOutput> {
  return suggestVideoImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestVideoImprovementsPrompt',
  input: {schema: SuggestVideoImprovementsInputSchema},
  output: {schema: SuggestVideoImprovementsOutputSchema},
  prompt: `You are an AI video expert specializing in suggesting improvements to video content.

You will use the video title, description and tags, to suggest improvements to the video, and suggest edits to improve the video quality and engagement metrics. 

Video Title: {{{title}}}
Video Description: {{{description}}}
Video Tags: {{{tags}}}
Video: {{media url=videoDataUri}}

Consider the following aspects when suggesting edits:
- Content: Is the content engaging and informative?
- Visuals: Is the video visually appealing and well-edited?
- Audio: Is the audio clear and of good quality?
- SEO: Are the title, description, and tags optimized for search engines?

Output the suggested title, description, tags, and edits in the appropriate fields.`,
});

const suggestVideoImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestVideoImprovementsFlow',
    inputSchema: SuggestVideoImprovementsInputSchema,
    outputSchema: SuggestVideoImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
