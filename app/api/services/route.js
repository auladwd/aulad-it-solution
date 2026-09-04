import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 50;

    let query = { isActive: true };
    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const services = await Service.find(query).sort({ isFeatured: -1, createdAt: -1 }).limit(limit);
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const service = await Service.create(body);
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
