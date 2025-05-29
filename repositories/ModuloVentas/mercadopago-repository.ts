import { Payment } from 'mercadopago';
import { mpClient } from '../../src/utils';

const paymentInstance = new Payment(mpClient);

export const PaymentRepository = {
  create: async (paymentData: any) => {
    try {
      const result = await paymentInstance.create({ body: paymentData });
      return result;
    } catch (error) {
      throw error;
    }
  }
};
