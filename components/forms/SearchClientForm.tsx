import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export interface ISearchClientForm {
  fields: { name: boolean; phone: boolean };
  filter:
    | {
        id: number | undefined;
        name: { contains: string } | undefined;
        phone: { contains: string } | undefined;
      }
    | undefined;
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
    name: filter ? (filter.name ? filter.name.contains : '') : '',
    phone: filter ? (filter.phone ? filter.phone.contains : '') : '',
    id: filter ? (filter.id ? filter.id.toString() : '') : '',
    nameCheck: fields.name,
    phoneCheck: fields.phone,
  });

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let filter: {
      id: number | undefined;
      name: { contains: string } | undefined;
      phone: { contains: string } | undefined;
    } = { id: undefined, name: undefined, phone: undefined };

    let headers = ['Id'];

    if (values.nameCheck) headers = headers.concat(['Nome']);
    if (values.phoneCheck) headers = headers.concat(['Telefone']);

    filter.id = isNaN(parseInt(values.id)) ? undefined : parseInt(values.id);
    filter.name = { contains: values.name };
    filter.phone = { contains: values.phone };

    setFilter(filter);
    setHeaders(headers);
    setFields({
      id: true,
      name: values.nameCheck,
      phone: values.phoneCheck,
    });
  };

  return (
    <Form onSubmit={handleSubmit} id="addForm">
      <Form.Group className="mb-3" controlId="formId">
        <Form.Label>Id</Form.Label>
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
          <FormCheck
            className="mr-1"
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
            className="mr-1"
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
