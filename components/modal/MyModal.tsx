import React, { Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface IMyModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  name: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
}

const MyModal: React.FC<IMyModal> = ({
  show,
  setShow,
  name,
  children,
  size,
}) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal size={size} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
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
