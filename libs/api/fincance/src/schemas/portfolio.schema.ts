import { PortfolioEntity } from '@avi/global/models';
import mongoose, { Schema } from 'mongoose';

const portfolioSchema = new Schema<PortfolioEntity>({
  name: { type: String, required: true },
  positions: [{ type: Schema.Types.ObjectId, ref: 'Position' }],
  description: { type: String, required: false },
  user: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, required: false },
});

export default mongoose.model<PortfolioEntity>('Portfolio', portfolioSchema);
