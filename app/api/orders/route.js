import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Service from '@/models/Service';
import User from '@/models/User';

function generateOrderId() {
  return 'AIT-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    const status = searchParams.get('status');

    let query = {};
    if (userEmail) query.userEmail = userEmail;
    if (status) query.status = status;

    const orders = await Order.find(query).sort({ createdAt: -1 }).populate('service', 'title slug thumbnail');
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const service = await Service.findById(body.serviceId);
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    let user = await User.findOne({ email: body.userEmail });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const order = await Order.create({
      orderId: generateOrderId(),
      service: service._id,
      serviceTitle: service.title,
      user: user._id,
      userName: user.name,
      userEmail: user.email,
      userPhone: body.phone,
      price: service.price,
      requirements: body.requirements,
    });

    // Increment service order count
    await Service.findByIdAndUpdate(service._id, { $inc: { totalOrders: 1 } });
    await User.findByIdAndUpdate(user._id, { $inc: { totalOrders: 1 } });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
