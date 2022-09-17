import { Button, Card, Col, Collapse, Divider, List, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { theaterService } from "../../../Service/TheaterService";
import Buttoncss from "../../../Component/Button/Buttoncss";
import { history } from "../../../App";
const { Panel } = Collapse;

export default function MovieSchedule() {
  let [data, setData] = useState([]);
  let [groupList, setGroupList] = useState({
    list: [],
    logo: "",
  });
  let [movieList, setMovieList] = useState({
    list: [],
    info: {
      name: "",
      address: "",
    },
  });

  const GetData = () => {
    theaterService
      .GetMoviesSchedule()
      .then((result) => {
        setData(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GetGroupItems = (event) => {
    setMovieList({
      list: [],
      info: {
        name: "",
        address: "",
      },
    });
    data.map((system) => {
      if (system.maHeThongRap === event.key)
        setGroupList(
          (groupList = { list: system.lstCumRap, logo: system.logo })
        );
    });
  };
  const GetMovieItems = (event) => {
    groupList.list.map((group) => {
      if (group.maCumRap === event.key)
        setMovieList(
          (movieList = {
            list: group.danhSachPhim,
            info: {
              name: group.tenCumRap,
              address: group.diaChi,
            },
          })
        );
    });
  };

  const RenderSystem = () => {
    let items = data.map((system) => {
      return {
        key: system.maHeThongRap,
        icon: (
          <img
            alt=""
            style={{ width: "30px", height: "30px" }}
            src={system.logo}
          />
        ),
        label: system.tenHeThongRap,
      };
    });
    return (
      <Collapse defaultActiveKey={["system"]} accordion={true}>
        <Panel header={<h5>Hệ Thống Rạp</h5>} key="system">
          <div>
            <Menu
              onClick={GetGroupItems}
              items={items}
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
            />
          </div>
        </Panel>
      </Collapse>
    );
  };
  const RenderGroup = () => {
    let items = groupList.list.map((group) => {
      return {
        key: group.maCumRap,
        icon: (
          <img
            alt=""
            style={{ width: "30px", height: "30px" }}
            src={groupList.logo}
          />
        ),
        label: group.tenCumRap,
      };
    });
    return (
      <Collapse defaultActiveKey={"group"}>
        <Panel header={<h5>Cụm Rạp</h5>} key={"group"}>
          <Menu
            onClick={GetMovieItems}
            items={items}
            theme="light"
            mode="inline"
          />
        </Panel>
      </Collapse>
    );
  };
  const RenderMovieSchedule = () => {
    let items = movieList.list.map((movie) => {
      return {
        key: movie.maPhim,
        icon: (
          <img
            alt=""
            style={{ width: "100px", height: "100px" }}
            src={movie.hinhAnh}
          />
        ),
        label: movie.tenPhim,
        schedule: movie.lstLichChieuTheoPhim.map((schedule, index) => {
          let time = moment(schedule.ngayChieuGioChieu).format("HH:MM");
          return (
            <span key={index}>
              <Button
                onClick={() => {
                  console.log("Mã lịch chiếu : " + schedule.maLichChieu);
                  history.push(`/chairtable/${schedule.maLichChieu}`);
                }}
                icon={""}
                size="middle"
              >
                {time}
              </Button>
            </span>
          );
        }),
      };
    });
    return (
      <div>
        <Card title={`Rạp: ${movieList.info.name}`}>
          Địa chỉ: {movieList.info.address}
        </Card>
        <Divider>Danh Sách Phim</Divider>
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={items}
            pagination={{
              pageSize: 5,
            }}
            renderItem={(item) => (
              <div>
                <List.Item key={item.key}>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.label}
                    description={item.schedule}
                  />
                </List.Item>
              </div>
            )}
          />
        </Card>
      </div>
    );
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div className="section">
      <h2>Lịch Chiếu Phim</h2>
      <Row style={{ width: "100%" }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          {RenderSystem()}
        </Col>
        <Col className="gutter-row" span={6}>
          {RenderGroup()}
        </Col>
        <Col className="gutter-row" span={12}>
          {RenderMovieSchedule()}
        </Col>
      </Row>
    </div>
  );
}
