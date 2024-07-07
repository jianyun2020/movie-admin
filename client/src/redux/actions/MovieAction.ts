import { ThunkAction } from "redux-thunk"
import { ISearchCondition } from "../../services/CommonTypes"
import { IMovie, MovieService } from "../../services/MovieService"
import { IAction } from "./ActionTypes"
import { IRootState } from "../reducers/RootReducer"

export type SaveMoviesAction = IAction<"movie_save", { movies: IMovie[], total: number }>
function saveMoviesAction (movies: IMovie[], total: number): SaveMoviesAction {
  return {
    type: 'movie_save',
    payload: {
      movies,
      total
    },
  }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>
function setLoadingAction (loading: boolean): SetLoadingAction {
  return {
    type: 'movie_setLoading',
    payload: loading,
  }
}

export type SetConditionAction = IAction<"movie_setCondition", ISearchCondition>
function setConditionAction (condition: ISearchCondition): SetConditionAction {
  return {
    type: 'movie_setCondition',
    payload: condition,
  }
}

export type DeleteAction = IAction<"movie_delete", string>
function deelteAction (id: string): DeleteAction {
  return {
    type: 'movie_delete',
    payload: id,
  }
}


export type MovieActions = SaveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction;
export type AsyncAction = ThunkAction<Promise<void>, IRootState, any, MovieActions>

// 根据条件从服务器后去电影的数据
function fetchMovies(condition: ISearchCondition): AsyncAction {
  return async (dispatch, getState) => {
    // 1. 设置加载状态
    dispatch(setLoadingAction(true))
    // 2. 设置条件
    dispatch(setConditionAction(condition))
    // 3. 获取服务器数据
    const curCondition = getState().movie.condition;
    const resp = await MovieService.getMovies(curCondition)

    // 4. 更改仓库的数据
    dispatch(saveMoviesAction(resp.data, resp.total))

    // 关闭加载状态
    dispatch(setLoadingAction(false))
  }
}

// 删除
function deleteMovie(id: string): AsyncAction {
  return async (dispatch) => {
    dispatch(setLoadingAction(true))

    await MovieService.delete(id)
    dispatch(deelteAction(id))

    dispatch(setLoadingAction(false))
  }
}


const MovieAction = {
  saveMoviesAction,
  setLoadingAction,
  setConditionAction,
  deelteAction,
  fetchMovies,
  deleteMovie
}

export default MovieAction