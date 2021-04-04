import axios from 'axios';

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_FAILED = "AUTH_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const authRequest = () => {
    return {
        type: AUTH_REQUEST,
    };
};

export const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    };
};

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
};

export const authFailed = (err) => {
    return {
        type: AUTH_FAILED,
        err,
    };
};

export const logoutAction = () => {
    return {
        type: LOGOUT,
    };
}

export const registerAction = (data, event, history, setRegister) => (dispatch) => {
    event.preventDefault();
    dispatch(authRequest());

    return axios
        .get("https://art-share-app.herokuapp.com/user/name/"+ data.name)
        .then(result => {
            if(result.data.length > 0){
                setRegister({
                    ...data,
                    password: ""
                })
                alert("username already taken");
                dispatch(authFailed("invalid"));
            } else{
                axios
                .post("https://art-share-app.herokuapp.com/auth/register", data)
                .then(result => {
                    dispatch(registerSuccess(result.data));
                    history.push('/login');
                })
                .catch(err => dispatch(authFailed(err)))
            }
        })
    
    
};

export const loginAction = (data, event, history, setLogin) => (dispatch) => {
    event.preventDefault();
    dispatch(authRequest());
    
    return axios
        .post("https://art-share-app.herokuapp.com/auth/login", data)
        .then(result => {
            if(result.data.token !== undefined) {
                localStorage.token = result.data.token
                localStorage.payload = JSON.stringify(result.data.data);
                dispatch(loginSuccess(result.data.token))
                
                history.push('/');
            } else{
                setLogin({
                    ...data,
                    password: ""
                })
                alert('username or password invalid');
                dispatch(authFailed("invalid"));
            }
            
        })
        .catch(err => dispatch(authFailed(err)))
};