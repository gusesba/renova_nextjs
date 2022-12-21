import React, { useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export interface ISearchClientForm {}

const SearchClientForm: React.FC<ISearchClientForm> = () => {
  const [values, setValues] = useState({ name: '', phone: '', id: '' });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form id="SearchForm">
      <Form.Group className="mb-3" controlId="formId">
        <div className="flex">
          <FormCheck />
          <Form.Label>Id</Form.Label>
        </div>
        <Form.Control
          type="text"
          placeholder="Id"
          value={values.id}
          name={'id'}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <div className="flex">
          <FormCheck />
          <Form.Label>Nome</Form.Label>
        </div>
        <Form.Control
          type="text"
          placeholder="Nome"
          value={values.name}
          name={'name'}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <div className="flex">
          <FormCheck />
          <Form.Label>Telefone</Form.Label>
        </div>
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

export default SearchClientForm;
