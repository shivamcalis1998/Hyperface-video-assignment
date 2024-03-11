import axios from "axios";
import { GET_VIDEOS } from "./actionType";

export const getVideos = (currentPage) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://internship-service.onrender.com/videos?page=${currentPage}&limit=9`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    dispatch({
      type: GET_VIDEOS,
      payload: {
        videos: response.data.data.posts,
        totalPages: 11,
        currentPage,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
