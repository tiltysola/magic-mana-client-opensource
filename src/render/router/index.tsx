import { Navigate, Route, Routes } from 'react-router-dom';

import CrosshairSuspension from '@/pages/Crosshair';
import Dashboard from '@/pages/Dashboard';
import Env from '@/pages/Env';
import Hosts from '@/pages/Hosts';
import Notfound from '@/pages/Notfound';
import Setting from '@/pages/Setting';
import System from '@/pages/System';
import SystemSuspension from '@/pages/System/Suspension';
import Tarkov from '@/pages/Tarkov';
import TarkovMiniSuspension from '@/pages/Tarkov/MiniSuspension';
import TarkovSuspension from '@/pages/Tarkov/Suspension';
import Tray from '@/pages/Tray';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/app" />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="system" element={<System />} />
        <Route path="hosts" element={<Hosts />} />
        <Route path="env" element={<Env />} />
        <Route path="setting" element={<Setting />} />
        <Route path="tarkov" element={<Tarkov />} />
        <Route path="*" element={<Notfound />} />
      </Route>
      <Route path="/suspension">
        <Route path="system" element={<SystemSuspension />} />
        <Route path="tarkov" element={<TarkovSuspension />} />
        <Route path="tarkovmini" element={<TarkovMiniSuspension />} />
        <Route path="crosshair" element={<CrosshairSuspension />} />
      </Route>
      <Route path="/tray" element={<Tray />} />
    </Routes>
  );
};

export default Index;
