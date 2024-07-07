import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import MovieList from "./movie/MovieList";
import EditMovie from "./movie/EditMovie";
import AddMovie from "./movie/AddMovie";

const Layout = () => {

  return <div>
    <header>
      <ul>
        <li><NavLink to={"/"}>首页</NavLink></li>
        <li><NavLink to={"/movie"}>电影列表</NavLink></li>
        <li><NavLink to={"/movie/add"}>添加电影</NavLink></li>
        <li><NavLink to={"/movie/edit/004"}>修改电影</NavLink></li>
      </ul>
    </header>
    <main>
      <Routes>
        <Route index path={"/"} element={<Home />} />
        <Route path={"/movie"} element={<MovieList />} />
        <Route path={"/movie/add"} element={<AddMovie />} />
        <Route path={"/movie/edit/:id"} element={<EditMovie />} />
      </Routes>
    </main>
  </div>;
}

export default Layout;