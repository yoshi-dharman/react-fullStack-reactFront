import React, { useState, useEffect} from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Comment from './Comment';

function ItemImage(props) {
    const history = useHistory();
    const [like, setLike] = useState(false)
    const [likeID, setLikeID] = useState("");

    useEffect(() => {
        if(localStorage.token){
            const data = {
                user_id : JSON.parse(localStorage.payload)._id,
                image_id: props.imageData._id
            }
            axios.post("https://art-share-app.herokuapp.com/like/byimage/"+ data)
            .then(result => {
                // console.log(result);
                if(result.data.length > 0){
                    setLikeID(result.data[0]._id);
                    setLike(true);
                }
            })
            .catch(e => console.log(e))
        }
    }, [props])

    const likeHandle = () => {
        if(localStorage.token){
            if(like){
                axios.delete("https://art-share-app.herokuapp.com/like/" + likeID)
                .then(result => {
                    // console.log(result);
                    setLike(false);
                })
                .catch(e => console.log(e))
            } else{
                const data = {
                    user_id: JSON.parse(localStorage.payload)._id,
                    image_id: props.imageData._id
                }
                axios.post("https://art-share-app.herokuapp.com/like", data)
                .then(result => {
                    // console.log(result);
                    setLikeID(result.data._id);
                    setLike(true);
                })
                .catch(e => console.log(e))
            }
        } else{
            history.push('/submit');
        }
    }

    //Modal
    const [comment, setComment] = useState(false);

    const handleClose = () => setComment(false);
    const handleShow = () => setComment(true);


    // console.log(props.imageData)

    if(props.imageData.image_url === undefined){
        return null
    }
    return (
        <>
        <Comment comment={comment} handleClose={handleClose} imageData={props.imageData} likeHandle={likeHandle} like={like}/>
        <div className="item">
            <div className="thumbnail noselect" onClick={handleShow}>
                <img                    
                    src={props.imageData.image_url}
                    alt="egjs"
                />
            </div>
            <div className="info">
                <h5>{props.imageData.title}</h5>
                <div className="d-flex justify-content-between">
                    <div>
                    From {props.imageData.user_id.name}
                    </div>
                    <div className="heart" onClick={likeHandle}>
                        <span className={!like? "" : "d-none"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart color-like" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </span>
                        <span className={like? "" : "d-none"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart-fill color-like" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ItemImage
