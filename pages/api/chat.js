export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ response: "Please type a message." });
      }

      let reply = "I'm here boss. ";

      const lower = message.toLowerCase();

      if (lower.includes("hello") || lower.includes("hi")) {
        reply = "Hello Boss 👋 I'm Aether. I remember our conversations. What would you like to do today?";
      } else if (lower.includes("who are you") || lower.includes("name")) {
        reply = "I am Aether — your personal cloud agent with memory. How can I help you?";
      } else if (lower.includes("remember") || lower.includes("memory")) {
        reply = "I remember our previous chats. Tell me what you want me to do.";
      } else {
        reply += `You said "${message}". Try asking me to research the scrap metal market, make a business plan, or analyze something.`;
      }

      return res.status(200).json({ response: reply });

    } catch (error) {
      return res.status(500).json({ response: "Sorry, something went wrong." });
    }
  }

  return res.status(405).json({ response: "Method not allowed" });
}
