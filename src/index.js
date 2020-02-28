const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const idManager = new (require('./IdManager'))();
const app = express();

const token = '1006619247:AAEmj2c9Bw58qBlQbpB-MHvlaiA7vQdTkHw';

const bot = new TelegramBot(token, { polling: true });

// Example code
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  idManager.addNewChat(msg.chat);
  console.log(`Added chat: ${msg.chat.id}`)

  bot.sendMessage(chatId, '*Pronto Tudo Certo*\n\nVocê já foi registrado', { parse_mode: "Markdown"});
});

app.post('/send/:messageText', (req, res) => {
  const { messageText } = req.params; 

  const chats = idManager.getAllChats();

  chats.forEach(chat=> {
    bot.sendMessage(chat.id, messageText);
  });

  return res.json({ message: messageText });
});

app.listen(3333, () => { console.log('app listen in port 3333') });