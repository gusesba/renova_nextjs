import { useState } from 'react';
import { baseURL } from '../../config/config';
import MyModal from '../modal/MyModal';
import MyTable from '../table/MyTable';

export interface IMyPage {
  ModalBody: React.FC<any>;
  size?: 'sm' | 'lg' | 'xl';
  name: string;
  url: string;
  headers: Array<string>;
  fields: {};
  filter?: {};
}

const MyPage: React.FC<IMyPage> = ({
  ModalBody,
  headers,
  url,
  fields,
  size,
  name,
  filter,
}) => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([] as Array<number>);

  const handleDelete = () => {
    const body = {
      ids: selectedRows,
    };

    fetch(baseURL + url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else console.log(data.count);
      });
  };

  return (
    <section>
      <MyModal
        show={addModalShow}
        setShow={setAddModalShow}
        size={size}
        name={name}
      >
        <ModalBody />
      </MyModal>
      <MyTable
        headers={headers}
        url={url}
        fields={fields}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        filter={filter}
      />

      <div className="group fixed flex flex-col right-[10vw] top-[90vh] ">
        <div
          onClick={handleDelete}
          className="absolute bottom-[0] right-[-2.5rem] hidden flex-col pb-3 group-hover:flex"
        >
          <button className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash ml-[11px]"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button
            onClick={() => setAddModalShow(true)}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300"
          >
            +
          </button>
        </div>
        <button className="bg-[#000] absolute text-white w-10 h-10 rounded-md hover:bg-gray-300 group transition-all duration-300">
          C
        </button>
      </div>
    </section>
  );
};

export default MyPage;
