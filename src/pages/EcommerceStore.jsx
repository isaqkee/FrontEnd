import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, CheckCircle2, PackageCheck, ArrowRight } from 'lucide-react';

const catalog = [
  {id:1,name:'Módulo de Controle SMART',description:'Controlador industrial modular',price:489.90,stock:24,color:'#3c72ed',code:'SM-401'},
  {id:2,name:'Sensor Óptico Industrial',description:'Sensor de alta precisão',price:159.90,stock:48,color:'#10bfa0',code:'SM-210'},
  {id:3,name:'Esteira Modular 40L',description:'Esteira para célula de montagem',price:1299.00,stock:12,color:'#a17aff',code:'SM-340'}
];
export default function EcommerceStore({orders,setOrders}) {
  const [cart,setCart] = useState({});
  const [notice,setNotice] = useState('');
  const add = id => setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const change = (id,delta) => setCart(c=>({...c,[id]:Math.max(0,(c[id]||0)+delta)}));
  const total = catalog.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);
  const submit = () => {
    if (!total) {setNotice('Adicione pelo menos um produto ao pedido.');return;}
    const order = {id:`OP-${String(Date.now()).slice(-6)}`,date:new Date().toLocaleString('pt-BR'),items:catalog.filter(p=>cart[p.id]).map(p=>({...p,quantity:cart[p.id]})),total};
    setOrders(old=>[order,...old]);setCart({});setNotice(`Pedido ${order.id} enviado para a fila de produção!`);
  };
  return <section className="page ecommerce-page">
    <div className="page-heading"><div><span className="eyebrow blue-text">LOJA INDUSTRIAL</span><h1>E-Commerce</h1><p>Selecione componentes e envie pedidos para a linha de produção.</p></div><div className="cart-total"><ShoppingCart size={17}/><span>{Object.values(cart).reduce((a,b)=>a+b,0)} itens</span></div></div>
    {notice && <div className={`notice ${notice.includes('enviado')?'success':'warning'}`}><CheckCircle2 size={16}/>{notice}<button onClick={()=>setNotice('')}>×</button></div>}
    <div className="store-layout"><div className="product-grid">{catalog.map(p=><article className="product-card" key={p.id}><div className="product-art" style={{'--product-color':p.color}}><div className="product-orbit"/><PackageCheck size={68}/><span>{p.code}</span></div><div className="product-info"><span className="eyebrow">COMPONENTE INDUSTRIAL</span><h3>{p.name}</h3><p>{p.description}</p><div className="product-stock"><i/>{p.stock} disponíveis</div><div className="product-buy"><strong>R$ {p.price.toLocaleString('pt-BR',{minimumFractionDigits:2})}</strong>{cart[p.id] ? <div className="quantity"><button onClick={()=>change(p.id,-1)} aria-label="Diminuir"><Minus size={13}/></button><b>{cart[p.id]}</b><button onClick={()=>add(p.id)} aria-label="Aumentar"><Plus size={13}/></button></div> : <button className="add-button" onClick={()=>add(p.id)}><Plus size={15}/> Adicionar</button>}</div></div></article>)}</div>
      <aside className="panel cart-panel"><div className="panel-heading"><div><span className="eyebrow">SEU PEDIDO</span><h3>Resumo do carrinho</h3></div><ShoppingCart size={18}/></div>{catalog.filter(p=>cart[p.id]).length ? catalog.filter(p=>cart[p.id]).map(p=><div className="cart-line" key={p.id}><div><strong>{p.name}</strong><small>{cart[p.id]} × R$ {p.price.toFixed(2).replace('.',',')}</small></div><b>R$ {(p.price*cart[p.id]).toFixed(2).replace('.',',')}</b></div>) : <div className="empty-cart"><ShoppingCart size={28}/><p>Seu carrinho está vazio.</p><small>Adicione produtos para começar.</small></div>}<div className="cart-subtotal"><span>Total</span><strong>R$ {total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</strong></div><button className="primary-button checkout-button" onClick={submit}>Enviar para produção <ArrowRight size={15}/></button><small className="cart-footnote">O pedido será registrado no painel do sistema.</small></aside></div>
    <section className="panel recent-orders"><div className="panel-heading"><div><span className="eyebrow">HISTÓRICO</span><h3>Pedidos recentes</h3></div><span className="mini-badge">{orders.length} pedidos</span></div>{orders.length===0?<div className="empty-orders">Nenhum pedido enviado ainda. Monte um carrinho e envie o primeiro.</div>:<div className="orders-table"><div className="orders-table-head"><span>IDENTIFICAÇÃO</span><span>DATA</span><span>ITENS</span><span>TOTAL</span><span>STATUS</span></div>{orders.map(o=><div className="orders-table-row" key={o.id}><strong>{o.id}</strong><span>{o.date}</span><span>{o.items.reduce((n,p)=>n+p.quantity,0)}</span><strong>R$ {o.total.toLocaleString('pt-BR',{minimumFractionDigits:2})}</strong><span className="pill online"><i/>Enviado</span></div>)}</div>}</section>
  </section>;
}