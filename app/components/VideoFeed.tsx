import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base-content/70">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}
    </div>
  );
}
