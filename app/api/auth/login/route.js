import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { token, name, email, image, firebaseUid } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      user = await User.create({
        name,
        email,
        image,
        firebaseUid,
        role: email === adminEmail ? 'admin' : 'user',
      });
    } else {
      // Update existing user info
      user.name = name || user.name;
      user.image = image || user.image;
      user.firebaseUid = firebaseUid || user.firebaseUid;
      await user.save();
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
