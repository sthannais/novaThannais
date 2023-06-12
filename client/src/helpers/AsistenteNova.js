import axios from "axios";

const helperAsistenteNova = async (name) => {
  try {
    console.log("name", name);
    const response = await axios.get(
      `http://localhost:3001/asistenteNova/preguntas/${name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const helperAsistenteNovaRespuestas = async (name) => {
  try {
    const response = await helperAsistenteNova(name);
    const chat = await chatGpt(name);

    if (response && response.servicio === "db_nova") {
      const nameFunction = response.function;
      const responseData = await dataStructure();
      return {
        name_function: responseData[await nameFunction](),
        fields: response.columns_name,
        service: "db_nova",
      };
    }
    console.log("Pasoooooo");
    console.log(chat.data.choices[0].message.content);
    return {
      name: chat.data.choices[0].message.content,
      service: "chat_gpt",
    };
  } catch (error) {
    console.log(error);
  }
};

const dataStructure = async () => {
  let functions = {
    getListaDePrecios: async function () {
      try {
        const response = await axios.get(
          `http://localhost:3001/listaDePrecios`
        );
        console.log("responseHAHAHAHAHHA", response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getPersonal: async function () {
      try {
        const response = await axios.get(`http://localhost:3001/personal`);
        console.log("responseHAHAHAHAHHA", response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
  return functions;
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

export { helperAsistenteNova, helperAsistenteNovaRespuestas, dataStructure };
