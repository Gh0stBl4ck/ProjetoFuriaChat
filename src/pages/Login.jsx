import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (name.trim() === "") return;
    localStorage.setItem("fanName", name);
    navigate("/chat");
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/src/video/plano_fundo.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>

      {/* Conteúdo sobre o vídeo */}
      <div className="h-full flex flex-col items-center justify-center bg-black bg-opacity-60 text-furiaWhite z-10 relative px-4">
        <h1 className="text-5xl font-extrabold tracking-wide mb-6 text-center animate-fadeInUp">
          <span className="font-black">FURIA</span> <span className="font-black">CHAT</span>
        </h1>

        <input
          type="text"
          placeholder="Digite seu nome de fã"
          className="p-3 rounded-lg text-furiaBlack w-64 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
        />
        <button
          className="mt-4 px-6 py-2 bg-furiaWhite text-furiaBlack rounded-xl border-2 border-furiaWhite font-bold hover:bg-opacity-80 transition"
          onClick={handleEnter}
        >
          Entrar no chat
        </button>
      </div>
    </div>
  );
}
