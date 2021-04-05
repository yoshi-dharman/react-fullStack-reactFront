import axios from 'axios';

export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_FAILED = "UPLOAD_FAILED";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";

export const uploadRequest = () => {
    return {
        type: UPLOAD_REQUEST,
    };
};

export const uploadSuccess = (data) => {
    return {
        type: UPLOAD_SUCCESS,
        payload: data
    };
};

export const uploadFailed = (err) => {
    return {
        type: UPLOAD_FAILED,
        err,
    };
};

export const uploadAction = (image, event, setShow, setImage, setProgressBar) => (dispatch) => {
    event.preventDefault();
    dispatch(uploadRequest());

    return axios
        .get("https://art-share-app.herokuapp.com/key/imgbb", {
            headers: {
                "Authorization" : `Bearer ${localStorage.token}`
            }
        })
        .then(result => {
            const fd = new FormData();
            fd.append('key', result.imgbb_key);
            fd.append('image', image.file);

            axios
            .post("https://api.imgbb.com/1/upload", fd, {
                onUploadProgress: ProgressEvent => {
                    // console.log('Upload progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%');
                    setProgressBar(Math.round(ProgressEvent.loaded / ProgressEvent.total * 100));
                }
            })
            .then(result => {
                const date = result.data.data.time + "000";
                const d = new Date(parseInt(date))

                const dataImage = {
                    user_id : JSON.parse(localStorage.payload)._id,
                    image_url : result.data.data.url,
                    title: image.title,
                    time: d.toUTCString()
                }

                setImage({
                    title: "",
                    file: null,
                    status: "",
                    disable: "",
                })
                setProgressBar(0);

                axios.post("https://art-share-app.herokuapp.com/image/", dataImage)
                .then(result => {
                    setShow({
                        valid: true,
                        invalid: false
                    });
                })
                .catch(err => {
                    setShow({
                        valid: false,
                        invalid: true
                    });
                    setImage({
                        title: "",
                        file: null,
                        status: "",
                        disable: "",
                    })
                    console.log(err);
                    dispatch(uploadFailed(err))
                })
                
                dispatch(uploadSuccess());
            })
            .catch(err => {
                setShow({
                    valid: false,
                    invalid: true
                });
                setImage({
                    title: "",
                    file: null,
                    status: "",
                    disable: "",
                })
                setProgressBar(0);
                console.log(err);
                dispatch(uploadFailed(err))
            })

        })
        .catch(e => {
            console.log(e);
            dispatch(uploadFailed(err))
        })
};