import { useEffect, useRef, useState } from 'react';
import { baseURL } from '../../config/config';
import { printEtiqueta } from '../../printers/printers';
import SearchClientForm from '../forms/SearchClientForm';
import MyModal from '../modal/MyModal';
import MyTable from '../table/MyTable';

export interface IMyPage {
  AddForm: React.FC<any>;
  size?: 'sm' | 'lg' | 'xl';
  name: string;
  url: string;
  headers: Array<string>;
  fields: any;
  filter?: any;
  after?: Function;
}

const MyPage: React.FC<IMyPage> = ({
  AddForm,
  headers,
  url,
  fields,
  size,
  name,
  filter,
  after,
}) => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedRows, _setSelectedRows] = useState([] as Array<number>);
  const selectedRowsRef = useRef(selectedRows);
  const [upload, setUpload] = useState(0);
  const [modal, setModal] = useState('add');
  const [stateFields, setStateFields] = useState(fields);
  const [stateFilter, setStateFilter] = useState(filter);
  const [stateHeaders, setStateHeaders] = useState(headers);

  const setSelectedRows = (data: any) => {
    selectedRowsRef.current = data;
    _setSelectedRows(data);
  };

  useEffect(() => {
    const shortcuts = (e: KeyboardEvent) => {
      if (e.key === '+' && e.shiftKey) {
        if (name != 'Saídas') setAddModalShow(true);
      } else if (e.key?.toLowerCase() === 'd' && e.shiftKey) {
        handleDelete();
      }
    };
    document.addEventListener('keydown', shortcuts);

    return () => {
      document.removeEventListener('keydown', shortcuts);
    };
  }, []);

  const handleDelete = () => {
    const body = {
      ids: selectedRowsRef.current,
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
        } else {
          console.log(data.count);
          setUpload(Math.random());
          setSelectedRows([]);
          document
            .querySelectorAll('[type="checkbox"]')
            .forEach((checkbox: any) => (checkbox.checked = false));
        }
      });
  };

  return (
    <section>
      <MyModal
        show={addModalShow}
        setShow={setAddModalShow}
        size={size}
        title={modal == 'add' ? 'Novo ' + name : 'Busca'}
      >
        {modal == 'add' ? (
          <AddForm after={after} setUpload={setUpload} />
        ) : (
          <SearchClientForm
            filter={stateFilter}
            setFilter={setStateFilter}
            setFields={setStateFields}
            fields={stateFields}
            setHeaders={setStateHeaders}
          />
        )}
      </MyModal>
      <MyTable
        headers={stateHeaders}
        url={url}
        fields={stateFields}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        filter={stateFilter}
        upload={upload}
      />

      <div className="group fixed flex flex-col right-[10vw] top-[90vh]">
        <div className="absolute bottom-[0] right-[-5rem] hidden flex-col pb-3 group-hover:flex w-[7.5rem] items-center">
          <button
            onClick={handleDelete}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
          >
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
            onClick={() => {
              setModal('search');
              setAddModalShow(true);
            }}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search ml-[11px]"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
          {name == 'Produto' && (
            <button
              onClick={() => printEtiqueta(selectedRows)}
              className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-printer ml-[11px]"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
              </svg>
            </button>
          )}

          {name != 'Saídas' && (
            <button
              onClick={() => {
                setModal('add');
                setAddModalShow(true);
              }}
              className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300"
            >
              +
            </button>
          )}
        </div>
        <button className="bg-[#000] absolute text-white w-10 h-10 rounded-md hover:bg-gray-300 group transition-all duration-300">
          C
        </button>
      </div>
    </section>
  );
};

export default MyPage;
