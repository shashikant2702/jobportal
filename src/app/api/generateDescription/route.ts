import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Use the appropriate model
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 150,  // You can adjust this based on your needs
    });

    const description = completion.choices[0].message.content.trim();
    return NextResponse.json({ description }, { status: 200 });
  } catch (error) {
    console.error('Error generating description:', error);
    return NextResponse.json(
      { message: 'Error generating description', error: error.message },
      { status: 500 }
    );
  }
}
