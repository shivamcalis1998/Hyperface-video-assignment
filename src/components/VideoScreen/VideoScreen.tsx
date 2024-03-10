import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";

import { RiVerifiedBadgeFill, RiDeleteBinLine } from "react-icons/ri";
import VideoCard from "../VideoCard.tsx";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading.tsx";
import { getVideos } from "../../redux/action";

interface Video {
  postId: string;
  submission: {
    mediaUrl: string;
    description: string;
  };
  creator: {
    pic: string;
    name: string;
  };
  reaction: {
    count: number;
  };
  comment: {
    commentingAllowed: boolean;
  };
}

interface Comment {
  id: number;
  text: string;
  date: string;
}

const VideoScreen: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { videos } = useSelector((state: { videos: Video[] }) => state);

  const dispatch = useDispatch();

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
      setLiked(localStorage.getItem(`liked_${videoFind.postId}`) === "true");
      setDisliked(
        localStorage.getItem(`disliked_${videoFind.postId}`) === "true"
      );
    }
  }, [id, videos]);

  useEffect(() => {
    dispatch(getVideos());
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      localStorage.setItem(
        `likecount_${video?.postId}`,
        (likeCount + 1).toString()
      );
      localStorage.setItem(`liked_${video?.postId}`, "true");

      if (disliked) {
        setDisliked(false);
        setDislikeCount((prev) => prev - 1);
        localStorage.setItem(
          `dislikecount_${video?.postId}`,
          (dislikeCount - 1).toString()
        );
        localStorage.setItem(`disliked_${video?.postId}`, "false");
      }
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      localStorage.setItem(
        `likecount_${video?.postId}`,
        (likeCount - 1).toString()
      );
      localStorage.setItem(`liked_${video?.postId}`, "false");
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setDislikeCount((prev) => prev + 1);
      localStorage.setItem(
        `dislikecount_${video?.postId}`,
        (dislikeCount + 1).toString()
      );
      localStorage.setItem(`disliked_${video?.postId}`, "true");

      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
        localStorage.setItem(
          `likecount_${video?.postId}`,
          (likeCount - 1).toString()
        );
        localStorage.setItem(`liked_${video?.postId}`, "false");
      }
    } else {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1);
      localStorage.setItem(
        `dislikecount_${video?.postId}`,
        (dislikeCount - 1).toString()
      );
      localStorage.setItem(`disliked_${video?.postId}`, "false");
    }
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

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
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
    <div className="md:mt-[6rem] sm:mt-0 flex flex-col sm:flex-row gap-4 px-6">
      <div className="md:w-[60%] sm:w-[100%]">
        <div className="h-[80vh]">
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
            <div className={`flex items-center `}>
              {liked ? (
                <FaThumbsUp
                  className={`text-green-500 cursor-pointer text-lg sm:text-2xl`}
                  onClick={handleLike}
                />
              ) : (
                <FaRegThumbsUp
                  className={`text-green-500 cursor-pointer text-lg sm:text-2xl opacity-60`}
                  onClick={handleLike}
                />
              )}

              <span className="text-white ml-1">{likeCount}</span>
            </div>
            <div className={`flex items-center `}>
              {disliked ? (
                <FaThumbsDown
                  className={`text-red-500 cursor-pointer text-lg sm:text-2xl`}
                  onClick={handleDislike}
                />
              ) : (
                <FaRegThumbsDown
                  className={`text-red-500 cursor-pointer text-lg sm:text-2xl opacity-60`}
                  onClick={handleDislike}
                />
              )}
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
                className="w-full p-2 mt-2   border-b border-gray-600 h-12 text-white bg-[#181818] outline-none "
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <button
                className="mt-2 float-right  bg-[#808080] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#646464]"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          )}
          {showComments && (
            <ul className="mt-20 mb-20">
              <h2 className="text-white text-[30px]">Comments:</h2>
              {comments?.map((comment) => (
                <li
                  key={comment?.id}
                  className="flex justify-between text-white"
                >
                  <p>{comment?.text}</p>
                  <div className="flex items-center">
                    <p className="text-xs">{comment?.date}</p>
                    <button
                      className="text-red-500 ml-2 text-[20px]"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
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
