import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceTitle: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String },
    price: { type: Number, required: true },
    requirements: { type: String },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    paymentMethod: { type: String, default: 'manual' },
    adminNote: { type: String },
    deliveryUrl: { type: String },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
