import React, { Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface IMyModal {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  submitText?: string;
}

const MyModal: React.FC<IMyModal> = ({
  show,
  setShow,
  title,
  children,
  size,
  submitText = 'Adicionar',
}) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal size={size} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" form="addForm" variant="primary">
            {submitText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
