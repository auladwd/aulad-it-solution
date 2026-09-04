import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }

    // In production, send email via nodemailer or a service like EmailJS/Resend
    // For now, we log and return success
    console.log('Contact form submission:', { name, email, phone, message });

    return NextResponse.json(
      { success: true, message: 'Message received! We will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
