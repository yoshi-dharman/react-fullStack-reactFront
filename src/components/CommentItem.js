import React from 'react'

function CommentItem(props) {
    return (
        <div className="my-model-comment-item">
            <div className="my-model-comment-user capitalize">{props.commentData.user_id.name}</div>
            <div className="my-model-comment-chat">{props.commentData.comment}</div>
        </div>
    )
}

export default CommentItem
