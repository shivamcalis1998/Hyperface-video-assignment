import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import VideoCard from "../VideoCard.tsx";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading.tsx";

const VideoScreen: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { videos } = useSelector((state) => state);

  useEffect(() => {
    const videoFind = videos?.find((elm) => elm.postId === id);
    if (videoFind) {
      setVideo(videoFind);
      setDislikeCount(
        Number(localStorage.getItem(`dislikecount_${videoFind.postId}`)) || 0
      );
      setLikeCount(
        Number(localStorage.getItem(`likecount_${videoFind.postId}`)) ||
          videoFind?.reaction?.count
      );
      const storedComments =
        JSON.parse(localStorage.getItem(`comments_${videoFind.postId}`)) || [];
      setComments(storedComments);
      window.scrollTo(0, 0);
    }
  }, [id, videos]);

  const handleLike = () => {
    setLiked(true);
    setLikeCount((prev) => prev + 1);
    localStorage.setItem(`likecount_${video.postId}`, likeCount + 1);
    setTimeout(() => {
      setLiked(false);
    }, 1000);
  };

  const handleDislike = () => {
    setDisliked(true);
    setDislikeCount((prev) => prev + 1);
    localStorage.setItem(`dislikecount_${video?.postId}`, dislikeCount + 1);
    setTimeout(() => {
      setDisliked(false);
    }, 1000);
  };

  const handleAddComment = () => {
    const newComment = {
      id: comments.length + 1,
      text: commentText,
      date: new Date().toISOString(),
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentText("");
    localStorage.setItem(
      `comments_${video?.postId}`,
      JSON.stringify(updatedComments)
    );
  };

  const toggleDescriptionAndComments = () => {
    setShowDescription(!showDescription);
    setShowComments(!showComments);
  };

  return (
    <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-4 px-6">
      <div className="flex-1">
        <div className="h-[70vh]">
          {video && (
            <video
              src={video?.submission?.mediaUrl}
              className="w-full h-full"
              autoPlay
              controls
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="py-4 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 max-w-max">
            <img
              src={video?.creator?.pic}
              alt=""
              className="w-14 h-14 sm:w-[70px] sm:h-[70px] object-cover rounded-full"
            />
            <p className="text-white opacity-70 text-sm sm:text-2xl">
              {video?.creator?.name}
            </p>
            <RiVerifiedBadgeFill className="text-gray-600" />
          </div>
          <div className="flex gap-3 mt-3 px-8">
            <div
              className={`flex items-center ${liked ? "animate-pulse" : ""}`}
            >
              <FiThumbsUp
                className={`text-green-500 cursor-pointer text-lg sm:text-2xl ${
                  liked ? "text-opacity-50" : ""
                }`}
                onClick={handleLike}
              />
              <span className="text-white ml-1">{likeCount}</span>
            </div>
            <div
              className={`flex items-center ${disliked ? "animate-pulse" : ""}`}
            >
              <FiThumbsDown
                className={`text-red-500 cursor-pointer text-lg sm:text-2xl ${
                  disliked ? "text-opacity-50" : ""
                }`}
                onClick={handleDislike}
              />
              <span className="text-white ml-1">{dislikeCount}</span>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={toggleDescriptionAndComments}
            className="text-white underline cursor-pointer"
          >
            {showDescription && showComments
              ? "Hide Description & Comments"
              : "Show Description & Comments"}
          </button>
        </div>
        {showDescription && (
          <div>
            <h1 className="text-white text-lg sm:text-2xl font-semibold">
              Description
            </h1>
            <p className="text-white opacity-75 text-sm sm:text-base">
              {video?.submission?.description}
            </p>
          </div>
        )}
        <div className="mt-4">
          {showComments && video?.comment?.commentingAllowed && (
            <div className="mt-2">
              <h1 className="text-white text-lg sm:text-2xl font-semibold">
                Add Comments
              </h1>
              <textarea
                placeholder="Add a comment..."
                className="w-full p-2 mt-2 border rounded-md h-24"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          )}
          {showComments && (
            <ul className="mt-4 mb-20">
              <h2 className="text-white text-[30px]">Comments:</h2>
              {comments?.map((comment) => (
                <li
                  key={comment?.id}
                  className="flex justify-between text-white"
                >
                  <p>{comment?.text}</p>
                  <p className="text-xs">{comment?.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {videos
          ? videos.map((video) => (
              <VideoCard
                key={video?.postId}
                videoid={video?.postId}
                submission={video?.submission}
                creator={video?.creator}
                reaction={video?.reaction}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoading key={index} />
            ))}
      </div>
    </div>
  );
};

export default VideoScreen;
