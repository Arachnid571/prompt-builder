// src/utils/telegram.js
import WebApp from '@twa-dev/sdk';

export const initTelegramWebApp = () => {
  WebApp.ready(); // Инициализация Web App
  WebApp.expand(); // Развернуть на полный экран

  // Получить данные пользователя
  const user = WebApp.initDataUnsafe.user;
  return {
    user: user || null,
    sendData: (data) => WebApp.sendData(JSON.stringify(data)), // Отправка данных в бот
    close: () => WebApp.close(), // Закрыть Web App
  };
};