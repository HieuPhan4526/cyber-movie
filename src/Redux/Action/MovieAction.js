import { useDispatch } from "react-redux"
import { history } from "../../App"
import { movieService } from "../../Service/MovieService"
import { DELETE_MOVIE, GET_MOVIE_DETAIL, GET_MOVIE_LIST } from "../Type/MovieType"

export const AddNewMovieAction = (data) => {
    return (dispatch) => {
        movieService.AddNewMovie(data).then((result) => {
            alert("Thêm Phim Thành Công")
            history.goBack()
        }).catch((error) => {
            console.log(error)
            alert("Thêm Phim Thất Bại: " + error.response?.message);
        })
    }
}
export const GetMovieListAction = (name="") => {
    return (dispatch) => {
        movieService.GetMovieList(name).then((result) => {
            let action = {
                type: GET_MOVIE_LIST,
                movieList: result.data.content
            }
            dispatch(action)
        }).catch((error) => { console.log(error) })
    }

}
export const GetMovieInfoAction = (id) => {
    return (dispatch) => {
        movieService.GetMovieInfo(id).then((result) => {
            let action = {
                type: GET_MOVIE_DETAIL,
                movieDetail: result.data.content
            }
            dispatch(action)
        }).catch((error) => {
            console.log(error)
        })
    }
}
export const EditMovieAction = (formdata) => {
    return (dispatch) => {
        movieService.EditMovie(formdata).then((result) => {
            alert("Chỉnh sửa phim thành công !")
            history.push("/admin/film")
        }).catch((error) => { console.log(error) })
    }
}
export const DeletaMovieAction = (id) => {
    return (dispatch) => {
        movieService.DeletaMovie(id).then(() => {
            alert("Xóa thành công !")
            dispatch(GetMovieListAction())
        }).catch((error) => { console.log(error) })
    }

}
