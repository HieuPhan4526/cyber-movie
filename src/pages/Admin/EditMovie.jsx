import { Button, Card, DatePicker, Form, Input, InputNumber, PageHeader, Radio, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import moment from "moment"
import * as Yup from 'yup';
import { AddNewMovieAction, EditMovieAction, GetMovieInfoAction } from '../../Redux/Action/MovieAction'
import { GROUP_ID } from '../../ultil/setting'
import { history } from '../../App'
import { useParams } from 'react-router-dom'
import Buttoncss from '../../Component/Button/Buttoncss'
export default function EditMovie() {
    let { id } = useParams()
    const [componentSize, setComponentSize] = useState('default');
    const [showImgSRC, setShowImgSRC] = useState("")
    let { movieDetail } = useSelector(state => state.MovieReducer)
    const dispatch = useDispatch()
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const HandleChangeUpload = async (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setShowImgSRC(e.target.result)
        }
        await formik.setFieldValue("hinhAnh", file)
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: movieDetail.maPhim,
            tenPhim: movieDetail.tenPhim,
            trailer: movieDetail.trailer,
            moTa: movieDetail.moTa,
            ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu).format("DD/MM/YYYY"),
            dangChieu: movieDetail.dangChieu,
            sapChieu: movieDetail.sapChieu,
            hot: movieDetail.hot,
            danhGia: movieDetail.danhGia,
            hinhAnh: null,
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
                    if (values.hinhAnh !== null) {
                        formData.append(key, values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(EditMovieAction(formData));
        }
    })
    useEffect(() => {
        dispatch(GetMovieInfoAction(id))
    }, [])
    return (
        <div>
            <PageHeader
                className="site-page-header mb-3"
                onBack={() => history.goBack()}
                title={<h3>Chỉnh Sửa thông tin phim :</h3>}
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
                            format={"DD/MM/YYYY"}
                            value={moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")}
                            onChange={(date, dateString) => {
                                formik.setFieldValue("ngayKhoiChieu", dateString)
                            }}

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
                        <InputNumber min={0} max={10} value={formik.values.danhGia} onChange={(e) => {
                            formik.setFieldValue("danhGia", e)
                        }} />
                        {formik.touched.danhGia && formik.errors.danhGia ? (
                            <div className='text-danger'>{formik.errors.danhGia}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Upload">
                        <input type="file" onChange={HandleChangeUpload} accept=".png, .jpg, .jpeg .gif" />
                        <img style={{ width: 200, height: 150 }} src={showImgSRC === "" ? movieDetail.hinhAnh : showImgSRC} alt="" />
                    </Form.Item>
                    <Form.Item label="Xác nhận">
                        <Button type='primary' htmlType='submit'>Sửa Phim</Button>
                    </Form.Item>
                </Form>
            </Card>

        </div>
    )
}
