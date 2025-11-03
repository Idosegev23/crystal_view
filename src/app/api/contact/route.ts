import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateContactEmailHTML, generateContactEmailText } from '@/lib/email-templates';

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
  try {
    // Parse request body
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'שם, טלפון ואימייל הם שדות חובה' },
        { status: 400 }
      );
    }

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

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO;

    if (!gmailUser || !gmailPassword || !contactEmailTo) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { error: 'תצורת השרת אינה מוגדרת כראוי' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Verify transporter
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return NextResponse.json(
        { error: 'שגיאה בהתחברות לשרת המייל' },
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
    await transporter.sendMail(mailOptions);

    // Success response
    return NextResponse.json(
      { 
        success: true,
        message: 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'אירעה שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.' },
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

