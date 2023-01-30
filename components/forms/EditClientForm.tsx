import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { baseURL } from '../../config/config';

export interface IEditClientForm {
  after?: Function;
  setUpload: Function;
  id: number;
}

const EditClientForm: React.FC<IEditClientForm> = ({
  after,
  setUpload,
  id,
}) => {
  const [values, setValues] = useState({ name: '', phone: '' });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      id,
      name: values.name == '' ? undefined : values.name,
      phone: values.phone == '' ? undefined : values.phone,
    };
    fetch(baseURL + '/client', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ name: '', phone: '' });
          if (after) after();
          setUpload(Math.random());
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formId">
        <Form.Label>Id</Form.Label>
        <Form.Control
          type="text"
          value={id}
          name={'id'}
          onChange={onChange}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome"
          value={values.name}
          name={'name'}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Telefone"
          name="phone"
          value={values.phone}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default EditClientForm;
