import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Service from '@/models/Service';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await request.json();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'ক্যাটাগরি পাওয়া যায়নি।' }, { status: 404 });
    }

    if (body.slug && body.slug !== category.slug) {
      const existing = await Category.findOne({ slug: body.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json(
          { error: `"${body.slug}" স্লাগটি ইতিমধ্যে অন্য ক্যাটাগরিতে ব্যবহার করা হয়েছে।` },
          { status: 400 }
        );
      }
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        name: body.name !== undefined ? body.name.trim() : category.name,
        nameBn: body.nameBn !== undefined ? body.nameBn.trim() : category.nameBn,
        slug: body.slug !== undefined ? body.slug.toLowerCase().trim() : category.slug,
        icon: body.icon !== undefined ? body.icon : category.icon,
        color: body.color !== undefined ? body.color : category.color,
        description: body.description !== undefined ? body.description : category.description,
        descriptionBn: body.descriptionBn !== undefined ? body.descriptionBn : category.descriptionBn,
        order: body.order !== undefined ? Number(body.order) : category.order,
        isActive: body.isActive !== undefined ? body.isActive : category.isActive,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'ক্যাটাগরি সফলভাবে আপডেট হয়েছে!',
      category: updated,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: error.message || 'ক্যাটাগরি আপডেট করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'ক্যাটাগরি পাওয়া যায়নি।' }, { status: 404 });
    }

    // Check if services are using this category
    const count = await Service.countDocuments({ category: category.slug });
    if (count > 0) {
      return NextResponse.json(
        {
          error: `এই ক্যাটাগরিতে বর্তমানে ${count} টি সার্ভিস রয়েছে! মুছে ফেলার আগে সার্ভিসগুলোর ক্যাটাগরি পরিবর্তন করুন।`,
        },
        { status: 400 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে!',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error.message || 'ক্যাটাগরি মুছতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}
