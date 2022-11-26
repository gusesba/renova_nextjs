import React, { Dispatch, SetStateAction } from 'react';
import { FormCheck, Table } from 'react-bootstrap';

export interface IMyTable {
  headers: Array<string>;
  rows: Array<Object>;
  selectedRows: Array<number>;
  setSelectedRows: Dispatch<SetStateAction<Array<number>>>;
}

const MyTable: React.FC<IMyTable> = ({
  headers,
  rows,
  selectedRows,
  setSelectedRows,
}) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <Table bordered hover>
        <thead>
          <tr>
            <th></th>
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
          {rows?.map((row: any, key) => {
            return (
              <tr key={key}>
                <td>
                  <FormCheck
                    key={key}
                    name={row?.id?.toString()}
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
                {row
                  ? Object.values(row).map((item: any, key) => {
                      return (
                        <td className="text-center" key={key}>
                          <span className="pr-1 pl-1">
                            {item != null && item != undefined
                              ? Object.values(item).length
                                ? typeof item == typeof 'aa'
                                  ? item
                                  : Object.values(item)[0]
                                : item
                              : ''}
                          </span>
                        </td>
                      );
                    })
                  : ''}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MyTable;
