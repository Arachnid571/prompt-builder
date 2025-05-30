const axios = require('axios');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

module.exports = async (req, res) => {
  const { userId, character, costume, pose, background } = req.body;

  if (!userId || !character || !costume || !pose || !background) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const prompt = `${character}, ${costume}, ${pose}, ${background}`;
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: userId,
        text: `/generate ${prompt}`,
      }
    );

    if (response.data.ok) {
      res.json({ message: 'Generation request sent, check Telegram for result' });
    } else {
      throw new Error('Failed to send command to bot');
    }
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to start generation' });
  }
};