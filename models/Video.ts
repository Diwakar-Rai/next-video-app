import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  height: 1920,
  widht: 1080,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: String;
  description: String;
  videoUrl: String;
  thumbnailUrl: String;
  controls?: boolean;
  transformation?: { height: number; width: number; quality?: number };
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: Boolean, default: true },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      width: { type: Number, default: VIDEO_DIMENSIONS.widht },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
