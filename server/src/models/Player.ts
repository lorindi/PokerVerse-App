import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  chips: number;
  room: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const PlayerSchema = new Schema<IPlayer>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  chips: {
    type: Number,
    default: 1000,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model<IPlayer>("Player", PlayerSchema);
