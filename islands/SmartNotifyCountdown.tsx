import { useEffect, useState } from "preact/hooks";

interface propsSmartNotify {
  type: "stock" | "countdown" | "freeShipping";
}

// FUNÇÃO PARA COUNTDOWN

export function SmartNotifyCountdown() {
  // Defina o tempo inicial em segundos
  const tempoInicial = 10000;
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tempoRestante === 0) {
        clearInterval(intervalId); // Para o contador quando atingir zero
      } else {
        setTempoRestante(tempoRestante - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
    };
  }, [tempoRestante]);

  if (tempoRestante <= 0) {
    return null; // Não renderiza nada se o tempo acabou
  }

  // Separa o tempo restante em horas, minutos e segundos
  const horas = Math.floor(tempoRestante / 3600);
  const minutos = Math.floor((tempoRestante % 3600) / 60);
  const segundos = tempoRestante % 60;

  return (
    <div id="countdown" class="mx-auto">
      <p>Tempo restante:</p>
      {horas}:{minutos}:{segundos}
    </div>
  );
}
