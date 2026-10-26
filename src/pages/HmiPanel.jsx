
import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Box,
  Cog,
  RotateCcw,
  SlidersHorizontal,
  Play,
  Square,
  Siren
} from 'lucide-react';

export default function HmiPanel({ machine, setMachine }) {
  const [events, setEvents] = useState([
    {
      time: '10:43:12',
      text: 'Velocidade ajustada para 42 un/min',
      tone: 'blue'
    },
    {
      time: '10:42:05',
      text: 'Alerta de temperatura no motor M02',
      tone: 'yellow'
    },
    {
      time: '10:38:48',
      text: 'Ciclo automático iniciado',
      tone: 'green'
    },
    {
      time: '10:32:10',
      text: 'Ordem OP-2408 carregada',
      tone: 'blue'
    }
  ]);

  const [speed, setSpeed] = useState(machine.speed);
  const [alarm, setAlarm] = useState(true);

  const log = (text, tone = 'blue') => {
    setEvents(old => [
      {
        time: new Date().toLocaleTimeString('pt-BR'),
        text,
        tone
      },
      ...old
    ].slice(0, 6));
  };

  const start = () => {
    setMachine(m => ({
      ...m,
      running: true,
      emergency: false
    }));

    log('Ciclo de produção iniciado', 'green');
  };

  const stop = () => {
    setMachine(m => ({
      ...m,
      running: false
    }));

    log('Parada segura solicitada', 'yellow');
  };

  const reset = () => {
    setMachine(m => ({
      ...m,
      emergency: false,
      running: false
    }));

    setAlarm(false);
    log('Falhas resetadas', 'green');
  };

  const emergency = () => {
    setMachine(m => ({
      ...m,
      running: false,
      emergency: true
    }));

    log('EMERGÊNCIA acionada — linha parada', 'red');
  };

  return (
    <section className="page hmi-page">

      <div className="page-heading">
        <div>
          <span className="eyebrow blue-text">
            OPERAÇÃO • LINHA 01
          </span>

          <h1>IHM da Máquina</h1>

          <p>
            Controle, supervisão e diagnóstico em tempo real.
          </p>
        </div>

        <span
          className={`pill ${
            machine.running && !machine.emergency
              ? 'online'
              : 'danger-pill'
          }`}
        >
          <i />
          {machine.emergency
            ? 'EMERGÊNCIA'
            : machine.running
              ? 'EM OPERAÇÃO'
              : 'PARADA SEGURA'}
        </span>
      </div>

      <div className="hmi-layout">

        <section className="panel machine-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">
                LINHA DE PRODUÇÃO
              </span>
              <h3>Célula de Montagem 01</h3>
            </div>

            <span className="mini-badge">
              MODO AUTOMÁTICO
            </span>
          </div>

          <div
            className={`machine-scene ${
              machine.running ? 'machine-running' : ''
            }`}
          >
            <div className="machine-node feeder">
              <Cog size={42} />
              <strong>ALIMENTADOR</strong>
              <small>M01</small>
              <i />
            </div>

            <div className="conveyor">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="robot-arm">
              <div className="robot-joint" />
              <div className="robot-upper" />
              <div className="robot-lower" />
              <div className="robot-grip" />
            </div>

            <div className="machine-node pallet">
              <Box size={42} />
              <strong>PALETIZAÇÃO</strong>
              <small>M03</small>
              <i />
            </div>

            <span className="conveyor-label">
              ESTEIRA PRINCIPAL • {speed} un/min
            </span>

            {machine.emergency && (
              <div className="emergency-overlay">
                <Siren size={26} />
                PARADA DE EMERGÊNCIA
              </div>
            )}
          </div>

          <div className="machine-units">
            <Unit
              title="Alimentador M01"
              running={machine.running}
            />

            <Unit
              title="Esteira M02"
              running={machine.running}
            />

            <Unit
              title="Robô RB-01"
              running={machine.running}
            />

            <Unit
              title="Paletizador M03"
              running={machine.running}
            />
          </div>
        </section>

        <section className="panel command-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">
                PAINEL DE COMANDO
              </span>
              <h3>Controle da linha</h3>
            </div>

            <SlidersHorizontal size={18} />
          </div>

          <div className="command-buttons">
            <button
              className="command-btn start"
              onClick={start}
            >
              <Play size={18} fill="currentColor" />
              <strong>START</strong>
              <small>Iniciar ciclo</small>
            </button>

            <button
              className="command-btn stop"
              onClick={stop}
            >
              <Square size={17} fill="currentColor" />
              <strong>STOP</strong>
              <small>Parada segura</small>
            </button>

            <button
              className="command-btn reset"
              onClick={reset}
            >
              <RotateCcw size={19} />
              <strong>RESET</strong>
              <small>Limpar falhas</small>
            </button>

            <button
              className="command-btn emergency"
              onClick={emergency}
            >
              <Siren size={19} />
              <strong>EMERGÊNCIA</strong>
              <small>Parada imediata</small>
            </button>
          </div>

          <div className="speed-control">
            <div>
              <span className="eyebrow">
                VELOCIDADE DA ESTEIRA
              </span>

              <strong>
                {speed} <small>un/min</small>
              </strong>
            </div>

            <input
              aria-label="Velocidade da esteira"
              type="range"
              min="0"
              max="60"
              value={speed}
              onChange={e => {
                const newSpeed = Number(e.target.value);

                setSpeed(newSpeed);

                setMachine(m => ({
                  ...m,
                  speed: newSpeed
                }));
              }}
            />

            <div className="speed-scale">
              <span>0</span>
              <span>60 un/min</span>
            </div>
          </div>
        </section>
      </div>

      <div className="hmi-bottom-grid">

        <section className="panel counters-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">
                INDICADORES DO TURNO
              </span>
              <h3>Contadores</h3>
            </div>
          </div>

          <div className="counter-grid">
            <Counter
              label="PRODUZIDAS"
              value={machine.cycles}
            />

            <Counter
              label="APROVADAS"
              value={Math.max(0, machine.cycles - 18)}
            />

            <Counter
              label="REJEITADAS"
              value="18"
              red
            />

            <Counter
              label="META"
              value="1600"
            />
          </div>
        </section>

        <section className="panel alarm-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">
                ALARMES ATIVOS
              </span>
              <h3>Diagnóstico</h3>
            </div>

            <span className="alarm-count">
              {alarm ? '2' : '1'}
            </span>
          </div>

          {alarm && (
            <div className="alarm-item warning">
              <AlertTriangle size={15} />

              <div>
                <strong>
                  Temperatura do motor M02 acima do ideal
                </strong>
                <small>10:42 • Linha 01</small>
              </div>
            </div>
          )}

          <div className="alarm-item info">
            <Activity size={15} />

            <div>
              <strong>
                Inspeção preventiva programada para 18:00
              </strong>
              <small>09:15 • Linha 01</small>
            </div>
          </div>
        </section>

        <section className="panel events-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">REGISTRO</span>
              <h3>Log de eventos</h3>
            </div>
          </div>

          <div className="event-list">
            {events.map((event, index) => (
              <div className="event-row" key={index}>
                <i className={`event-dot ${event.tone}`} />

                <time>{event.time}</time>

                <span>{event.text}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}

function Unit({ title, running }) {
  return (
    <div className="unit">
      <i className={running ? '' : 'muted-dot'} />

      <div>
        <strong>{title}</strong>
        <small>{running ? 'Operando' : 'Parado'}</small>
      </div>
    </div>
  );
}

function Counter({ label, value, red }) {
  return (
    <div className="counter">
      <span className="eyebrow">{label}</span>

      <strong className={red ? 'red-text' : ''}>
        {typeof value === 'number'
          ? value.toLocaleString('pt-BR')
          : value}
      </strong>
    </div>
  );
}
