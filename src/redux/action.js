import axios from "axios";
import { GET_VIDEOS } from "./actionType";

export const getVideos = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://internship-service.onrender.com/videos?page=2&limit=9`,
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
      },
    });
  } catch (error) {
    console.log(error);
  }
};
