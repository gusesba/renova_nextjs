import React, { Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface IMyModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  name: string;
  ModalBody: React.FC;
}

const MyModal: React.FC<IMyModal> = ({ show, setShow, name, ModalBody }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBody />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" form="addForm" variant="primary">
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
