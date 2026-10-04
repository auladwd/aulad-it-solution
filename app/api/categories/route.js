import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export const dynamic = 'force-dynamic';

const DEFAULT_CATEGORIES = [
  { name: 'School', nameBn: 'স্কুল', slug: 'school', icon: '🏫', color: '#7C3AED', order: 1 },
  { name: 'College', nameBn: 'কলেজ', slug: 'college', icon: '🎓', color: '#0891B2', order: 2 },
  { name: 'Madrasa', nameBn: 'মাদরাসা', slug: 'madrasa', icon: '🕌', color: '#15803D', order: 3 },
  { name: 'Clinic', nameBn: 'ক্লিনিক', slug: 'clinic', icon: '🩺', color: '#BE185D', order: 4 },
  { name: 'Hospital', nameBn: 'হাসপাতাল', slug: 'hospital', icon: '🏥', color: '#C2410C', order: 5 },
  { name: 'Grocery', nameBn: 'মুদি দোকান', slug: 'grocery', icon: '🛒', color: '#B45309', order: 6 },
  { name: 'E-Commerce', nameBn: 'ই-কমার্স', slug: 'ecommerce', icon: '🛍️', color: '#7C3AED', order: 7 },
  { name: 'Portfolio', nameBn: 'পোর্টফোলিও', slug: 'portfolio', icon: '💼', color: '#4338CA', order: 8 },
  { name: 'Other', nameBn: 'অন্যান্য', slug: 'other', icon: '🌐', color: '#475569', order: 9 },
];

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true'; // if true, include inactive

    let count = await Category.countDocuments();
    if (count === 0) {
      // Auto seed default categories
      await Category.insertMany(DEFAULT_CATEGORIES);
    }

    const filter = all ? {} : { isActive: true };
    const categories = await Category.find(filter).sort({ order: 1, createdAt: 1 });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: error.message || 'ক্যাটাগরি লোড করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, nameBn, slug, icon, color, description, descriptionBn, order, isActive } = body;

    if (!name || !nameBn) {
      return NextResponse.json(
        { error: 'ক্যাটাগরির নাম (English ও বাংলা) উভয়টি প্রয়োজন।' },
        { status: 400 }
      );
    }

    // Auto generate slug if missing
    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existing = await Category.findOne({ slug: generatedSlug });
    if (existing) {
      return NextResponse.json(
        { error: `"${generatedSlug}" স্লাগটি ইতিমধ্যে অন্য ক্যাটাগরিতে ব্যবহার করা হয়েছে। অন্য নাম বা স্লাগ ব্যবহার করুন।` },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({
      name: name.trim(),
      nameBn: nameBn.trim(),
      slug: generatedSlug,
      icon: icon || '🌐',
      color: color || '#7C3AED',
      description: description || '',
      descriptionBn: descriptionBn || '',
      order: order !== undefined ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'নতুন ক্যাটাগরি সফলভাবে তৈরি হয়েছে!',
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: error.message || 'ক্যাটাগরি তৈরি করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}
