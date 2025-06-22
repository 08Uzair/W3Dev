import { user } from "../models/user.js";

export const handleWebhook = async (req, res) => {
  try {
    const { event, user_id, email, name } = req.body;

    if (!event || !user_id || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEvent = new user({ event, user_id, email, name });
    await newEvent.save();

    res.status(200).json({ message: '✅ Webhook received and stored.' });
  } catch (error) {
    console.error('❌ Error handling webhook:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

