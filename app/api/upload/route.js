import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Media from '@/models/Media';
import { uploadToCloudinary, isCloudinaryConfigured, getOptimizedUrl } from '@/lib/cloudinary';

export const runtime = 'nodejs';
// Disable body parser limits for file uploads
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            'Cloudinary কনফিগারেশন পাওয়া যায়নি! অনুগ্রহ করে .env.local ফাইলে CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY এবং CLOUDINARY_API_SECRET সেট করুন।',
          code: 'CLOUDINARY_NOT_CONFIGURED',
        },
        { status: 500 }
      );
    }

    const contentType = request.headers.get('content-type') || '';

    let buffer;
    let fileName = 'image';
    let fileType = 'image/jpeg';
    let folder = 'aulad-it-solution';
    let title = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      folder = formData.get('folder') || folder;
      title = formData.get('title') || '';

      if (!file) {
        return NextResponse.json({ error: 'কোনো ফাইল নির্বাচন করা হয়নি।' }, { status: 400 });
      }

      // Check mime type
      fileType = file.type || '';
      if (!fileType.startsWith('image/')) {
        return NextResponse.json({ error: 'শুধুমাত্র ইমেজ ফাইল আপলোড করা যাবে।' }, { status: 400 });
      }

      // Max size limit: 10MB
      const MAX_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: 'ফাইলের আকার ১০ মেগাবাইটের বেশি হতে পারবে না।' },
          { status: 400 }
        );
      }

      fileName = file.name || 'uploaded_image';
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else if (contentType.includes('application/json')) {
      const json = await request.json();
      if (!json.image) {
        return NextResponse.json({ error: 'ইমেজ ডাটা প্রদান করা হয়নি।' }, { status: 400 });
      }
      folder = json.folder || folder;
      title = json.title || '';
      fileName = json.name || 'base64_image';
      // Can be base64 string or remote image URL
      buffer = json.image;
    } else {
      return NextResponse.json(
        { error: 'অসমর্থিত Content-Type (multipart/form-data অথবা application/json প্রয়োজন)' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary with automatic compression and optimization
    const uploadResult = await uploadToCloudinary(buffer, {
      folder,
      tags: ['aulad-it-solution', 'website-upload'],
    });

    // Generate optimized delivery URL
    const optimizedUrl = getOptimizedUrl(uploadResult.secure_url);
    const thumbnailUrl =
      uploadResult.eager?.[0]?.secure_url ||
      getOptimizedUrl(uploadResult.secure_url, { width: 400, height: 260, crop: 'fill' });

    // Save record to MongoDB Atlas
    await dbConnect();
    const mediaRecord = await Media.create({
      title: title || fileName,
      url: uploadResult.url,
      secureUrl: uploadResult.secure_url,
      optimizedUrl,
      thumbnailUrl,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      folder,
      resourceType: uploadResult.resource_type || 'image',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'ছবি সফলভাবে অপটিমাইজ ও আপলোড হয়েছে এবং MongoDB তে সংরক্ষিত হয়েছে!',
        url: uploadResult.secure_url,
        optimizedUrl,
        thumbnailUrl,
        publicId: uploadResult.public_id,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes,
        media: mediaRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      {
        error: error.message || 'ছবি আপলোড করতে সমস্যা হয়েছে।',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
