import React from "react";
import "./SkeletonLoading.css";

const SkeletonLoading: React.FC = () => {
  return (
    <div className="skeleton-loading">
      <div className="skeleton-box"></div>
      <div className="flex items-center gap-3">
        <div className="skeleton-image"></div>
        <div className="skeleton-name"></div>
      </div>
      <div className="skeleton-smallbox"></div>
      <div className="skeleton-smallbox"></div>
    </div>
  );
};

export default SkeletonLoading;
