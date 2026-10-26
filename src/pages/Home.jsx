import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Boxes, Clock3, Factory, Gauge, ShoppingCart, Settings as SettingsIcon, Play, RefreshCw, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';

export default function Home({ machine }) {
  return <section className="page">
    <div className="page-heading"><div><span className="eyebrow blue-text">VISÃO GERAL</span><h1>Olá, André. Bem-vindo à operação.</h1><p>Acompanhe a performance da sua fábrica em tempo real.</p></div><span className="updated"><RefreshCw size={12}/> Atualizado agora</span></div>
    <section className="hero-banner">
      <div className="hero-copy"><span className="pill online"><i/> MÁQUINA {machine.running && !machine.emergency ? 'ONLINE' : 'PARADA'}</span><h2>Produção inteligente.<br/><span>Decisões em tempo real.</span></h2><p>Linha de montagem automatizada operando dentro dos parâmetros ideais.</p><Link to="/hmi" className="primary-button"><Play size={14} fill="currentColor"/> Acessar operação <ArrowRight size={15}/></Link></div>
      <div className="hero-efficiency"><span>EFICIÊNCIA ATUAL</span><strong>{machine.running ? '87.3%' : '0.0%'}</strong><div className="progress-track"><span style={{width: machine.running ? '87.3%' : '0%'}}/></div></div>
    </section>
    <div className="stats-grid home-stats">
      <StatCard icon={Factory} label="STATUS DA MÁQUINA" value={machine.running ? 'Operando' : 'Parada'} tone="green" note="↗ Linha 01 • Automática vs. ontem"/>
      <StatCard icon={Boxes} label="PRODUÇÃO HOJE" value={machine.cycles.toLocaleString('pt-BR')} suffix=" / 1600" progress={machine.cycles/16} />
      <StatCard icon={Activity} label="OEE GERAL" value={machine.running ? '87.3' : '0.0'} suffix="%" tone="cyan" note="↗ +2,4% vs. ontem"/>
      <StatCard icon={Clock3} label="TEMPO EM OPERAÇÃO" value={machine.running ? '07:42' : '00:00'} suffix=" h" tone="purple" note="↗ 94,8% disponível vs. ontem"/>
    </div>
    <div className="section-heading"><div><span className="eyebrow blue-text">ACESSO RÁPIDO</span><h3>O que você deseja acessar?</h3></div></div>
    <div className="quick-grid">
      <QuickLink to="/hmi" icon={Gauge} title="IHM da Máquina" subtitle="Controle e supervisão da linha" tone="blue"/>
      <QuickLink to="/dashboard" icon={LayoutIcon} title="Dashboard" subtitle="Indicadores e produtividade" tone="cyan"/>
      <QuickLink to="/ecommerce" icon={ShoppingCart} title="E-Commerce" subtitle="Produtos e novos pedidos" tone="purple"/>
      <QuickLink to="/settings" icon={SettingsIcon} title="Configurações" subtitle="Usuários e permissões" tone="green"/>
    </div>
  </section>;
}
function LayoutIcon(props){ return <Boxes {...props}/>; }
function QuickLink({to,icon:Icon,title,subtitle,tone}) { return <Link to={to} className="quick-card"><span className={`stat-icon ${tone}`}><Icon size={19}/></span><span className="quick-text"><strong>{title}</strong><small>{subtitle}</small></span><ArrowRight size={15} className="quick-arrow"/></Link>; }