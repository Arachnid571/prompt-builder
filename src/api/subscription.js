const axios = require('axios');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

module.exports = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    // Отправляем команду /check_subscription
    const sendResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: userId,
        text: `/check_subscription ${userId}`,
      }
    );

    if (!sendResponse.data.ok) {
      throw new Error('Failed to send command to bot');
    }

    // Polling для получения ответа бота
    const startTime = Date.now();
    const timeout = 10000; // 10 секунд
    let subscriptionStatus = null;

    while (Date.now() - startTime < timeout) {
      const updates = await axios.get(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`,
        {
          params: {
            offset: -1, // Получаем последнее сообщение
            timeout: 5,
          },
        }
      );

      if (updates.data.ok && updates.data.result.length > 0) {
        const lastUpdate = updates.data.result[0];
        if (
          lastUpdate.message &&
          lastUpdate.message.chat.id == userId &&
          lastUpdate.message.text
        ) {
          try {
            const responseText = lastUpdate.message.text;
            subscriptionStatus = JSON.parse(responseText);
            if (subscriptionStatus.user_id == userId) {
              break; // Нашли нужный ответ
            }
          } catch (e) {
            // Не JSON, продолжаем
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Ждём 1 секунду
    }

    if (subscriptionStatus && subscriptionStatus.is_subscribed !== undefined) {
      res.json({ isSubscribed: subscriptionStatus.is_subscribed });
    } else {
      throw new Error('Failed to retrieve subscription status');
    }
  } catch (error) {
    console.error('Subscription check error:', error);
    res.status(500).json({ error: 'Failed to check subscription' });
  }
};