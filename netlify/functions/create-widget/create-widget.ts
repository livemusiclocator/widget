import { Handler } from '@netlify/functions';
import { z } from 'zod';

const widgetConfigSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  organization: z.string().optional(),
  location: z.string().min(1),
  depth: z.number().min(2).max(5),
  width: z.number().min(300).max(800),
  timeFrame: z.enum(['tonight', 'tomorrow', 'weekend']),
  range: z.number().min(1).max(100),
  displayElements: z.object({
    artistName: z.boolean(),
    venue: z.boolean(),
    time: z.boolean(),
    price: z.boolean(),
    genre: z.boolean(),
  }),
  design: z.enum(['minimal', 'detailed']),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const config = widgetConfigSchema.parse(body);

    // Generate a unique widget ID
    const widgetId = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In a real application, you would:
    // 1. Save the configuration to a database
    // 2. Generate the widget code
    // 3. Return the embed code and widget ID

    const embedCode = `<iframe src="https://your-domain.netlify.app/widget/${widgetId}" width="${config.width}" height="500" frameborder="0"></iframe>`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        widgetId,
        embedCode,
        config,
      }),
    };
  } catch (error) {
    console.error('Error creating widget:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid widget configuration',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};