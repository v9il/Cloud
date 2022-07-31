import { Card } from 'antd';
import { ClientsTable } from './ClientsTable/ClientsTable';
import { MenuBar } from './MenuBar/MenuBar';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Card title={'Cloud'} extra={<MenuBar />}>
        <ClientsTable />
      </Card>
    </div>
  );
}

export default App;
