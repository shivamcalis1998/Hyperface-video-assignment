import React, { useEffect, useState } from "react";
import VideoCard from "../VideoCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../redux/action.js";
import SkeletionLoading from "../SkeletonLoading/SkeletonLoading.tsx";
const HomeScreen: React.FC = () => {
  const { videos } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getVideos())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="w-[95%] m-auto mt-[90px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <SkeletionLoading key={index} />
          ))
        : videos?.map((video) => (
            <VideoCard
              key={video.postId}
              videoid={video.postId}
              submission={video.submission}
              creator={video.creator}
              reaction={video.reaction}
            />
          ))}
    </div>
  );
};

export default HomeScreen;
