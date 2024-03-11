import React, { useEffect, useState } from "react";
import VideoCard from "../VideoCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../redux/action.js";
import SkeletionLoading from "../SkeletonLoading/SkeletonLoading.tsx";

const HomeScreen: React.FC = () => {
  const { videos, totalPages } = useSelector(
    (state: { videos: Video[]; currentPage: number; totalPages: number }) =>
      state
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching new videos
    dispatch(getVideos(currentPage))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons: JSX.Element[] = [];
    const maxButtonsToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn-pagination bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring"
        >
          Previous
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn-pagination ${
            currentPage === i
              ? "bg-[#808080] text-white font-semibold"
              : "bg-gray-800 text-white hover:bg-gray-700"
          } focus:outline-none focus:ring px-4 py-2`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn-pagination bg-gray-800 text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
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
                currentPage={currentPage}
              />
            ))}
      </div>
      <div className="flex justify-center my-10 space-x-2">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default HomeScreen;
