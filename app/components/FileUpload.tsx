"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { on } from "events";
import { set } from "mongoose";
import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video"
}

const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}: FileUploadProps) => {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //optional validation
    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid video file");
                return false;
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File size should be less than 100 MB");
            return false;
        }
        setError(null);
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !validateFile(file)) {
            return;
        }
        setUploading(true);
        setError(null); //past error state set to null

        try {
            const authRes = await fetch("/api/auth/imagekit-auth"); //fetching auth endpoint
            const auth = await authRes.json(); //all data from the auth endpoint to json

            const res = await upload({
                file,
                fileName: file.name, 
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!, //string public key from env file
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,
                
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent));
                    }
                },
            });

            onSuccess(res);

    } catch (error) {
        console.error("Upload Failed:", error);
    }
    finally{
        setUploading(false);
    }
}

return (
    <div className="form-control w-full max-w-xl">
        <input 
            type="file"
            accept={fileType == "video" ? "video/*" : "image/*"}
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
        />
        {uploading && (
            <span className="loading loading-spinner loading-md mt-2">Uploading...</span>
        )}
        {error && (
            <span className="text-error text-sm mt-2">{error}</span>
        )}
    </div>
);
};

export default FileUpload;