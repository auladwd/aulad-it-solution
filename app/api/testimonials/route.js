import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ testimonials }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
