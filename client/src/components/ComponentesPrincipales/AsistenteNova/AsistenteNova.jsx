import React, { useState } from "react";
import AWS from "aws-sdk";
import "./AsistenteNova.css";

AWS.config.update({
  accessKeyId: "AKIA4SZ6OQ66ASMHEFGR",
  secretAccessKey: "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",
  region: "us-east-1",
});

const AsistenteNova = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const lexClientV2 = new AWS.LexRuntimeV2();

  const enviarMensajeMia = async () => {
    const params = {
      botId: "AV1JBYDFAN",
      botAliasId: "TSTALIASID",
      localeId: "es_419",
      sessionId: Math.random().toString(36).substring(2, 15),
      text: inputText,
    };

    try {
      const response = await lexClientV2.recognizeText(params).promise();
      console.log(response);

      // Manejar la respuesta de Lex
      const botMessage = response.messages[0].content;
      setMessages([
        ...messages,
        { text: botMessage, sender: "bot" },
        { text: inputText, sender: "user" },
      ]);
    } catch (error) {
      console.log(error);
      // Manejar los errores aquí
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    enviarMensajeMia();
    setInputText("");
  };

  const toggleChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <div className={`chat-modal ${isChatMinimized ? "minimized" : ""}`}>
      <div className="chat-header" onClick={toggleChat}>
        <div className="chat-title">Asistente Nova</div>
        <div className="chat-options">
          <button className="minimize-button">
            <i
              className={`fas ${isChatMinimized ? "fa-plus" : "fa-minus"}`}
            ></i>
          </button>
        </div>
      </div>
      {!isChatMinimized && (
        <div className="chat-body">
          <div className="messages">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                {message.sender === "user" ? (
                  <div className="user-message">Tú: {message.text}</div>
                ) : (
                  <div className="bot-message">NovaChagpt: {message.text}</div>
                )}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsistenteNova;
