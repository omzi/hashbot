import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
