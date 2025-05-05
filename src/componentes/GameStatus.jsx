import { useEffect, useState } from "react";

export default function GameStatus() {
  const [status, setStatus] = useState("⚔️ Jogo ao vivo: FURIA vs MIBR");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 60000); // atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const minutes = timer % 60;
    const hours = Math.floor(timer / 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  return (
    <div className="bg-furiaPurple text-white py-2 text-center border-b border-furiaWhite">
      <p className="text-sm font-medium">
        {status} | Tempo de partida: ⏱ {formatTime()}
      </p>
    </div>
  );
}
