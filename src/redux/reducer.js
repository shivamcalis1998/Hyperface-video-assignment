import { GET_VIDEOS } from "./actionType";

const initialState = {
  videos: null,
  totalPages: null,
  currentPage: null,
};

const storeReducer = (store = initialState, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case GET_VIDEOS:
      return {
        ...store,
        videos: payload.videos,
        totalPages: payload.totalPages,
        currentPage: payload.currentPage,
      };
    default:
      return store;
  }
};
export default storeReducer;
