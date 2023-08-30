import React from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Maintain 1:1 aspect ratio for circular frame */
  border-radius: 50%;
  overflow: hidden;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fill the circular frame with the video */
  z-index: 1;
`;

const CircularVideoFrame: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  return (
    <VideoContainer>
      <VideoElement autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
        {/* Add more source elements for different video formats */}
      </VideoElement>
    </VideoContainer>
  );
};

export default CircularVideoFrame;
