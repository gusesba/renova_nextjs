import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormCheck, Table } from 'react-bootstrap';
import { baseURL } from '../../config/config';
import { objToArray } from '../../utils/utils';

export interface IMyTable {
  url: string;
  headers: Array<string>;
  fields: {};
  selectedRows: Array<number>;
  setSelectedRows: Dispatch<SetStateAction<Array<number>>>;
  filter?: {};
  upload: number;
}

const MyTable: React.FC<IMyTable> = ({
  url,
  headers,
  fields,
  setSelectedRows,
  selectedRows,
  filter,
  upload,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [fieldsState, setFieldsState] = useState([] as string[]);

  const onChange = (e: any) => {
    setPage(e.target.value);
  };

  const fetchData = () => {
    const body = {
      action: 'GET',
      number: 10,
      fields: fields,
      skip: page * 10,
      filter,
    };

    fetch(baseURL + url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else setData(data);
      });
  };

  useEffect(() => {
    setFieldsState(objToArray(fields));
    fetchData();
  }, [page, upload]);

  useEffect(() => {
    document.querySelectorAll('[type="checkbox"]').forEach((checkbox: any) => {
      checkbox.checked = false;
    });
    setSelectedRows([]);
  }, [page]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <Table bordered hover>
        <thead>
          <tr>
            <th></th>
            {headers.map((column, key) => {
              return (
                <th className="text-center group" key={key}>
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any, key) => {
            return (
              <tr key={key}>
                <td>
                  <FormCheck
                    key={key}
                    name={row.id.toString()}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedRows(
                          [...selectedRows].concat(parseInt(e.target.name))
                        );
                      else
                        setSelectedRows(
                          [...selectedRows].filter((id) => {
                            if (parseInt(e.target.name) != id) return id;
                          })
                        );
                    }}
                  />
                </td>
                {fieldsState.map((field, key) => {
                  let a = field.split('.');

                  const newField = a.reduce((value, cur) => {
                    return value[cur];
                  }, row);

                  return (
                    <td className="text-center" key={key}>
                      {newField}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <nav
        className="flex justify-between items-center pl-2 pr-2"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Página: <span className="font-semibold text-gray-900">{page}</span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={() => setPage(page - 1 >= 0 ? page - 1 : page)}
              className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li>
            <Form.Group className="w-[60px]">
              <Form.Control
                type="number"
                name="page"
                value={page}
                onChange={onChange}
              />
            </Form.Group>
          </li>

          <li>
            <button
              onClick={() => setPage(page + 1)}
              className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MyTable;
