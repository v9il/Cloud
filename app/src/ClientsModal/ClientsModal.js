import { Button, Image, Modal, Tabs } from 'antd';

const { TabPane } = Tabs;

export function ClientsModal({
  selectedClient,
  setSelectedClient,
  modalOpened,
  setModalOpened,
}) {
  function closeModal() {
    setSelectedClient(undefined);
    setModalOpened(false);
  }
  return (
    <Modal
      width={800}
      centered
      visible={modalOpened}
      footer={[
        <Button key={'back'} onClick={closeModal}>
          Cancel
        </Button>,
      ]}
      onCancel={closeModal}
      title={`Managing ${
        selectedClient
          ? `${selectedClient.username} (${selectedClient.socket})`
          : 'loading..'
      }`}
    >
      <Tabs defaultActiveKey={1} tabPosition={'left'}>
        <TabPane tab={'Remote Desktop'} key={1}>
          1
        </TabPane>
        <TabPane tab={'File Explorer'} key={2}>
          2
        </TabPane>
        <TabPane tab={'Task Manager'} key={3}>
          3
        </TabPane>
      </Tabs>
    </Modal>
  );
}
