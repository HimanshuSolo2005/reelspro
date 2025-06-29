import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card w-64 bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 rounded-xl overflow-hidden">
      <Link href={`/video/${video._id}`} className="group block">
        <figure className="relative w-full aspect-[9/16] overflow-hidden rounded-t-xl">
          <IKVideo 
            urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
            path={video.videoUrl}
            transformation={[
              {
                height: "480",
                width: "270",
              },
            ]}
            controls={video.controls}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body p-3">
          <h2 className="text-base font-semibold line-clamp-1 text-primary-content" >
            {video.title}
          </h2>
          <p className="text-xs text-base-content/70 line-clamp-2 mt-1">
            {video.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
