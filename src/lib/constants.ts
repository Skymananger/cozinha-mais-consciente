export const CONTACT_INFO = {
  WHATSAPP_NUMBER: "5544991089020",
  WHATSAPP_MESSAGE: "Olá! Vi o portal Cozinha Mais Consciente e gostaria de saber mais informações.",
  EMAIL: "contato@cozinhamaisconsciente.com.br",
};

export const WHATSAPP_URL = `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_INFO.WHATSAPP_MESSAGE)}`;
