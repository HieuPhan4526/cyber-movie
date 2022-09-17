import { Button, Card, DatePicker, Form, Input, InputNumber, PageHeader, Radio, Switch, Upload } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { PlusOutlined } from '@ant-design/icons'
import { useFormik } from "formik"
import moment from "moment"
import * as Yup from 'yup';
import { AddNewMovieAction } from '../../Redux/Action/MovieAction'
import { GROUP_ID } from '../../ultil/setting'
import { history } from '../../App'
export default function AddMovie() {
    const [componentSize, setComponentSize] = useState('default');
    const [showImgSRC, setShowImgSRC] = useState("")
    const dispatch = useDispatch()
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const HandleChangeUpload = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setShowImgSRC(e.target.result)
        }
        formik.setFieldValue("hinhAnh", file)
    }
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: "",
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: "",
            maNhom: GROUP_ID
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().required('Tên phim không được để trống'),
            trailer: Yup.string().required('trailer không được để trống').url("Trailer 1 là đường dẫn url"),
            moTa: Yup.string().required('Mô tả không được để trống'),
            ngayKhoiChieu: Yup.string().required('Ngày khởi chiếu không được để trống'),
            danhGia: Yup.number().required('Số sao không được để trống').integer("Số phải là số nguyên").min(0, "Số sao phải lớn hơn 0").max(10, "số sao ko được quá 10")
        }),
        onSubmit: values => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== "hinhAnh") {
                    formData.append(key, values[key])
                } else {
                    formData.append(key, values.hinhAnh, values.hinhAnh.name)
                }
            }
            dispatch(AddNewMovieAction(formData));
        }
    })
    return (
        <div>
            <PageHeader
                className="site-page-header mb-3"
                onBack={() => history.goBack()}
                title={<h3>Thêm Phim Mới :</h3>}
                style={{ border: " 1px solid rgb(235, 237, 240)" }}
            />
            <Card>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    onFinish={formik.handleSubmit}
                >
                    <Form.Item label="Kích thước" name="size">
                        <Radio.Group>
                            <Radio.Button value="small">Nhỏ</Radio.Button>
                            <Radio.Button value="default">Vừa</Radio.Button>
                            <Radio.Button value="large">Lớn</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Tên phim : ">
                        <Input onChange={formik.handleChange} value={formik.values.tenPhim} name='tenPhim' />
                        {formik.touched.tenPhim && formik.errors.tenPhim ? (
                            <div className='text-danger'>{formik.errors.tenPhim}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Trailer : ">
                        <Input onChange={formik.handleChange} value={formik.values.trailer} name='trailer' />
                        {formik.touched.trailer && formik.errors.trailer ? (
                            <div className='text-danger'>{formik.errors.trailer}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Mô tả : ">
                        <Input onChange={formik.handleChange} value={formik.values.moTa} name="moTa" />
                        {formik.touched.moTa && formik.errors.moTa ? (
                            <div className='text-danger'>{formik.errors.moTa}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Ngày khởi chiếu : ">
                        <DatePicker
                            onChange={(e) => {
                                formik.setFieldValue("ngayKhoiChieu", moment(e).format("DD/MM/YYYY"))
                            }}
                            format={"DD/MM/YYYY"}
                        />
                        {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                            <div className='text-danger'>{formik.errors.ngayKhoiChieu}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Đang chiếu :">
                        <Switch onChange={(e) => {
                            formik.setFieldValue("dangChieu", e)
                        }} checked={formik.values.dangChieu} name='dangChieu' />
                    </Form.Item>
                    <Form.Item label="Sắp chiếu :">
                        <Switch onChange={(e) => {
                            formik.setFieldValue("sapChieu", e)
                        }} checked={formik.values.sapChieu} name='sapChieu' />
                    </Form.Item>
                    <Form.Item label="Hot">
                        <Switch onChange={(e) => {
                            formik.setFieldValue("hot", e)
                        }} checked={formik.values.hot} name='hot' />
                    </Form.Item>
                    <Form.Item label="Số sao (10) : ">
                        <InputNumber min={0} max={10} defaultValue={0} onChange={(e) => {
                            formik.setFieldValue("danhGia", e)
                        }} />
                        {formik.touched.danhGia && formik.errors.danhGia ? (
                            <div className='text-danger'>{formik.errors.danhGia}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Upload hình ảnh">
                        <input type="file" onChange={HandleChangeUpload} accept=".png, .jpg, .jpeg .gif" />
                        <img style={{ width: 200, height: 150 }} src={showImgSRC} alt="" />
                    </Form.Item>
                    <Form.Item label="Xác nhận">
                        <Button type='primary' htmlType='submit'>Thêm Phim</Button>
                    </Form.Item>
                </Form>
            </Card>

        </div>
    )
}
