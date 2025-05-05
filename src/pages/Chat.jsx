import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import GameStatus from "/src/componentes/GameStatus";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [fanName, setFanName] = useState("");
  const [userColor, setUserColor] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const userId = useRef(uuidv4());

  const colors = ["cadetblue", "darkgoldenrod", "cornflowerblue", "darkkhaki", "hotpink", "gold"];

  useEffect(() => {
    const name = localStorage.getItem("fanName") || prompt("Digite seu nome");
    const color = colors[Math.floor(Math.random() * colors.length)];

    setFanName(name);
    setUserColor(color);
    localStorage.setItem("fanName", name);

    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      const { userId: senderId, userName, userColor, content } = JSON.parse(event.data);
      const message = {
        id: Date.now(),
        sender: userName,
        senderColor: userColor,
        content,
        self: senderId === userId.current,
      };
      setMessages((prev) => [...prev, message]);
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = {
      userId: userId.current,
      userName: fanName,
      userColor,
      content: input,
    };

    socket.send(JSON.stringify(message));
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-furiaBlack text-furiaWhite">
      <header className="bg-furiaBlack pt-2 pb-1 flex flex-col items-center border-b border-furiaWhite">
        <img
          src="/src/img/FuriaP.gif"
          alt="Logo FURIA"
          className="h-16 mb-0"
        />
        <h2 className="text-2xl font-bold">FURIA CHAT 🔥</h2>
        <p className="text-sm text-furiaWhite">{fanName} conectado</p>

      </header>
      <GameStatus/>

      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md ${msg.self ? "ml-auto text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-3 rounded-xl ${
                msg.self
                  ? "bg-furiaWhite text-furiaBlack"
                  : "bg-furiaBlack text-furiaWhite border border-furiaWhite"
              }`}
            >
              {!msg.self && (
                <p className="text-xs font-semibold" style={{ color: msg.senderColor }}>
                  {msg.sender}
                </p>
              )}
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 flex bg-furiaBlack border-t border-furiaWhite">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg text-furiaBlack mr-2"
          placeholder="Digite sua mensagem"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
        />
        <button
          className="px-4 py-2 bg-furiaWhite text-furiaBlack rounded-xl hover:bg-opacity-80"
          onClick={handleSend}
        >
          Enviar
        </button>
      </footer>
    </div>
  );
}
