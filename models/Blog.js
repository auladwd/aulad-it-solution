import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleBn: { type: String },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    excerptBn: { type: String },
    content: { type: String, required: true },
    contentBn: { type: String },
    thumbnail: { type: String },
    category: { type: String, default: 'general' },
    tags: [{ type: String }],
    author: { type: String, default: 'Aulad IT Solution' },
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
