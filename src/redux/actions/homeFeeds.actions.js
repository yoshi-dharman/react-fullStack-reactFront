import axios from 'axios';

export const IMAGE_REQUEST = "IMAGE_REQUEST";
export const IMAGE_FAILED = "IMAGE_FAILED";
export const IMAGE_SUCCESS = "IMAGE_SUCCESS";

export const imageRequest = () => {
    return {
        type: IMAGE_REQUEST,
    };
};

export const imageSuccess = (data) => {
    return {
        type: IMAGE_SUCCESS,
        image: data
    };
};

export const imageFailed = (err) => {
    return {
        type: IMAGE_FAILED,
        err,
    };
};

export const homeFeedAction = () => (dispatch) => {
    dispatch(imageRequest());
    return axios
        .get("https://art-share-app.herokuapp.com/image")
        .then(result => {
            dispatch(imageSuccess(result.data))
            // setItems(getItems(0, 0, 0, result.data.image.length))
        })
        .catch(err => dispatch(imageFailed(err)))
};