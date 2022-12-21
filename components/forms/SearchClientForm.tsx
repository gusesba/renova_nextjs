import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export interface ISearchClientForm {
  fields: {};
  filter: {} | undefined;
  setFilter: Dispatch<SetStateAction<{} | undefined>>;
  setFields: Dispatch<SetStateAction<{}>>;
  setHeaders: Dispatch<SetStateAction<string[]>>;
}

const SearchClientForm: React.FC<ISearchClientForm> = ({
  fields,
  filter,
  setFilter,
  setFields,
  setHeaders,
}) => {
  const [values, setValues] = useState({
    name: '',
    phone: '',

    nameCheck: true,
    phoneCheck: true,
  });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let headers = ['Id'];

    if (values.nameCheck) headers = headers.concat(['Nome']);
    if (values.phoneCheck) headers = headers.concat(['Telefone']);

    setHeaders(headers);

    setFields({
      id: true,
      name: values.nameCheck,
      phone: values.phoneCheck,
    });
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formName">
        <div className="flex">
          <FormCheck
            checked={values.nameCheck}
            onChange={() =>
              setValues({ ...values, nameCheck: !values.nameCheck })
            }
          />
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
          <FormCheck
            checked={values.phoneCheck}
            onChange={() =>
              setValues({ ...values, phoneCheck: !values.phoneCheck })
            }
          />
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
