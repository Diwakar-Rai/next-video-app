import { upload } from "@imagekit/next";
import React, { useState } from "react";
interface FileUploadType {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  FileType?: "image" | "video";
}
const FileUploading = ({ onSuccess, onProgress, FileType }: FileUploadType) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const validatFile = (file: File) => {
    if (FileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please provide a video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 mb");
    }
    return true;
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validatFile(file)) return;

    setUploading(true);
    setError(null);
    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (e: ProgressEvent) => {
          if (e.lengthComputable && onProgress) {
            const percent = (e.loaded / e.total) * 100;
          }
        },
      });
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <input
        type="text"
        accept={FileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading...</span>}
    </>
  );
};

export default FileUploading;
