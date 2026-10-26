import React, { useState } from 'react';
import { Users, UserRoundCog, ShieldCheck, Search, Plus, Check, X, Bell, Save } from 'lucide-react';
const initialUsers = [
 {id:1,initials:'AS',name:'André Silva',email:'andre@smart40.com',role:'Administrador',active:true,last:'Hoje, 10:40',tone:'blue'},
 {id:2,initials:'MC',name:'Marina Costa',email:'marina@smart40.com',role:'Supervisora',active:true,last:'Hoje, 10:41',tone:'purple'},
 {id:3,initials:'RS',name:'Rafael Souza',email:'rafael@smart40.com',role:'Operador',active:true,last:'Hoje, 10:42',tone:'green'},
 {id:4,initials:'CN',name:'Camila Nunes',email:'camila@smart40.com',role:'Operadora',active:false,last:'18 dias atrás',tone:'red'}
];
export default function Settings({notifications,setNotifications}) {
  const [users,setUsers] = useState(initialUsers);
  const [search,setSearch] = useState('');
  const [modal,setModal] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('Operador');
  const [saved,setSaved] = useState(false);
  const filtered = users.filter(u=>(u.name+' '+u.email+' '+u.role).toLowerCase().includes(search.toLowerCase()));
  const toggle = id => setUsers(us=>us.map(u=>u.id===id?{...u,active:!u.active}:u));
  const addUser = e => {e.preventDefault();if(!name.trim()||!email.trim())return;setUsers(us=>[...us,{id:Date.now(),initials:name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),name,email,role,active:true,last:'Agora',tone:'blue'}]);setName('');setEmail('');setModal(false);};
  return <section className="page settings-page">
    <div className="page-heading"><div><span className="eyebrow blue-text">CONFIGURAÇÕES</span><h1>Usuários e Acessos</h1><p>Gerencie perfis, permissões e acesso à plataforma.</p></div><button className="primary-button" onClick={()=>setModal(true)}><Plus size={16}/> Novo usuário</button></div>
    <div className="stats-grid user-stats"><UserStat icon={Users} label="TOTAL DE USUÁRIOS" value={users.length} tone="blue"/><UserStat icon={UserRoundCog} label="ADMINISTRADORES" value={users.filter(u=>u.role==='Administrador').length} tone="purple"/><UserStat icon={ShieldCheck} label="USUÁRIOS ATIVOS" value={users.filter(u=>u.active).length} tone="green"/></div>
    <section className="panel users-panel"><div className="panel-heading users-heading"><div><h3>Usuários cadastrados</h3><small>Controle de credenciais e níveis de acesso</small></div><label className="search-field"><Search size={15}/><input placeholder="Buscar usuário..." value={search} onChange={e=>setSearch(e.target.value)}/></label></div>
      <div className="users-table"><div className="users-table-head"><span>USUÁRIO</span><span>PERFIL</span><span>STATUS</span><span>ÚLTIMO ACESSO</span><span>AÇÕES</span></div>{filtered.map(u=><div className="users-table-row" key={u.id}><div className="user-identity"><span className={`avatar ${u.tone}`}>{u.initials}</span><span><strong>{u.name}</strong><small>{u.email}</small></span></div><div><span className="role-badge">{u.role}</span></div><div className={`user-status ${u.active?'':'inactive'}`}><i/>{u.active?'Ativo':'Inativo'}</div><span className="last-access">{u.last}</span><button className="table-action" onClick={()=>toggle(u.id)}>{u.active?'Desativar':'Ativar'}</button></div>)}
      {filtered.length===0&&<div className="empty-orders">Nenhum usuário encontrado.</div>}</div>
    </section>
    <section className="panel preferences-panel"><div><span className="eyebrow">PREFERÊNCIAS</span><h3>Notificações do sistema</h3><p>Receba alertas sobre produção, alarmes e novos pedidos.</p></div><button className={`toggle ${notifications?'toggle-on':''}`} onClick={()=>setNotifications(v=>!v)} aria-label="Alternar notificações"><span/></button></section>
    {saved&&<div className="notice success"><Check size={16}/> Preferências salvas com sucesso.</div>}
    {modal&&<div className="modal-backdrop" onClick={()=>setModal(false)}><form className="modal-card" onSubmit={addUser} onClick={e=>e.stopPropagation()}><div className="panel-heading"><div><span className="eyebrow">ACESSOS</span><h3>Novo usuário</h3></div><button type="button" className="icon-button" onClick={()=>setModal(false)}><X size={17}/></button></div><label>Nome completo<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: João da Silva"/></label><label>E-mail<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="joao@smart40.com"/></label><label>Perfil<select value={role} onChange={e=>setRole(e.target.value)}><option>Administrador</option><option>Supervisora</option><option>Operador</option><option>Operadora</option></select></label><button className="primary-button" type="submit"><Plus size={15}/> Criar usuário</button></form></div>}
  </section>;
}
function UserStat({icon:Icon,label,value,tone}){return <article className="user-stat panel"><span className={`stat-icon ${tone}`}><Icon size={19}/></span><div><span className="eyebrow">{label}</span><strong>{value}</strong></div></article>}