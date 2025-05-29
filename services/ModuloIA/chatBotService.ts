import axios from 'axios';

const CHAT_API_URL = 'http://127.0.0.1:8000/chat';  // URL de tu microservicio

export const getChatResponse = async (question: string, history: any[]) => {
  try {
    console.log('Pregunta enviada al microservicio:', question);

    // Recorta historial a los últimos 4 mensajes (opcional pero recomendado)
    const lastMessages = history.slice(-4);

    const formattedRequest = {
      inputs: [
        ...lastMessages,
        { role: "user", content: question }  // Añades la pregunta actual
      ]
    };

    const response = await axios.post(CHAT_API_URL, formattedRequest);

    console.log('Respuesta del microservicio:', response.data);
    return response.data.reply;
  } catch (error) {
    console.error('Error al comunicarse con el microservicio:', error);
    throw new Error('Error al procesar la respuesta del microservicio');
  }
};

