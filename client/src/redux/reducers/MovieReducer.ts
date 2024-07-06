import { Reducer } from "react";
import { DeleteAction, SaveMoviesAction, SetConditionAction, SetLoadingAction } from "../actions/MovieAction";
import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { MovieActions } from "../actions/MovieAction";


export interface IMovieState {
  data: IMovie[];
  total: number;
  condition: ISearchCondition;
  isLoading: boolean;
  totalPage: number;
}

const defaultState: IMovieState = {
  data: [],
  total: 0,
  condition: {
    page: 1,
    limit: 10,
    key: ""
  },
  isLoading: false,
  totalPage: 0
}

type MovieReducer<A> = Reducer<IMovieState, A>;

const saveMovie: MovieReducer<SaveMoviesAction> = function(state, action) {
  return {
    ...state,
    data: action.payload.movies,
    total: action.payload.total,
    totalPage: Math.ceil(action.payload.total / state.condition.limit!)
  }
}

const setCondition: MovieReducer<SetConditionAction> = function(state, action) {
  const newState = {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload
    }
  }
  newState.totalPage = Math.ceil(newState.total / newState.condition.limit!)
  return newState
}

const setLoading: MovieReducer<SetLoadingAction> = function(state, action) {
  return {
    ...state,
    loading: action.payload
  }
}

const deleteMovie: MovieReducer<DeleteAction> = function (state, action) {
  return {
    ...state,
    data: state.data.filter(m => m._id !== action.payload),
    total: state.total - 1,
    totalPage: Math.ceil((state.total - 1) / state.condition.limit!)
  }
}

const movieReducer = function (state: IMovieState = defaultState, action: MovieActions): IMovieState {
  switch(action.type) {
    case 'movie_save': return saveMovie(state, action);
    case 'movie_setCondition': return setCondition(state, action);
    case 'movie_setLoading': return setLoading(state, action);
    case 'movie_delete': return deleteMovie(state, action);
    default: return state;
  }
}

export default movieReducer;