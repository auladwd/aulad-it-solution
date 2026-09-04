import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleBn: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        'school',
        'college',
        'madrasa',
        'clinic',
        'hospital',
        'grocery',
        'ecommerce',
        'portfolio',
        'other',
      ],
    },
    description: { type: String, required: true },
    descriptionBn: { type: String, required: true },
    features: [{ type: String }],
    featuresBn: [{ type: String }],
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    thumbnail: { type: String },
    images: [{ type: String }],
    techStack: [{ type: String }],
    demoUrl: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    deliveryDays: { type: Number, default: 7 },
    totalOrders: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
