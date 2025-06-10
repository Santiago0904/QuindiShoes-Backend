import axios from 'axios';

const PRODUCT_IA_URL = 'https://iaquindishoes.onrender.com/process-products'; // Endpoint de la IA para productos

export const sendProductsToIA = async (products: any[]) => {
  try {
    console.log('Enviando productos al microservicio de IA');

    const payload = {
      products // se asume que el servicio espera un objeto con la propiedad "products"
    };

    const response = await axios.post(PRODUCT_IA_URL, payload);

    console.log('Respuesta del microservicio:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar productos al microservicio:', error);
    throw new Error('Error al procesar la respuesta del microservicio de productos');
  }
};