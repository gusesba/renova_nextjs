import React, { useEffect, useState } from 'react';
import { FormCheck, Table } from 'react-bootstrap';
import { baseURL } from '../../config/config';

export interface IMyTable {
  url: string;
  headers: Array<string>;
  fields: Array<string>;
}

const MyTable: React.FC<IMyTable> = ({ url, headers, fields }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const fetchData = (url: string, fields: Object) => {
    const body = {
      action: 'GET',
      number: 10,
      select: fields,
      skip: page * 10,
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
    const obj: any = {};
    for (const field of fields) {
      obj[field] = true;
    }
    fetchData(url, obj);
  }, [page]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <Table bordered hover>
        <thead>
          <tr>
            <th>
              <FormCheck />
            </th>
            {headers.map((column, key) => {
              return (
                <th className="text-center" key={key}>
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, key) => {
            return (
              <tr key={key}>
                <td>
                  <FormCheck />
                </td>
                {Object.values(row).map((item: any, key) => {
                  return (
                    <td className="text-center" key={key}>
                      <span className="pr-1 pl-1">
                        {Object.values(item).length
                          ? typeof item == typeof 'aa'
                            ? item
                            : Object.values(item)[0]
                          : item}
                      </span>
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
          Página{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {page + 1}
          </span>
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
