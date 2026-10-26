import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, UserRound, ChevronDown } from 'lucide-react';

const titles = {'/':'Início','/hmi':'Operação','/dashboard':'Dashboard','/ecommerce':'Pedidos','/settings':'Configurações'};
export default function Topbar({ onMenu, notifications }) {
  const location = useLocation();
  return <header className="topbar">
    <button className="mobile-menu icon-button" onClick={onMenu} aria-label="Abrir menu"><Menu size={19}/></button>
    <div className="topbar-title"><small>CENTRAL DE CONTROLE</small><strong>{titles[location.pathname] || 'Início'}</strong></div>
    <div className="topbar-actions">
      <button className="plant-select"><span className="status-dot"/><span>Planta São Paulo</span><ChevronDown size={13}/></button>
      <button className="icon-button notification" aria-label="Notificações"><Bell size={17}/>{notifications && <i/>}</button>
      <button className="account-button"><UserRound size={16}/><span>Minha conta</span></button>
    </div>
  </header>;
}