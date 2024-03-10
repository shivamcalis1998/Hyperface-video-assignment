import React, { useRef, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface Props {
  submission: {
    mediaUrl: string;
    title: string;
    thumbnail: string;
  };
  creator: {
    pic: string;
    handle: string;
  };
  reaction: {
    count: number;
  };
  videoid: String;
}

const VideoCard: React.FC<Props> = ({
  submission,
  creator,
  reaction,
  videoid,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigat = useNavigate();
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Failed to play video:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className=" cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative overflow-hidden rounded-lg hover:rounded-none h-[200px]"
        onClick={() => navigat(`/video/${videoid}`)}
      >
        {isHovered ? (
          <video
            ref={videoRef}
            src={submission.mediaUrl}
            className="m-auto h-full rounded-lg transition duration-300 transform hover:scale-105"
            loop
            muted
          ></video>
        ) : (
          <img
            src={submission.thumbnail}
            alt=""
            className="w-full h-full object-cover rounded-lg transition duration-300 transform hover:scale-105"
          />
        )}
      </div>
      <div
        className="mt-2 flex items-start gap-4"
        onClick={() => navigat(`/video/${videoid}`)}
      >
        <img src={creator.pic} alt="" className="w-9 h-9 rounded-full" />

        <div>
          <h3 className="text-white text-start font-semibold text-[17px]">
            {submission.title}
          </h3>
          <div className="flex flex-row justify-start gap-2 items-center">
            <p className="text-white my-1 inline-block">{creator.handle}</p>
            <RiVerifiedBadgeFill className="text-gray-600" />
          </div>
          <div className="flex justify-start items-center gap-1 text-gray-200">
            <p>{reaction.count} Views •</p>
            <p>2 weeks ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
