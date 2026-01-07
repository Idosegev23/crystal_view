import { NextRequest, NextResponse } from 'next/server';

// Webhook URL for Make.com
const WEBHOOK_URL = 'https://hook.eu2.make.com/hn8e72n6utmqwvv67i789e67olok91q1';

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9\-\s\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export async function POST(request: NextRequest) {
  console.log('API: Request received');
  try {
    // Parse request body
    const body = await request.json();
    console.log('API: Body parsed:', { name: body.name, phone: body.phone, email: body.email });
    const { name, phone, email, message } = body;

    // Validation
    if (!name || !phone) {
      console.log('API: Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'שם וטלפון הם שדות חובה' },
        { status: 400 }
      );
    }
    console.log('API: Initial validation passed');

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'מספר טלפון לא תקין' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      email: sanitizeInput(email),
      message: message ? sanitizeInput(message) : '',
    };

    // Send to Webhook (Make.com)
    console.log('API: Sending to webhook...');
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...sanitizedData,
        source: 'Crystal View Website',
        timestamp: new Date().toISOString(),
      }),
    });

    console.log('API: Webhook response status:', webhookResponse.status);

    if (!webhookResponse.ok) {
      console.error('API: Webhook failed with status:', webhookResponse.status);
      return NextResponse.json(
        { error: 'אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.' },
        { status: 500 }
      );
    }

    // Success response
    console.log('API: Success! Message sent via webhook');
    return NextResponse.json(
      { 
        success: true,
        message: 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.',
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('API: Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'אירעה שגיאה בלתי צפויה.',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
