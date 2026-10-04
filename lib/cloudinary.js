import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Check if Cloudinary is configured with valid environment variables
 */
export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload an image buffer or base64 to Cloudinary with automatic optimization.
 * 
 * Auto-Optimization applied:
 * 1. quality: 'auto:good' (intelligent visual compression)
 * 2. fetch_format: 'auto' (serves WebP / AVIF automatically based on browser)
 * 3. width: 1920, height: 1080, crop: 'limit' (prevents huge images while maintaining aspect ratio)
 * 4. Generates an eager responsive thumbnail (400x260)
 */
export async function uploadToCloudinary(fileBufferOrBase64, options = {}) {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary configuration missing! Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local'
    );
  }

  const {
    folder = 'aulad-it-solution',
    publicId,
    tags = ['aulad-it'],
    maxWidth = 1920,
    maxHeight = 1080,
  } = options;

  const uploadOptions = {
    folder,
    resource_type: 'image',
    tags,
    // Automatic image optimization & downsizing
    transformation: [
      {
        width: maxWidth,
        height: maxHeight,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
    ],
    // Pre-generate optimized thumbnail
    eager: [
      { width: 400, height: 260, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
    ],
    eager_async: false,
  };

  if (publicId) {
    uploadOptions.public_id = publicId;
  }

  if (typeof fileBufferOrBase64 === 'string') {
    // Base64 string or remote URL
    return await cloudinary.uploader.upload(fileBufferOrBase64, uploadOptions);
  }

  // Node Buffer
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBufferOrBase64);
  });
}

/**
 * Helper to build an optimized Cloudinary URL with custom transformations
 * (e.g., f_auto, q_auto, width, height)
 */
export function getOptimizedUrl(url, { width, height, crop = 'fill', quality = 'auto' } = {}) {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return url;
  }

  const transforms = [`f_auto`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');

  // Check if URL already has transformation
  if (url.includes('/upload/')) {
    if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto')) {
      return url;
    }
    return url.replace('/upload/', `/upload/${transformString}/`);
  }

  return url;
}

/**
 * Delete an image from Cloudinary by public ID
 */
export async function deleteFromCloudinary(publicId) {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary configuration missing in .env.local');
  }
  return await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
