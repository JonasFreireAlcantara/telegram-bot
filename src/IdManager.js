
class IdManager {
  constructor() {
    this.chats = [];
  }

  addNewChat(chatToBeAdded) {
    this.removeChat(chatToBeAdded);
    this.chats.push(chatToBeAdded);
  }

  removeChat(chatToBeRemoved) {
    this.chats = this.chats.filter( chat => chat.id !== chatToBeRemoved.id);
  }

  getAllChats() {
    return this.chats;
  }
}

module.exports = IdManager;
