import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  maxPlayers: number;
  createdAt: Date;
  players: mongoose.Types.ObjectId[];
}

const RoomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

// RoomSchema.index({ name: 1 });

export default mongoose.model<IRoom>("Room", RoomSchema);
