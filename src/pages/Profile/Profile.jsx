import { Avatar, Card, Col, Divider, List, Row, Space } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { quanLyNguoiDungServices } from '../../Service/QuanLyNguoiDungServices';

let data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: '',
  title: `ant design part ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

export default function Profile() {
  let { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  let [ticketOD, setTicketOD] = useState([])
  useEffect(() => {
    quanLyNguoiDungServices.GetTicketOrdered().then((result) => {
      setTicketOD(result.data.content.thongTinDatVe)
    }).catch((error) => { console.log(error) })
  }, [])
  const renderTicketOrdered = (list) => {
    return list.map((info) => {
      return `${info.tenHeThongRap} | ${info.tenRap} | Ghế ${info.tenGhe}` 
    })

  }
  data = ticketOD.map((m) => {
    return {
      href: '',
      title: m.tenPhim,
      avatar: m.hinhAnh,
      description: `Giá: ${m.giaVe} - Thời lượng: ${m.thoiLuongPhim}p - Mã vé: ${m.maVe}`,
      content:
        <Card title={`Ngày đặt : ${moment(m.ngayDat).format("DD/MM/YYYY")} `} >
          <List
            size="small"
            dataSource={renderTicketOrdered(m.danhSachGhe)}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      ,
    }
  })
  return (
    <div>
      <h1>Thông tin người dùng :</h1>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <Card>
          <Divider style={{fontSize:30}} orientation="middle">Thông Tin Cá Nhân</Divider>
            <Row className='pt-5' style={{ paddingLeft: 100 }} gutter={[0, 30]}>
              <Col span={12}><h5>Tài Khoản :</h5></Col>
              <Col span={12}>{userLogin.taiKhoan}</Col>
              <Col span={12}><h5>Họ Tên :</h5></Col>
              <Col span={12}>{userLogin.hoTen}</Col>
              <Col span={12}><h5>Email :</h5></Col>
              <Col span={12}>{userLogin.email}</Col>
              <Col span={12}><h5>Số điện thoại :</h5></Col>
              <Col span={12}>{userLogin.soDT}</Col>
              <Col span={12}><h5>Mã loại người dùng :</h5></Col>
              <Col span={12}>{userLogin.maLoaiNguoiDung}</Col>
              <Col span={12}><h5>Mã nhóm :</h5></Col>
              <Col span={12}>{userLogin.maNhom}</Col>
            </Row>
          </Card>

        </Col>
        <Col span={12}>
          <Card>
          <Divider style={{fontSize:30}} orientation="middle">Lịch Sử đặt ghế</Divider>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 3
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                >
                  <List.Item.Meta
                    avatar={<Avatar size={60} src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
