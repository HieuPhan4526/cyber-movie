import { Button, Space, Table, Tag, Input } from 'antd'
import React, { useEffect } from 'react'
import {
    EditTwoTone,
    DeleteOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DeletaMovieAction, GetMovieListAction } from '../../Redux/Action/MovieAction';
import Buttoncss from '../../Component/Button/Buttoncss';
const { Search } = Input;

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Mã Phim',
        dataIndex: 'key',
        key: 'maphim',
    },
    {
        title: 'Hinh Ảnh',
        dataIndex: 'image',
        key: 'hinhanh',
    },
    {
        title: 'Tên Phim',
        dataIndex: 'name',
        key: 'tenphim',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'Mota',
    },
    {
        title: 'Trạng Thái',
        key: 'tags',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                {status.map((tag) => {
                    let color = "coral";

                    if (tag === 'Hot') {
                        color = 'Red';
                    }
                    if (tag === 'Đang Chiếu') {
                        color = "green";
                    }
                    if (tag === 'Sắp Chiếu') {
                        color = "volcano";
                    }
                    if (tag !== "")
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                })}
            </>
        ),
    },
    {
        title: 'Tùy Chọn',
        key: 'action',
        dataIndex: 'action'
    },
];

export default function MovieManager() {
    let data = [
        {
            key: '1',
            image: 32,
            name: 'John Brown',
            description: 'New York No. 1 Lake Park',
            status: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            image: 42,
            description: 'London No. 1 Lake Park',
            status: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            image: 32,
            description: 'Sidney No. 1 Lake Park',
            status: ['cool', 'teacher'],
        },
    ];
    let { movieList } = useSelector(state => state.MovieReducer)
    let dispatch = useDispatch();
    data = movieList.map((movie, index) => {
        return {
            stt: index + 1,
            key: movie.maPhim,
            image: <img style={{ width: 70, height: 70 }} src={movie.hinhAnh} alt="" />,
            name: movie.tenPhim,
            description: movie.moTa.length > 60 ? movie.moTa.slice(0, 60) + "..." : movie.moTa,
            status: [`Rate: ${movie.danhGia}`, movie.hot ? "Hot" : "", movie.dangChieu ? "Đang Chiếu" : "", movie.sapChieu ? "Sắp Chiếu" : ""],
            action: <Space size="small">
                <NavLink to={`/admin/film/editfilm/${movie.maPhim}`}>
                    <Button type="text"><EditTwoTone style={{ fontSize: 25 }} /></Button>
                </NavLink>
                <Button onClick={() => {
                    if (window.confirm("Bạn có chắc muốn xóa phim :" + movie.tenPhim + " ?"))
                        dispatch(DeletaMovieAction(movie.maPhim))
                }} type="text"><DeleteOutlined style={{ fontSize: 25, color: "red" }} /></Button>
                <NavLink to={`/admin/film/showtime/${movie.maPhim}`} onClick={() => { localStorage.setItem("movie", JSON.stringify(movie)) }}>
                    <Button type="text"><ScheduleOutlined style={{ fontSize: 25, color: "green" }} /></Button>
                </NavLink>
            </Space>
        }
    })
    const onSearch = (value) => {
        dispatch(GetMovieListAction(value))
    };
    useEffect(() => {
        dispatch(GetMovieListAction())
    }, [])
    return (
        <div>
            <h3>Danh Sách Phim</h3>
            <NavLink to="/admin/film/addfilm"><Button type='primary' >Thêm Phim</Button></NavLink>
            <Search className='py-3' size='large' placeholder="Tìm phim theo tên" onSearch={onSearch} enterButton />
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
