import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IMovie } from "../services/MovieService";

const MovieTable: React.FC<IMovieState> = (props) => {


  const columns: ColumnsType<IMovie>= [
    { title: "海报", dataIndex: "poster" },
    { title: "名称", dataIndex: "name" },
    { title: "类型", dataIndex: "types" },
    { title: "地区", dataIndex: "areas" },
    { title: "时长", dataIndex: "timeLone" },
    { title: "是否热映", dataIndex: "isHot" },
    { title: "是否上线", dataIndex: "isComming" },
    { title: "是否经典", dataIndex: "isClassic" },
    { title: "描述", dataIndex: "description" },
  ]

  return (
    <Table
      rowKey={"_id"}
      dataSource={props.data}
      columns={columns}
    />
  )
}

export default MovieTable;