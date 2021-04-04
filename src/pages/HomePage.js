import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {JustifiedLayout} from "@egjs/react-infinitegrid";
import ItemImage from '../components/ItemImage';

import { homeFeedAction } from '../redux/actions/homeFeeds.actions'

// const maxImg = 22;
const itemCount = 5;
const dataDelay= 1000;

function HomePage() {
    const dispatch = useDispatch();
    const imageData = useSelector(state => state.homeFeed);
    // console.log(imageData);

    const [items, setItems] = useState(getItems(0, 0, 0, imageData.imageData.length));
    const [endLine, setEndLine] = useState({
        loading: "text-center w-100",
        endLine: "text-center my-5 d-none" 
    })

    const endLinehandle = () => {
        setEndLine({
            loading: "text-center w-100 d-none",
            endLine: "text-center my-5" 
        })
    }

    function getItems(nextGroupKey, nextKey, count, max) {
        const nextItems = [];
        
        if((nextKey+count) > max){
            count = max - nextKey;
            endLinehandle();
        }

        for (let i = 0; i < count; ++i) {
            nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
        }
        return nextItems;
    }

    useEffect(() => {
        dispatch(homeFeedAction());
    }, [dispatch])

    return (
        <Container fluid className="position-relative my-maxContainer">
        <Row className="mt-4 mx-5">
        
        {imageData.isLoading === true ?
        <div className="text-center w-100">
            <Spinner className="my-5 color-purple" animation="grow"/>
        </div>
        :
        imageData.imageData.length === 0 ?
        <Col className="text-center my-5 w-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-emoji-frown mb-3 color-purple" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
            </svg>
            <h3 className="color-purple">There Is No Artwork To See</h3>
        </Col>
        :
        <>
        {imageData.length}
        <JustifiedLayout
            className="justifiedlayout container-fluid my-maxContainer"
            loading={
                <div className={endLine.loading}>
                    <Spinner className="my-5 color-purple" animation="grow"/>
                </div>
            }
            groupBy={item => item.props["data-groupkey"]}
            options={{
                // threshold: 100,
                // isEqualSize: false,
                // isContantSize: false,
                isOverflowScroll: false,
                useRecycle: true,
                horizontal: false,
                useFit: true,
                useFirstRender: true
            }}
            layoutOptions={{
                align: "justify",
                margin: 10,
                column: [1,4],
                minSize: 0,
                maxSize: 0,
            }}
            // onPrepend = {e => {append}}
            // onChange = {e => chnage}>
            onImageError={e => {
                this.items.splice(e.totalIndex, 1);
            
                this.setState({ items: [...this.items] });
            }}

            onAppend={e => {
                if (e.currentTarget.isProcessing()) {
                    return;
                }
                const nextGroupKey = (typeof e.groupKey === "undefined" ? 0 : +e.groupKey || 0) + 1;
                const nextKey = items.length;
            
                e.startLoading();
                setTimeout(() => {
                    setItems([
                        ...items,
                        ...getItems(nextGroupKey, nextKey, itemCount, imageData.imageData.length),
                    ]);
                }, dataDelay);
            }}
            onLayoutComplete={e => {
                !e.isLayout && e.endLoading();
            }}
            >
            
            {/* {imageData.imageData.map((item, index) => {
                console.log(imageData);
                return <ItemImage data-groupkey={"0"} key={index} num={item.key} imageData={item} />
            })} */}
            {items.map((item, index) => <ItemImage data-groupkey={item.groupKey} key={item.key} num={item.key} imageData={imageData.imageData[index]} />)}
            {/* {items.map(item => <ItemImage data-groupkey={item.groupKey} key={item.key} num={item.key} imageData={imageData.imageData} />)} */}

        </JustifiedLayout>
        <Col xs={12} className={endLine.endLine}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-check-circle color-purple mb-4" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
            <h3 className="color-purple">You're All Caught Up For Now</h3>
        </Col>
        </>
        }
        </Row>
        </Container>
    )
}

export default HomePage
