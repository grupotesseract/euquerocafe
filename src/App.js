import cafe1 from './assets/giphy.webp';
import cafe2 from './assets/giphy2.webp';
import cafe3 from './assets/giphy3.webp';
import cafe4 from './assets/giphy4.webp';
import cafe5 from './assets/giphy5.webp';
import piao from './assets/piao.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [cafeimg, setCafeimg] = useState(cafe1);
  const [participantes, setParticipantes] = useState([]);
  const [novoParticipante, setNovoParticipante] = useState({ nome: '', jaganhou: false });
  const [sorteado, setSorteado] = useState({});
  const [rotacao, setRotacao] = useState(0);
  let intervalSorteio;

  useEffect(() => {
    const random = Math.floor(Math.random() * 5);
    switch (random) {
      case 0:
        setCafeimg(cafe1);
        break;
      case 1:
        setCafeimg(cafe2);
        break;
      case 2:
        setCafeimg(cafe3);
        break;
      case 3:
        setCafeimg(cafe4);
        break;
      case 4:
        setCafeimg(cafe5);
        break;
      default:
        break;
    }
  }, [participantes]);

  const adicionaParticipante = (novoParticipante) => {
    setParticipantes([...participantes, novoParticipante]);
  }

  const startSorteio = () => {
    let aceleracao = 13;
    let rotacaoLocal = 0;
    const anguloPorParticipante = 360 / participantes.length;
    let indexParticipanteSorteado = 0;

    // limpa intervalo
    clearInterval(intervalSorteio)

    // Define intervalo de 10ms para fazer a animação
    intervalSorteio = setInterval(() => {
      rotacaoLocal += aceleracao;

      // Verifica se o angulo atual é maior que o angulo do participante atual
      if (rotacaoLocal > (indexParticipanteSorteado + 1) * anguloPorParticipante) {
        // Se sim, define o próximo como sorteado
        indexParticipanteSorteado++;

        // Se a rotação foi completa, zera a rotação
        if (rotacaoLocal >= 360) {
          rotacaoLocal = rotacaoLocal % 360;
        }
        // Se o participante sorteado for maior que o ultimo, define o primeiro como sorteado
        if (indexParticipanteSorteado === participantes.length) {
          indexParticipanteSorteado = 0;
        }
        // Sorteia uma desacelaração na rotação
        if (aceleracao > 0) {
          if (participantes[indexParticipanteSorteado].jaganhou) {
            aceleracao -= Math.random() / 2;
          } else {
            aceleracao -= Math.random();
          }
        }
        // Caso tenha parado, define a aceleração como 0 e limpa o intervalo
        if (aceleracao <= 0) {
          aceleracao = 0;
          clearInterval(intervalSorteio);
        }
        setSorteado(participantes[indexParticipanteSorteado]);
      }
      setRotacao(rotacaoLocal);
    }, 10);
  };

  return (
    <div className="App">
      <div className="background-container">
        <img src={cafeimg} className="App-logo" alt="logo" />
      </div>
      <div className="participantes box-cafe">
        <h3>Participantes</h3>
        {participantes.map((participante) => (
          <div key={participante.nome}>
            <span className={participante.jaganhou ? "jaganhou" : ""}>
              {participante.nome}
            </span>
          </div>
        ))}
      </div>

      <div className="sorteado box-cafe">
        <span>{sorteado.nome}</span>
        <button onClick={() => startSorteio()}>Sortear</button>
        <img
          src={piao}
          alt="piao"
          style={{
            transform: `rotate(${rotacao}deg)`,
            maxWidth: 200,
            maxHeight: 200,
          }}
        />
      </div>
      <div className="inclui-participantes box-cafe">
        <input
          type="text"
          placeholder="Nome do participante"
          value={novoParticipante.nome}
          onChange={(e) =>
            setNovoParticipante({ ...novoParticipante, nome: e.target.value })
          }
        />
        <div>
          <span> Já ganhou? </span>
          <input
            type="checkbox"
            checked={novoParticipante.jaganhou}
            onChange={(e) =>
              setNovoParticipante({
                ...novoParticipante,
                jaganhou: e.target.checked,
              })
            }
          />
        </div>
        <button onClick={() => adicionaParticipante(novoParticipante)}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default App;
