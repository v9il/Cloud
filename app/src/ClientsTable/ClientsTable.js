import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { ClientsModal } from '../ClientsModal/ClientsModal';
import { ClientsTableColumns } from './ClientsTableColumns';
const { ipcRenderer } = window.require('electron');

export function ClientsTable() {
  const [clientsInforamtion, setClientsInformation] = useState([]);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    ipcRenderer.on('clients_data', (event, data) => {
      setClientsInformation(data);
    });
  }, []);

  return (
    <>
      <ClientsModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
      <Table
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              setSelectedClient(record);
              setModalOpened(true);
            },
          };
        }}
        bordered
        dataSource={clientsInforamtion}
        columns={ClientsTableColumns}
      ></Table>
    </>
  );
}
