import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  truck: mongoose.Schema.Types.ObjectId;
  status: 'created' | 'in transit' | 'completed';
  pickup: mongoose.Schema.Types.ObjectId;
  dropoff: mongoose.Schema.Types.ObjectId;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  truck: { type: Schema.Types.ObjectId, ref: 'Truck', required: true },
  status: { type: String, enum: ['created', 'in transit', 'completed'], required: true },
  pickup: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  dropoff: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
