import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    optimizedUrl: { type: String },
    thumbnailUrl: { type: String },
    publicId: { type: String, required: true, unique: true },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    bytes: { type: Number }, // file size in bytes
    folder: { type: String, default: 'aulad-it-solution' },
    resourceType: { type: String, default: 'image' },
    uploadedBy: { type: String, default: 'Admin' },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
