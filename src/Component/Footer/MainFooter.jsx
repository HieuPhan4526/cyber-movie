import { Col, Row } from 'antd'
import React from 'react'
export default function MainFooter() {
  return (
    <div>
        <Row className='text-center'>
          <Col span={12}>
            <h5>Website Build by Team:</h5>
            <ul>
              <li><a href="https://github.com/BinFlex97">Đinh Quang Khánh</a> </li>
              <li><a href="https://github.com/HieuPhan4526">Phan Minh Hiếu</a></li>
            </ul>
          </Col>
          <Col span={12}>
            <h5>Link source github :</h5>
            <a href="https://github.com/BinFlex97/ReactFinal.git">https://github.com/BinFlex97/ReactFinal.git</a>
          </Col>
        </Row>
    </div>
  )
}
