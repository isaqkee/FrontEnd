import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Home from './pages/Home.jsx';
import HmiPanel from './pages/HmiPanel.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import EcommerceStore from './pages/EcommerceStore.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const [machine, setMachine] = useState({ running: true, emergency: false, speed: 39, cycles: 1258 });
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <div className="app-shell">
    <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />
    <main className="main-area">
      <Topbar onMenu={() => setSidebarOpen(v => !v)} notifications={notifications} />
      <Routes>
        <Route path="/" element={<Home machine={machine} />} />
        <Route path="/hmi" element={<HmiPanel machine={machine} setMachine={setMachine} />} />
        <Route path="/dashboard" element={<ManagerDashboard machine={machine} orders={orders} />} />
        <Route path="/ecommerce" element={<EcommerceStore orders={orders} setOrders={setOrders} />} />
        <Route path="/settings" element={<Settings notifications={notifications} setNotifications={setNotifications} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>;
}