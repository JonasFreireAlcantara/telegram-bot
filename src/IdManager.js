
class IdManager {
  constructor() {
    this.chats = [];
  }

  addNewChat(chatToBeAdded) {
    if (!this.thereExistsSuchChat(chatToBeAdded)) {
      this.chats.push(chatToBeAdded);
      return true;
    }

    return false;
  }

  thereExistsSuchChat(chatSeeked) {
    return (this.chats.filter( chat => chat.id === chatSeeked.id)).length !== 0;
  }

  removeChat(chatToBeRemoved) {
    this.chats = this.chats.filter( chat => chat.id !== chatToBeRemoved.id);
  }

  getAllChats() {
    return this.chats;
  }
}

module.exports = IdManager;
