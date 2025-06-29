"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-primary drop-shadow-sm tracking-tight">
        ImageKit ReelsPro
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <VideoFeed videos={videos} />
      )}
    </main>
  );
}
