const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const idManager = new (require('./IdManager'))();
require('dotenv').config();
const app = express();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Example code
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  const wasAdded = idManager.addNewChat(msg.chat);
  console.log(`Chat: ${msg.chat.id}${wasAdded ? ' - added' : ''}`)

  if (wasAdded) {
    bot.sendMessage(chatId, '*Pronto Tudo Certo*\n\nVocê já foi registrado', { parse_mode: "Markdown"});
  }
});

app.post('/send/:messageText', (req, res) => {
  const { messageText } = req.params; 

  const chats = idManager.getAllChats();

  chats.forEach(chat=> {
    bot.sendMessage(chat.id, messageText);
  });

  return res.json({ message: messageText });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`app listen in port: ${port}`)
});