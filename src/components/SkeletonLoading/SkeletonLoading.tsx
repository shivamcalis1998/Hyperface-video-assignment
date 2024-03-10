import React from "react";
import "./SkeletonLoading.css";

const SkeletonLoading: React.FC = () => {
  return (
    <div className="skeleton-loading">
      <div className="skeleton-box"></div>
    </div>
  );
};

export default SkeletonLoading;
