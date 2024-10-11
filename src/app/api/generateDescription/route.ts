import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',  // Updated URL for chat-based models
      {
        model: 'gpt-3.5-turbo',  // Use gpt-3.5-turbo for better performance
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,  // Adjust tokens based on the expected length
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    

    const description = response.data.choices[0].text.trim();
    return NextResponse.json({ description }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error generating description', error: error.message },
      { status: 500 }
    );
  }
}
