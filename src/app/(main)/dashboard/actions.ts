'use server';

import { generateVideoFromText, GenerateVideoOutput } from '@/ai/flows/generate-video-from-text';
import { suggestVideoImprovements, SuggestVideoImprovementsInput, SuggestVideoImprovementsOutput } from '@/ai/flows/suggest-video-improvements';
import { uploadVideoToYouTube, YouTubeUploadInput } from '@/lib/youtube';
import { z } from 'zod';

const generateVideoSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
});

export async function generateVideoAction(
  prevState: any,
  formData: FormData
): Promise<{ error?: string; data?: GenerateVideoOutput }> {
  const validatedFields = generateVideoSchema.safeParse({
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.prompt?.join(', ') };
  }

  try {
    const result = await generateVideoFromText({ prompt: validatedFields.data.prompt });
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate video. Please try again.' };
  }
}

export async function suggestImprovementsAction(
  input: SuggestVideoImprovementsInput
): Promise<{ error?: string; data?: SuggestVideoImprovementsOutput }> {
  try {
    const result = await suggestVideoImprovements(input);
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to get suggestions. Please try again.' };
  }
}


export async function publishToYouTubeAction(
  input: YouTubeUploadInput
): Promise<{ error?: string; data?: { videoId: string } }> {
  try {
    const result = await uploadVideoToYouTube(input);
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to publish to YouTube. Please try again.' };
  }
}
