import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormCheck, Table } from 'react-bootstrap';
import { baseURL } from '../../config/config';
import { fieldToObj, objToArray } from '../../utils/utils';

export interface IMyTable {
  url: string;
  headers: Array<string>;
  fields: {};
  selectedRows: Array<number>;
  setSelectedRows: Dispatch<SetStateAction<Array<number>>>;
  filter?: {};
  upload: number;
  order?: Array<any>;
}

const MyTable: React.FC<IMyTable> = ({
  url,
  headers,
  fields,
  setSelectedRows,
  selectedRows,
  filter,
  upload,
  order = [],
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0 as number | string);
  const [fieldsState, setFieldsState] = useState([] as string[]);
  const [orderBy, setOrderBy] = useState(order) as Array<any>;

  const _setOrderBy = (field: any) => {
    let index = -1;
    let fields = field.split('.');
    if (orderBy) {
      orderBy.forEach((item: any, key: number) => {
        let testItem = item;
        if (testItem) {
          for (let i = 0; i < fields.length - 1; i++) {
            if (testItem[fields[i]]) testItem = testItem[fields[i]];
          }
          if (testItem[fields[fields.length - 1]]) index = key;
        }
      });
    }

    if (index == -1) {
      let obj = fieldToObj(field, 'asc');

      setOrderBy(orderBy ? [...orderBy, obj] : [obj]);
    } else {
      let testItem = orderBy[index];
      for (let i = 0; i < fields.length - 1; i++) {
        if (testItem[fields[i]]) testItem = testItem[fields[i]];
      }
      if (testItem[fields[fields.length - 1]] == 'asc') {
        let obj = fieldToObj(field, 'desc');
        let newOrder = orderBy;
        newOrder.splice(index, 1, obj);
        setOrderBy([...newOrder]);
      } else {
        let newOrder = orderBy;
        newOrder.splice(index, 1);
        setOrderBy([...newOrder]);
      }
    }
  };

  const onChange = (e: any) => {
    if (!isNaN(e.target.value) || e.target.value == '') {
      setPage(e.target.value);
    }
  };

  const fetchData = () => {
    const body = {
      action: 'GET',
      number: 10,
      fields: fields,
      skip: (page as number) * 10,
      filter,
      order: orderBy,
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
        } else {
          setData(data);
        }
      });
  };

  useEffect(() => {
    setFieldsState(objToArray(fields));
    fetchData();
  }, [page, upload, fields, orderBy]);

  useEffect(() => {
    document.querySelectorAll('[type="checkbox"]').forEach((checkbox: any) => {
      if (checkbox.name != 'controllCheckbox') {
        let controll = 0;
        selectedRows.forEach((id: any) => {
          if (id == checkbox.name) controll = 1;
        });
        if (controll == 1) checkbox.checked = true;
        else checkbox.checked = false;
      }
    });
  });

  useEffect(() => {
    document.querySelectorAll('[name="controllCheckbox"]').forEach((e: any) => {
      e.checked = false;
    });
  }, [page]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <Table bordered hover>
        <thead>
          <tr>
            <th className="w-[2.5rem]">
              <FormCheck
                name="controllCheckbox"
                onChange={(e) => {
                  if (!e.target.checked) setSelectedRows([]);
                  else {
                    let arr = [] as Array<number>;
                    document
                      .querySelectorAll('[type="checkbox"]')
                      .forEach((checkbox: any) => {
                        arr.push(parseInt(checkbox.name));
                      });
                    setSelectedRows(arr);
                  }
                }}
              />
            </th>
            {headers.map((column, key) => {
              return (
                <th
                  onClick={() => {
                    _setOrderBy(fieldsState[key]);
                  }}
                  className="text-center group"
                  key={key}
                >
                  <div className="flex justify-center">
                    {column}{' '}
                    {orderBy.map((item: any) => {
                      if (
                        JSON.stringify(fieldToObj(fieldsState[key], 'desc')) ===
                        JSON.stringify(item)
                      ) {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-down ml-[0.5rem] mt-[0.2rem]"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                            />
                          </svg>
                        );
                      }
                      if (
                        JSON.stringify(fieldToObj(fieldsState[key], 'asc')) ===
                        JSON.stringify(item)
                      ) {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-up ml-[0.5rem] mt-[0.2rem]"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                            />
                          </svg>
                        );
                      }
                    })}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any, key) => {
            return (
              <tr key={key}>
                <td className="w-[2.5rem] text-center">
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
                    try {
                      return value[cur];
                    } catch (error) {
                      return '';
                    }
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
              onClick={() =>
                setPage(
                  parseInt(page as string) - 1 >= 0
                    ? parseInt(page as string) - 1
                    : page
                )
              }
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
              <Form.Control name="page" value={page} onChange={onChange} />
            </Form.Group>
          </li>

          <li>
            <button
              onClick={() => setPage(parseInt(page as string) + 1)}
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
