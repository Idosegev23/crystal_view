import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateContactEmailHTML, generateContactEmailText } from '@/lib/email-templates';

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
    if (!name || !phone || !email) {
      console.log('API: Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'שם, טלפון ואימייל הם שדות חובה' },
        { status: 400 }
      );
    }
    console.log('API: Initial validation passed');

    if (!isValidEmail(email)) {
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
    try {
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
    } catch (webhookError) {
      console.error('API: Webhook error (non-blocking):', webhookError);
      // Continue with email sending even if webhook fails
    }

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO;

    console.log('API: Checking env vars...', {
      hasGmailUser: !!gmailUser,
      hasGmailPassword: !!gmailPassword,
      hasContactEmailTo: !!contactEmailTo,
      gmailUser: gmailUser // Show actual value for debugging
    });

    if (!gmailUser || !gmailPassword || !contactEmailTo) {
      console.error('API: Missing email configuration!');
      return NextResponse.json(
        { error: 'תצורת השרת אינה מוגדרת כראוי' },
        { status: 500 }
      );
    }
    console.log('API: Env vars OK');

    // Create transporter
    console.log('API: Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Verify transporter
    console.log('API: Verifying transporter...');
    try {
      await transporter.verify();
      console.log('API: Transporter verified successfully');
    } catch (verifyError: any) {
      console.error('API: Transporter verification failed:', {
        error: verifyError,
        message: verifyError?.message,
        code: verifyError?.code,
        command: verifyError?.command
      });
      return NextResponse.json(
        { 
          error: 'שגיאה בהתחברות לשרת המייל', 
          details: verifyError?.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Email options
    const mailOptions = {
      from: {
        name: 'Crystal View Website',
        address: gmailUser,
      },
      to: contactEmailTo,
      replyTo: sanitizedData.email,
      subject: `הודעה חדשה מ-${sanitizedData.name} | Crystal View`,
      text: generateContactEmailText(sanitizedData),
      html: generateContactEmailHTML(sanitizedData),
    };

    // Send email
    console.log('API: Sending email...');
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('API: Email sent successfully!', {
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected
      });
      
      // Success response
      return NextResponse.json(
        { 
          success: true,
          message: 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.',
          messageId: info.messageId
        },
        { status: 200 }
      );
    } catch (sendError: any) {
      console.error('API: Error sending email:', {
        error: sendError,
        message: sendError?.message,
        code: sendError?.code
      });
      return NextResponse.json(
        { 
          error: 'אירעה שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.',
          details: sendError?.message || 'Unknown error'
        },
        { status: 500 }
      );
    }

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

