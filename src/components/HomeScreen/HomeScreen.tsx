import React, { useEffect } from "react";
import VideoCard from "../VideoCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../redux/action.js";

const HomeScreen: React.FC = () => {
  const { videos } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  return (
    <div className="w-[95%] m-auto mt-[90px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {videos?.map((video) => (
        <VideoCard
          key={video.postId}
          submission={video.submission}
          creator={video.creator}
          reaction={video.reaction}
        />
      ))}
    </div>
  );
};

export default HomeScreen;
