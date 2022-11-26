import { useState } from 'react';
import { baseURL } from '../../config/config';
import AddSellProductForm from '../forms/AddSellProductForm';
import MyModal from '../modal/MyModal';
import MyTable from '../table/MySellTable';

export interface IMyPage {}

const MyPage: React.FC<IMyPage> = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([] as Array<number>);
  const [rows, setRows] = useState([] as Array<Object>);

  const finishSell = () => {
    const body = {
      action: 'POST',
      type: 'sell',
      buyerId: 1,
      products: rows.map((column: any) => {
        return {
          id: column.id,
        };
      }),
    };

    fetch(baseURL + '/sell', {
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
        } else console.log(data);
      });
  };

  return (
    <section>
      <MyModal show={addModalShow} setShow={setAddModalShow} name={'Produto'}>
        <AddSellProductForm rows={rows} setRows={setRows} />
      </MyModal>
      <MyTable
        headers={[
          'ID',
          'Preço',
          'Produto',
          'Marca',
          'Tamanho',
          'Cor',
          'Descrição',
          'Entrada',
          'Preço Venda',
        ]}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rows={rows}
      />
      <div className="group fixed flex flex-col right-[10vw] top-[90vh] ">
        <div className="absolute bottom-[0] right-[-2.5rem] hidden flex-col pb-3 group-hover:flex">
          <button
            onClick={finishSell}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-lg ml-[11px]"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
            </svg>
          </button>
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
