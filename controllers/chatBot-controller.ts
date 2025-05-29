import { Request, Response } from 'express';
import { getChatResponse } from '../services/ModuloIA/chatBotService';

export const chatController = async (req: Request, res: Response) => {
  const { question, history } = req.body;

  try {
    console.log('Pregunta recibida:', question);
    console.log('Historial recibido:', history);
    const reply = await getChatResponse(question, history);
    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};
