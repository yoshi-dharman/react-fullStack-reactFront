import React from 'react'

function ItemImage(props) {
    // console.log(props.imageData.image_url)
    if(props.imageData.image_url === undefined){
        // console.log("masuk")
        return 
    }
    return (
        <>
        <div className="item">
            <div className="thumbnail" onClick={() => {alert(props.num)}}>
                <img
                    // src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
                    // src={require("../assets/img-"+ (1) +".jpg").default}
                    
                    src={props.imageData.image_url}
                    alt="egjs"
                />
            </div>
            <div className="info">{`egjs ${props.num}`}</div>
        </div>
        </>
    )
}

export default ItemImage
