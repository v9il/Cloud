import { Space, Button, Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  ReloadOutlined,
  ToolOutlined,
} from '@ant-design/icons';
const { ipcRenderer } = window.require('electron');

export function MenuBar() {
  return (
    <Space>
      <Tooltip title={'Build a new client'}>
        <Button icon={<ToolOutlined />} type={'primary'}>
          Build
        </Button>
      </Tooltip>
      <Tooltip title={'Refresh clients'}>
        <Button
          onClick={() => {
            ipcRenderer.send('clients_refresh');
          }}
          icon={<ReloadOutlined />}
        >
          Refresh clients
        </Button>
      </Tooltip>
      <Tooltip title={'About CloudRAT'}>
        <Button icon={<InfoCircleOutlined />}>About</Button>
      </Tooltip>
    </Space>
  );
}
