import axios from "axios";

const helperAsistenteNova = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/asistenteNova/preguntas"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const helperAsistenteNovaRespuestas = async (id, question) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/asistenteNova/preguntas/respuestas/${id}`
    );
    console.log("responseHAHAHAHAHHA", response.data);
    if (response.data.servicio === "chatgpt") {
      const chat = await chatGpt(question);

      return {
        respuestas: [
          {
            respuestas: chat.data.choices[0].message.content,
          },
        ],
      };
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const chatGpt = async (message) => {
  console.log("message", message);
  const request = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
  };
  try {
    return await axios.post(
      "https://api.openai.com/v1/chat/completions",
      request,
      {
        headers: {
          Authorization:
            "Bearer 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",
        },
      }
    );
  } catch (e) {
    console.log(e);
    return e;
  }
};

export { helperAsistenteNova, helperAsistenteNovaRespuestas };
