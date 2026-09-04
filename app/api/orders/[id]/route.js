import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const order = await Order.findById(id).populate('service');
    if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    if (body.status === 'completed') body.completedAt = new Date();
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
