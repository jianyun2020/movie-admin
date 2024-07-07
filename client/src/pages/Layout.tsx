import { NavLink, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";

import Home from "./Home";
import MovieList from "./movie/MovieList";
import EditMovie from "./movie/EditMovie";
import AddMovie from "./movie/AddMovie";

const { Sider, Header, Content } = Layout
const _Layout = () => {

  return <Layout>
    <Sider>
      <Header style={{padding: "0 20px"}}>
        <NavLink to={"/"}>超级电影后台管理系统</NavLink>
      </Header>
      <Menu 
        theme="dark"
        items={[
          {key: '1', label: <NavLink to={"/"}>首页</NavLink>},
          {key: '2', label: <NavLink to={"/movie"}>电影列表</NavLink>},
          {key: '3', label: <NavLink to={"/movie/add"}>添加电影</NavLink>},
          {key: '4', label: <NavLink to={"/movie/edit/004"}>修改电影</NavLink>},
        ]}
      />
    </Sider>
    <Layout>
      <Header></Header>
      <Content style={{padding: 10}}>
        <Routes>
          <Route index path={"/"} element={<Home />} />
          <Route path={"/movie"} element={<MovieList />} />
          <Route path={"/movie/add"} element={<AddMovie />} />
          <Route path={"/movie/edit/:id"} element={<EditMovie />} />
        </Routes>
      </Content>
    </Layout>
  </Layout>;
}

export default _Layout;