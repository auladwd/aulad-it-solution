import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // Increment views
    blog.views += 1;
    await blog.save();
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();
    const blog = await Blog.findOneAndUpdate({ slug }, body, { new: true });
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    await Blog.findOneAndDelete({ slug });
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
