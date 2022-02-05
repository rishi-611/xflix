import React from "react";
import { Modal} from "react-bootstrap";
import ModalForm from "./ModalForm";
import "./uploadModal.css";


const UploadModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="uploadModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm {...props}/>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;
