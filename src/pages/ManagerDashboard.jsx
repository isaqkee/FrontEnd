
import React from 'react';
import {
  Activity,
  Clock3,
  Gauge,
  ShieldCheck,
  RefreshCw,
  MoreHorizontal,
  Package,
  ClipboardList
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import StatCard from '../components/StatCard.jsx';

const trend = [
  { day: 'Seg', oee: 84 },
  { day: 'Ter', oee: 87 },
  { day: 'Qua', oee: 86 },
  { day: 'Qui', oee: 89 },
  { day: 'Sex', oee: 88 },
  { day: 'Sáb', oee: 91 },
  { day: 'Hoje', oee: 87 }
];

const orderStatus = [
  { name: 'Concluídas', value: 64, color: '#10c9a4' },
  { name: 'Em produção', value: 24, color: '#4385ff' },
  { name: 'Aguardando', value: 12, color: '#f4bd4f' }
];

const production = [
  { day: 'Seg', actual: 1300, goal: 1500 },
  { day: 'Ter', actual: 1450, goal: 1500 },
  { day: 'Qua', actual: 1250, goal: 1500 },
  { day: 'Qui', actual: 1600, goal: 1500 },
  { day: 'Sex', actual: 1520, goal: 1500 },
  { day: 'Sáb', actual: 1680, goal: 1500 },
  { day: 'Hoje', actual: 1258, goal: 1600 }
];

export default function ManagerDashboard({
  machine,
  orders: placedOrders
}) {
  const formatCurrency = value =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

  const formatDate = value => {
    if (!value) return '-';

    return value;
  };

  return (
    <section className="page dashboard-page">

      {/* Cabeçalho */}
      <div className="page-heading">
        <div>
          <span className="eyebrow blue-text">
            ANÁLISE DE PERFORMANCE
          </span>

          <h1>Dashboard Industrial</h1>

          <p>
            Indicadores consolidados da linha de produção.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={13} />
          Atualizar dados
        </button>
      </div>

      {/* Indicadores */}
      <div className="stats-grid dashboard-stats">

        <StatCard
          icon={Activity}
          label="OEE"
          value={machine.running ? '87.1' : '0.0'}
          suffix="%"
          progress={machine.running ? 87.1 : 0}
          note="↗ +2,4% vs. ontem"
        />

        <StatCard
          icon={Clock3}
          label="DISPONIBILIDADE"
          value={machine.running ? '94.8' : '0.0'}
          suffix="%"
          tone="cyan"
          progress={machine.running ? 94.8 : 0}
          note="↗ +1,2% vs. ontem"
        />

        <StatCard
          icon={Gauge}
          label="DESEMPENHO"
          value={machine.running ? '91.6' : '0.0'}
          suffix="%"
          tone="purple"
          progress={machine.running ? 91.6 : 0}
          note="↗ +3,3% vs. ontem"
        />

        <StatCard
          icon={ShieldCheck}
          label="QUALIDADE"
          value="97.1"
          suffix="%"
          tone="green"
          progress={97.1}
          note="↗ +0,8% vs. ontem"
        />

      </div>

      {/* Gráficos */}
      <div className="dashboard-charts">

        {/* Evolução do OEE */}
        <section className="panel chart-panel trend-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ÚLTIMOS 7 DIAS</span>
              <h3>Evolução do OEE</h3>
            </div>

            <MoreHorizontal size={20} />
          </div>

          <div className="chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trend}
                margin={{
                  top: 12,
                  right: 10,
                  left: -18,
                  bottom: 0
                }}
              >
                <defs>
                  <linearGradient
                    id="oeeFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4385ff"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor="#4385ff"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#1b2b42"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="day"
                  stroke="#627b9f"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  domain={[70, 100]}
                  stroke="#627b9f"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: '#101d30',
                    border: '1px solid #243a58',
                    borderRadius: 8,
                    color: '#fff'
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="oee"
                  name="OEE"
                  stroke="#4385ff"
                  strokeWidth={2.5}
                  fill="url(#oeeFill)"
                  unit="%"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Status das ordens */}
        <section className="panel chart-panel orders-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">STATUS ATUAL</span>
              <h3>Ordens de produção</h3>
            </div>

            <MoreHorizontal size={20} />
          </div>

          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="56%"
                  outerRadius="78%"
                  paddingAngle={2}
                  stroke="#0d192b"
                  strokeWidth={2}
                >
                  {orderStatus.map(item => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: '#101d30',
                    border: '1px solid #243a58',
                    borderRadius: 8,
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="legend">
            {orderStatus.map(item => (
              <span key={item.name}>
                <i style={{ background: item.color }} />
                {item.name}
              </span>
            ))}
          </div>

          <div className="orders-note">
            {placedOrders.length} pedido(s) criado(s) pela loja
          </div>
        </section>

        {/* Produção diária */}
        <section className="panel chart-panel production-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">REALIZADO X META</span>
              <h3>Produção diária</h3>
            </div>

            <MoreHorizontal size={20} />
          </div>

          <div className="chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={production}
                margin={{
                  top: 10,
                  right: 10,
                  left: -18,
                  bottom: 0
                }}
              >
                <CartesianGrid
                  stroke="#1b2b42"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="day"
                  stroke="#627b9f"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#627b9f"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: '#101d30',
                    border: '1px solid #243a58',
                    borderRadius: 8,
                    color: '#fff'
                  }}
                />

                <Bar
                  dataKey="actual"
                  name="Produzido"
                  fill="#4385ff"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="goal"
                  name="Meta"
                  fill="#263b5b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Estoque */}
        <section className="panel chart-panel stock-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ITENS CRÍTICOS</span>
              <h3>Níveis de estoque</h3>
            </div>

            <Package size={18} />
          </div>

          <div className="stock-list">
            <Stock
              name="Caixa Modular 40L"
              units="248 unidades"
              value={78}
            />

            <Stock
              name="Conector industrial"
              units="86 unidades"
              value={42}
            />

            <Stock
              name="Módulo de controle"
              units="32 unidades"
              value={24}
            />

            <Stock
              name="Sensor óptico"
              units="114 unidades"
              value={63}
            />
          </div>
        </section>

      </div>

      {/* Tabela de pedidos enviados para produção */}
      <section className="panel recent-orders">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">
              ACOMPANHAMENTO DA PRODUÇÃO
            </span>

            <h3>Ordens de produção</h3>
          </div>

          <span className="mini-badge">
            {placedOrders.length} ordens
          </span>
        </div>

        {placedOrders.length === 0 ? (
          <div className="empty-orders">
            <ClipboardList size={24} />

            <p>Nenhuma ordem de produção cadastrada.</p>

            <small>
              Quando um pedido for enviado pela loja industrial,
              ele aparecerá nesta tabela.
            </small>
          </div>
        ) : (
          <div className="orders-table">
            <div className="orders-table-head">
              <span>IDENTIFICAÇÃO</span>
              <span>DATA</span>
              <span>ITENS</span>
              <span>TOTAL</span>
              <span>STATUS</span>
            </div>

            {placedOrders.map(order => (
              <div className="orders-table-row" key={order.id}>
                <strong>{order.id}</strong>

                <span>{formatDate(order.date)}</span>

                <span>
                  {order.items.reduce(
                    (quantity, item) => quantity + item.quantity,
                    0
                  )}
                </span>

                <strong>{formatCurrency(order.total)}</strong>

                <span className="pill online">
                  <i />
                  Enviado
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

    </section>
  );
}

function Stock({ name, units, value }) {
  return (
    <div className="stock-row">
      <div className="stock-title">
        <span>
          {name}
          <small>{units}</small>
        </span>

        <strong>{value}%</strong>
      </div>

      <div className="progress-track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
