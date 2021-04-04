import { IMAGE_REQUEST, IMAGE_FAILED, IMAGE_SUCCESS, } from '../actions/homeFeeds.actions'

const initialState = {
    imageData: [""],
    isLoading : false,
    error: false,
}

const homeFeed = (state = initialState, action) => {
    switch (action.type){
        case IMAGE_REQUEST: 
            return {
                ...state,
                isLoading: true,
            };

        case IMAGE_FAILED:
            return {
                ...state,
                error: true,
                isLoading: false,
            };
        
        case IMAGE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                imageData: [...action.image]
            };

        default:
            return  state;
    }
}

export default homeFeed;