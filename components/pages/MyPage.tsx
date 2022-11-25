import { useState } from 'react';
import MyModal from '../../components/modal/MyModal';
import MyTable, { IMyTable } from '../../components/table/MyTable';

export interface IMyPage extends IMyTable {
  ModalBody: React.FC;
}

const MyPage: React.FC<IMyPage> = ({ ModalBody, headers, url, fields }) => {
  const [addModalShow, setAddModalShow] = useState(false);
  return (
    <section>
      <MyModal
        show={addModalShow}
        setShow={setAddModalShow}
        name="Cliente"
        ModalBody={ModalBody}
      />
      <MyTable headers={headers} url={url} fields={fields} />

      <div className="group fixed flex flex-col right-[10vw] top-[90vh] ">
        <div className="absolute bottom-[0] right-[-2.5rem] hidden flex-col pb-3 group-hover:flex s">
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
