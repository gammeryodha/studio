'use server';

import { google } from 'googleapis';
import { Readable } from 'stream';

export interface YouTubeUploadInput {
    videoDataUri: string;
    title: string;
    description: string;
    tags: string;
}

export async function uploadVideoToYouTube(
  input: YouTubeUploadInput
): Promise<{ videoId: string }> {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured. Please set YOUTUBE_API_KEY in your .env file.');
  }

  // NOTE: For a real application, you would use OAuth2 to get an access token
  // from the user to upload on their behalf. Using an API key for this is not
  // standard and is only for demonstration purposes here as it requires
  // a more complex OAuth flow to be set up.
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  const base64Data = input.videoDataUri.split(';base64,').pop();
  if (!base64Data) {
      throw new Error('Invalid video data URI.');
  }

  const videoBuffer = Buffer.from(base64Data, 'base64');
  const videoStream = new Readable();
  videoStream.push(videoBuffer);
  videoStream.push(null);

  try {
    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: input.title,
          description: input.description,
          tags: input.tags.split(',').map(tag => tag.trim()),
          categoryId: '28', // Science & Technology
        },
        status: {
          privacyStatus: 'private', // or 'public', 'unlisted'
        },
      },
      media: {
        body: videoStream,
      },
    });

    const videoId = response.data.id;
    if (!videoId) {
        throw new Error('Failed to get video ID from YouTube API response.');
    }

    return { videoId };
  } catch (error: any) {
    console.error('Error uploading to YouTube:', error.message);
    throw new Error(`Failed to upload to YouTube: ${error.message}`);
  }
}
