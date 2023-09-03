import React, { useEffect, useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";
import CircularVideoFrame from "./CircularVideoFrame";
interface VideoPlayerProps {
  publicId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ publicId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Autoplay was prevented. Handle the error or use a user interaction trigger.
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <CloudinaryContext className="frame-for-video" cloudName="dkkqltqzb">
      <CircularVideoFrame videoSrc={publicId} />
    </CloudinaryContext>
  );
};

export default VideoPlayer;
