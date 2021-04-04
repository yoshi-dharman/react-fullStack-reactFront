import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Toast, ProgressBar } from 'react-bootstrap';
import bsCustomFileInput from "bs-custom-file-input";

import { uploadAction } from '../redux/actions/submit.actions';

function SubmitPage() {
    const dispatch = useDispatch();
    const uploadLoading = useSelector(state => state.submit);
    const [show, setShow] = useState({
        valid: false,
        invalid: false
    });

    const [image, setImage] = useState({
        title: "",
        file: null,
        status: "",
        disable: "",
    })

    const [progressBar, setProgressBar] = useState(0);

    const handleChange= (e) => {
        setImage({
            ...image,
            [e.target.name] : e.target.value
        })
    }

    const checkFile = (e) =>{
        if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
            setImage({
                ...image,
                status: "is-valid",
                disable: "",
                file: e.target.files[0]
            })
        }else {
            setImage({
                ...image,
                status: "is-invalid",
                disable: "disabled",
            })
        }
    }

    bsCustomFileInput.init();

    useEffect(() => {
        // bsCustomFileInput.init();
      }, []);

    return (
        <Container>
        <Row className="d-flex justify-content-center">
            <Toast className="my-toast" onClose={() => setShow({...show,valid:false})} show={show.valid} delay={9000} autohide>
            <Toast.Header className="bg-purple text-white">
                <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
                />
                <strong className="mr-auto">Upload Success</strong>
                <small>just sec ago</small>
            </Toast.Header>
            <Toast.Body className="f-bold">Thank you for sharing your artwork!</Toast.Body>
            </Toast>
        </Row>
        <Row className="d-flex justify-content-center">
            <Toast className="my-toast" onClose={() => setShow({...show,invalid:false})} show={show.invalid} delay={9000} autohide>
            <Toast.Header className="bg-danger text-white">
                <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
                />
                <strong className="mr-auto">Upload Failed</strong>
                <small>just sec ago</small>
            </Toast.Header>
            <Toast.Body className="f-bold">Failed to upload, something is wrong (Maybe server down)!</Toast.Body>
            </Toast>
        </Row>
        <Row className="text-center mt-5">
            <Col>
                <h3>Submit Your Art</h3>
            </Col>     
        </Row>
        <Row className="justify-content-center mt-4">
            <Col md={6}>
                {uploadLoading.isLoading === true ?
                <div className="text-center">
                    {/* <Spinner className="mt-3" animation="border" /> */}
                    <ProgressBar animated striped variant="primary" className="my-progress-purple" now={progressBar} />
                </div>
                :
                <Form onSubmit={(e) => dispatch(uploadAction(image, e, setShow, setImage, setProgressBar))}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required value={image.title} onChange={handleChange} name="title" type="text" placeholder="Enter Title" />
                </Form.Group>
                <Form.Group controlId="formBasicUpload">
                    <Form.Label>Upload File</Form.Label>
                    <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input required className={image.status} accept="image/png,image/jpeg" onChange={checkFile}/>
                    <Form.File.Label data-browse="Browse">
                        Choose File
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Must be image .jpg or .png!</Form.Control.Feedback>
                    </Form.File>
                </Form.Group>
                <Button disabled={image.disable} type="submit" className={"my-btn " + image.disable}>
                    Upload
                </Button>
                </Form>
                }
            </Col>
        </Row>
        </Container>
    )
}

export default SubmitPage
