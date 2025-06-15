import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONAS = {
    width: 1080,
    height: 1920
} as const;


// Define the interface for the video document

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number //optional field
    }
}

const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true }, //default value is true
    transformation: {
        height: { type: Number, default: VIDEO_DIMENSIONAS.height },
        width: { type: Number, default: VIDEO_DIMENSIONAS.width },
        quality: { type: Number, min: 1, max: 100 } //optional field with min and max values
    }
}, { timestamps: true });//automatically adds createdAt and updatedAt fields

const Video = models?.Video || model<IVideo>("Video", videoSchema)

export default Video;