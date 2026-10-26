import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, LayoutDashboard, Gauge, Boxes, Package, Settings as SettingsIcon, ChevronDown, Activity } from 'lucide-react';

const links = [
  { to: '/', label: 'Início', Icon: LayoutDashboard, end: true },
  { to: '/hmi', label: 'Operação', Icon: Gauge },
  { to: '/dashboard', label: 'Dashboard', Icon: Boxes },
  { to: '/ecommerce', label: 'Pedidos', Icon: Package },
  { to: '/settings', label: 'Configurações', Icon: SettingsIcon }
];

export default function Sidebar({ open, close }) {
  return <>
    {open && <button className="mobile-scrim" onClick={close} aria-label="Fechar menu" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <NavLink to="/" className="brand" onClick={close}>
        <span className="brand-mark"><Zap size={22} fill="currentColor" /></span>
        <span><strong>SMART <em>4.0</em></strong><small>INDUSTRIAL SYSTEM</small></span>
      </NavLink>
      <div className="nav-caption">MENU PRINCIPAL</div>
      <nav className="side-nav">
        {links.map(({to,label,Icon,end}) => <NavLink key={to} to={to} end={end} onClick={close} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icon size={18} /><span>{label}</span>{label === 'Operação' && <ChevronDown className="nav-chevron" size={14} />}
        </NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="system-status"><span className="status-dot" /><div><strong>Sistema operacional</strong><small>Última sync: agora</small></div></div>
        <div className="sidebar-divider" />
        <div className="cookie-row"><span>Gerenciar cookies ou desativar</span><ChevronDown size={14}/></div>
      </div>
    </aside>
  </>;
}