import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Media from '@/models/Media';
import { deleteFromCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const media = await Media.findById(id);
    if (!media) {
      return NextResponse.json({ error: 'ছবি পাওয়া যায়নি।' }, { status: 404 });
    }

    // Try deleting from Cloudinary if configured and publicId exists
    if (isCloudinaryConfigured() && media.publicId) {
      try {
        await deleteFromCloudinary(media.publicId);
      } catch (cloudErr) {
        console.warn('Cloudinary delete warning:', cloudErr.message);
      }
    }

    // Delete from MongoDB Atlas
    await Media.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'ছবি ক্লাউডিনারি ও ডাটাবেজ থেকে মুছে ফেলা হয়েছে।',
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: error.message || 'ছবি মুছতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}
