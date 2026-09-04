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

    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'auladdevops@gmail.com';
    const isSoleAdmin = email === ADMIN_EMAIL || email === 'auladdevops@gmail.com';

    if (!user) {
      user = await User.create({
        name,
        email,
        image,
        firebaseUid,
        role: isSoleAdmin ? 'admin' : 'user',
      });
    } else {
      // Update existing user info
      user.name = name || user.name;
      user.image = image || user.image;
      user.firebaseUid = firebaseUid || user.firebaseUid;
      user.role = isSoleAdmin ? 'admin' : 'user';
      await user.save();
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
