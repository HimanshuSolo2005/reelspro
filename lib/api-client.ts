import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = { // Options for the fetch request
    method? : "GET" | "POST" | "PUT" | "DELETE";
    body? : any; //may or may not have a body
    headers? : Record<string, string>;
}

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      // Try to get error message from JSON, fallback to text
      let errorMsg = "Unknown error";
      if (contentType && contentType.includes("application/json")) {
        errorMsg = (await response.json()).error || errorMsg;
      } else {
        errorMsg = await response.text();
      }
      throw new Error(errorMsg);
    }

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      throw new Error("API did not return JSON. Received: " + (await response.text()));
    }
  }

  async getVideos() {
    return this.fetch<IVideo[]>("/video");
  }

  async getVideo(id: string) {
    return this.fetch<IVideo>(`/video/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideo>("/video", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient(); //singleton instance of ApiClient
// This allows you to use apiClient.getVideos(), apiClient.getVideo(id), etc.
