import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });

    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ _id: slug }, { slug }], isActive: true }
      : { slug, isActive: true };

    const service = await Service.findOne(query);
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const body = await request.json();

    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ _id: slug }, { slug }] }
      : { slug };

    const service = await Service.findOneAndUpdate(query, body, { new: true });
    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ _id: slug }, { slug }] }
      : { slug };

    await Service.findOneAndDelete(query);
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
