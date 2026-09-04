import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String },
    company: { type: String },
    message: { type: String, required: true },
    messageBn: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    serviceType: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
