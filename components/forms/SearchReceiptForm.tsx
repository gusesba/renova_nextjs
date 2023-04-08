import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from 'react-bootstrap/Form';

export interface ISearchReceiptForm {
  filter:
    | {
        id: number | undefined;
        type: { contains: string } | undefined;
        buyer: { name: { contains: string } | undefined } | undefined;
      }
    | undefined;
  setFilter: Dispatch<SetStateAction<{} | undefined>>;
}

const SearchReceiptForm: React.FC<ISearchReceiptForm> = ({
  filter,
  setFilter,
}) => {
  const [values, setValues] = useState({
    type: filter ? (filter.type ? filter.type.contains : '') : '',
    id: filter ? (filter.id ? filter.id.toString() : '') : '',
    buyerName: filter
      ? filter.buyer?.name
        ? filter.buyer.name.contains
        : ''
      : '',
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
      type: { contains: string } | undefined;
      buyer: { name: { contains: string } | undefined } | undefined;
    } = { id: undefined, type: undefined, buyer: { name: undefined } };

    filter.id = isNaN(parseInt(values.id)) ? undefined : parseInt(values.id);
    filter.type = { contains: values.type };
    filter.buyer = { name: { contains: values.buyerName } };
    setFilter(filter);
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
        <Form.Label>Tipo</Form.Label>

        <Form.Control
          type="text"
          placeholder="Tipo"
          value={values.type}
          name={'type'}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Comprador</Form.Label>

        <Form.Control
          type="text"
          placeholder="Comprador"
          value={values.buyerName}
          name={'buyerName'}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchReceiptForm;
