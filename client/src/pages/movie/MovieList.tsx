import { useDispatch, useSelector } from "react-redux";
import MovieTable from "../../components/MovieTable";
import { IRootState } from "../../redux/reducers/RootReducer";
import { useEffect } from "react";
import MovieAction from "../../redux/actions/MovieAction";
import { Dispatch } from "redux";

const MovieList = () => {
  const movie = useSelector((state: IRootState) => state.movie)
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch(MovieAction.fetchMovies({page: 1, limit: 100, key: ''}))
  }, [dispatch])

  return <MovieTable {...movie} />
}

export default MovieList;