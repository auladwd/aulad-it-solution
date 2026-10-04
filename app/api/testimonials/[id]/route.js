import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'মতামত মুছে ফেলা হয়েছে।' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'সমস্যা হয়েছে।' }, { status: 500 });
  }
}
