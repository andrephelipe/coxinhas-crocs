import React, { useState } from 'react';
import './App.css'

function PedidoPage() {
  const [pacote, setPacote] = useState('');
  const [quantidade, setQuantidade] = useState({
    '10': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '15': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '25': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '50': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '75': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '100': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '125': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '150': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '200': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '250': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '300': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '400': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '500': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 },
    '600': { coxinha: 0, bolinhoQueijo: 0, calabresaQueijo: 0, presuntoQueijo: 0, kibeTradicional: 0, risolesCarne: 0 }
  });
  const [formaPagamento, setFormaPagamento] = useState('');
  const [trocoPara, setTrocoPara] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');

  const handleChangePacote = (event) => {
    setPacote(event.target.value);
    setQuantidade({
      ...quantidade,
      [event.target.value]: {
        coxinha: 0,
        bolinhoQueijo: 0,
        calabresaQueijo: 0,
        presuntoQueijo: 0,
        kibeTradicional: 0,
        risolesCarne: 0
      }
    });
  };

  const handleChangeQuantidade = (event, tipo) => {
    const novaQuantidade = { ...quantidade };
    novaQuantidade[pacote][tipo] = parseInt(event.target.value) || 0;
    const totalSalgados = Object.values(novaQuantidade[pacote]).reduce((total, qtd) => total + qtd, 0);
    if (totalSalgados > parseInt(pacote)) {
      novaQuantidade[pacote][tipo] = Math.min(novaQuantidade[pacote][tipo], parseInt(pacote) - (totalSalgados - parseInt(event.target.value)));
    }
    setQuantidade(novaQuantidade);
  };

  const enviarPedidoWhatsApp = () => {
    const mensagem = `Pedido de ${nome}:\n\nPacote: ${pacote} unidades\n\nQuantidade por sabor:\n${Object.entries(quantidade[pacote]).map(([sabor, qtd]) => `${sabor}: ${qtd}`).join('\n')}\n\nEndereço de entrega:\n${endereco}, ${numero} - ${bairro}, CEP: ${cep}\n\nForma de pagamento: ${formaPagamento === 'dinheiro' ? 'Dinheiro - Troco para: ' + trocoPara : formaPagamento}`;
    const url = `https://wa.me/5511932416036?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    enviarPedidoWhatsApp();
  };

  return (
    <div className="pedido-container">
      <h1>Faça seu Pedido</h1>
      <form onSubmit={handleSubmit}>
        {/* Pacote de Salgados */}
        <fieldset className="pacote">
          <legend>Escolha o Pacote</legend>
          <select value={pacote} onChange={handleChangePacote}>
            <option value="">Selecione</option>
            <option value="10">10 unidades - R$ 9,00</option>
            <option value="15">15 unidades - R$ 13,50</option>
            <option value="25">25 unidades - R$ 22,50</option>
            <option value="50">50 unidades - R$ 45,00</option>
            <option value="75">75 unidades - R$ 67,50</option>
            <option value="100">100 unidades - R$ 80,00</option>
            <option value="125">125 unidades - R$ 100,00</option>
            <option value="150">150 unidades - R$ 120,00</option>
            <option value="200">200 unidades - R$ 160,00</option>
            <option value="250">250 unidades - R$ 200,00</option>
            <option value="300">300 unidades - R$ 240,00</option>
            <option value="400">400 unidades - R$ 320,00</option>
            <option value="500">500 unidades - R$ 400,00</option>
            <option value="600">600 unidades - R$ 480,00</option>
          </select>
        </fieldset>

        {/* Quantidade de Salgados */}
        {pacote && (
          <fieldset className="quantidade">
            <legend>Escolha a Quantidade de Salgados</legend>
            <div className="salgado">
              <label>Coxinha</label>
              <input type="number" min="0" value={quantidade[pacote].coxinha === 0 ? '' : quantidade[pacote].coxinha} onChange={(e) => handleChangeQuantidade(e, 'coxinha')} />
            </div>
            <div>
              <label>Bolinho de Queijo</label>
              <input type="number" min="0" value={quantidade[pacote].bolinhoQueijo === 0 ? '' : quantidade[pacote].bolinhoQueijo} onChange={(e) => handleChangeQuantidade(e, 'bolinhoQueijo')} />
            </div>
            <div>
              <label>Calabresa com Queijo</label>
              <input type="number" min="0" value={quantidade[pacote].calabresaQueijo === 0 ? '' : quantidade[pacote].calabresaQueijo} onChange={(e) => handleChangeQuantidade(e, 'calabresaQueijo')} />
            </div>
            <div>
              <label>Presunto com Queijo</label>
              <input type="number" min="0" value={quantidade[pacote].presuntoQueijo === 0 ? '' : quantidade[pacote].presuntoQueijo} onChange={(e) => handleChangeQuantidade(e, 'presuntoQueijo')} />
            </div>
            <div>
              <label>Kibe Tradicional</label>
              <input type="number" min="0" value={quantidade[pacote].kibeTradicional === 0 ? '' : quantidade[pacote].kibeTradicional} onChange={(e) => handleChangeQuantidade(e, 'kibeTradicional')} />
            </div>
            <div>
              <label>Risoles de Carne</label>
              <input type="number" min="0" value={quantidade[pacote].risolesCarne === 0 ? '' : quantidade[pacote].risolesCarne} onChange={(e) => handleChangeQuantidade(e, 'risolesCarne')} />
            </div>
          </fieldset>
        )}

        {/* Informações do Cliente */}
        {pacote && (
          <fieldset className="informacoes-cliente">
            <legend>Informações do Cliente</legend>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="endereco">Endereço:</label>
              <input type="text" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="numero">Número:</label>
              <input type="text" id="numero" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="bairro">Bairro:</label>
              <input type="text" id="bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="cep">CEP:</label>
              <input type="text" id="cep" name="cep" value={cep} onChange={(e) => setCep(e.target.value)} required />
            </div>
          </fieldset>
        )}

        {/* Forma de Pagamento */}
        {pacote && (
          <fieldset className="forma-pagamento">
            <legend>Forma de Pagamento</legend>
            <label>
              <input type="radio" name="formaPagamento" value="pix" checked={formaPagamento === 'pix'} onChange={() => setFormaPagamento('pix')} />
              Pix
            </label>
            <label>
              <input type="radio" name="formaPagamento" value="dinheiro" checked={formaPagamento === 'dinheiro'} onChange={() => setFormaPagamento('dinheiro')} />
              Dinheiro
            </label>
            <label>
              <input type="radio" name="formaPagamento" value="credito" checked={formaPagamento === 'credito'} onChange={() => setFormaPagamento('credito')} />
              Cartão de Crédito
            </label>
            <label>
              <input type="radio" name="formaPagamento" value="debito" checked={formaPagamento === 'debito'} onChange={() => setFormaPagamento('debito')} />
              Cartão de Débito
            </label>
            {formaPagamento === 'dinheiro' && (
              <div>
                <label htmlFor="trocoPara">Troco para:</label>
                <input type="text" id="trocoPara" name="trocoPara" value={trocoPara} onChange={(e) => setTrocoPara(e.target.value)} />
              </div>
            )}
          </fieldset>
        )}

        {/* Botão de Envio */}
        {pacote && (
          <button type="submit" className="enviar-pedido">Enviar Pedido</button>
        )}
      </form>
    </div>
  );
}

export default PedidoPage;
