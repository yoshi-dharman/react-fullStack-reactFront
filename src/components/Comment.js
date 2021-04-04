import React, { useState, useEffect} from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Modal, Button, Image, Form, Spinner } from 'react-bootstrap';

import CommentItem from './CommentItem';

function Comment(props) {
    const history = useHistory();
    const [commentData, setCommentData] = useState([])
    const [commentLoading, setCommentLoading] = useState(false);

    const [commentUpload, setCommentUpload] = useState("");

    useEffect(() => {
        // if(localStorage.token){
            setCommentLoading(true);
            axios.get("https://art-share-app.herokuapp.com/comment/byimage/"+ props.imageData._id)
            .then(result => {
                // console.log(result);
                if(result.data.length > 0){
                    setCommentData(result.data);
                }
                setCommentLoading(false);
            })
            .catch(e => console.log(e))
        // }
        // console.log("masuk comment")
    }, [props])

    const handleChange= (e) => {
        setCommentUpload(e.target.value)
    }

    const commentUploadHandle = (e) => {
        e.preventDefault();
        if(localStorage.token){
            const data = {
                user_id : JSON.parse(localStorage.payload)._id,
                image_id: props.imageData._id,
                comment: commentUpload
            }

            axios.post("https://art-share-app.herokuapp.com/comment/", data)
            .then(result => {
                // console.log(result);
                const newData = {
                    ...result.data,
                    user_id: {
                        name: JSON.parse(localStorage.payload).name
                    }
                }

                setCommentData([
                    ...commentData,
                    newData
                ])
                setCommentUpload("");
            })
            .catch(e => console.log(e));

        }else{
            history.push('/submit');
        }
    }

    const getTime= () => {
        const date = new Date(props.imageData.time)
        return date.toUTCString().slice(0, -7);
    }

    return (
        <>
        <Modal centered scrollable show={props.comment} onHide={props.handleClose} dialogClassName="my-modal">
            <div className="d-flex justify-content-between flex-column flex-md-row h-100 md-scroll">
                <div className="position-relative w-100 md-image justify-content-center d-flex">
                    {/* <div className="my-image" style={{backgroundImage: "URL("+props.imageData.image_url+")"}}></div> */}
                    <Image className="img-fluid my-image card-img-top" src={props.imageData.image_url}></Image>
                    <div className="my-bg-blur" style={{backgroundImage: `url(${props.imageData.image_url})`}}>asd</div>
                </div>
                <div className="w-100 bg-white md-comment z-index2 position-relative">
                    <Modal.Header closeButton>
                    <Modal.Title className="capitalize">{props.imageData.user_id.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="capitalize">
                        <div className="my-comment-title">{props.imageData.title}</div>
                        <div className="mt-2 color-lightGray">{getTime()}</div>
                        <div className="my-like-function">
                        <span onClick={props.likeHandle} className={!props.like? "" : "d-none"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart heart color-like" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </span>
                        <span onClick={props.likeHandle} className={props.like? "" : "d-none"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart-fill heart color-like" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </span>
                        </div>
                    </Modal.Body>
                    <div className="my-model-comment">
                        {commentLoading === true ? 
                        <div className="text-center w-100">
                            <Spinner className="my-5 color-purple" animation="border"/>
                        </div>
                        :
                        commentData.length === 0 ? 
                            ""
                        :
                        commentData.map((item, index) => <CommentItem key={index} commentData={item} />)
                        // <CommentItem />
                        }
                        <div className="my-model-comment-fake"></div>
                    </div>
                    <Modal.Footer className="my-modal-footer bg-white">
                        <Form className="w-100" onSubmit={commentUploadHandle}>
                        <div className="align-items-center w-100 justify-content-around d-flex">
                        <div className="w-75 mr-2">
                        <Form.Control id="inlineFormInput" placeholder="Message..." value={commentUpload} onChange={handleChange}/>
                        </div>
                        <div className="w-25 d-flex justify-content-end">
                            <Button variant="primary" className="my-btn w-100" type="submit">
                                Reply
                             </Button>
                        </div>
                        </div>
                        </Form>
                    
                    
                    </Modal.Footer>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default Comment
