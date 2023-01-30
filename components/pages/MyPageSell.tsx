import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { baseURL } from '../../config/config';
import AlertContext from '../../contexts/AlertContext';
import { printRecibo } from '../../printers/printers';
import AddProductForm from '../forms/AddProductForm';
import AddSellProductForm from '../forms/AddSellProductForm';
import EditSellPriceForm from '../forms/EditSellPriceForm';
import FinishSellForm from '../forms/FinishSellForm';
import MyModal from '../modal/MyModal';
import MyTable from '../table/MySellTable';

export interface IMyPage {}

const MyPage: React.FC<IMyPage> = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedRows, _setSelectedRows] = useState([] as Array<number>);
  const [rows, _setRows] = useState([] as Array<Object>);
  const selectedRowsRef = useRef(selectedRows);
  const rowsRef = useRef(rows);
  const [modal, setModal] = useState('add');

  const setSelectedRows = (data: any) => {
    selectedRowsRef.current = data;
    _setSelectedRows(data);
  };

  const setRows = (data: any) => {
    rowsRef.current = data;
    _setRows(data);
  };

  const router = useRouter();

  const { setAlerts } = useContext(AlertContext) as {
    alerts: { variant: string; message: string }[];
    setAlerts: Dispatch<SetStateAction<{ variant: string; message: string }[]>>;
  };

  useEffect(() => {
    const shortcuts = (e: KeyboardEvent) => {
      if (e.key === '=' && e.ctrlKey) {
        e.preventDefault();
        setAddModalShow(true);
        setModal('add');
      } else if (e.key?.toLowerCase() === 'd' && e.ctrlKey) {
        e.preventDefault();
        removeRows();
      } else if (e.key?.toLowerCase() === 'e' && e.ctrlKey) {
        if (selectedRowsRef.current.length == 1) {
          e.preventDefault();
          setModal('edit');
          setAddModalShow(true);
        }
      }
    };

    document.addEventListener('keydown', shortcuts);

    return () => {
      document.removeEventListener('keydown', shortcuts);
    };
  }, []);

  const removeRows = () => {
    rowsRef.current.forEach((row: any) => {
      selectedRowsRef.current.forEach((id) => {
        if (row.id == id)
          setRows(
            rowsRef.current.filter((row: any) => {
              if (row.id != id) return row;
            })
          );
      });
    });
    setSelectedRows([]);
    document
      .querySelectorAll('[type="checkbox"]')
      .forEach((checkbox: any) => (checkbox.checked = false));
  };

  const editSellPrice = (sellPrice: number) => {
    setRows(
      rows.filter((row: any) => {
        if (row.id == selectedRows[0]) {
          row.sellPrice = sellPrice;
        }
        return row;
      })
    );
  };

  const finishSell = (type: string, buyerId: number) => {
    const body = {
      action: 'POST',
      type: type,
      buyerId: buyerId,
      products: rows.map((column: any) => {
        return {
          id: column.id,
          sellPrice: column.sellPrice,
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
        } else router.push('/sells');
      });
  };

  return (
    <section>
      <MyModal
        show={addModalShow}
        setShow={setAddModalShow}
        title={
          modal == 'add'
            ? 'Novo Produto'
            : modal == 'edit'
            ? 'Editar Preço de Venda'
            : 'Nova Venda'
        }
        size={modal == 'joker' ? 'lg' : undefined}
      >
        {modal == 'add' ? (
          <AddSellProductForm rows={rows} setRows={setRows} />
        ) : modal == 'edit' ? (
          <EditSellPriceForm editSellPrice={editSellPrice} />
        ) : modal == 'joker' ? (
          <AddProductForm
            after={(data: any) => {
              setAlerts((old) => {
                return [
                  ...old,
                  { variant: 'success', message: 'Produto Adicionado' },
                ];
              });
              setTimeout(() => {
                setAlerts((old) => {
                  return old.slice(1);
                });
              }, 3000);
              fetch(baseURL + '/product/' + data.id, {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'GET',
              })
                .then((response) => response.json())
                .then((data) => {
                  data.sellPrice = data.price;
                  setRows([data].concat([...rows]));
                });
            }}
            setUpload={() => {}}
            setShow={setAddModalShow}
          />
        ) : (
          <FinishSellForm finishSell={finishSell} />
        )}
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
        <div className="absolute bottom-[0] right-[-5rem] hidden flex-col pb-3 group-hover:flex w-[7.5rem] items-center">
          <button
            onClick={() => {
              setModal('finish');
              setAddModalShow(true);
            }}
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
          <button
            onClick={() => printRecibo('Venda', rows)}
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
          <button
            onClick={() => {
              if (selectedRows.length == 1) {
                setModal('edit');
                setAddModalShow(true);
              }
            }}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil ml-[11px]"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
          <button
            onClick={removeRows}
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
              setModal('joker');
              setAddModalShow(true);
            }}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-emoji-neutral-fill ml-[11px]"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setModal('add');
              setAddModalShow(true);
            }}
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
