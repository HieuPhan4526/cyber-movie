import { DELETE_MOVIE, GET_MOVIE_DETAIL, GET_MOVIE_LIST } from "../Type/MovieType"

const initialState = {
  movieList: [],
  movieDetail: {}
}

export const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_LIST:
      state.movieList = action.movieList
      return { ...state }
    case GET_MOVIE_DETAIL:
      state.movieDetail = action.movieDetail
      return { ...state }
    default:
      return state
  }
}
