import mongoose, { Schema, Document } from 'mongoose';

export interface ITruck extends Document {
  user: mongoose.Schema.Types.ObjectId;
  year: string;
  color: string;
  plates: string;
}

const TruckSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  year: { type: String, required: true },
  color: { type: String, required: true },
  plates: { type: String, required: true, unique: true },
});

export default mongoose.model<ITruck>('Truck', TruckSchema);
