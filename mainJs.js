'use strict';
//globalScopeCheck('Chat', Chat);
//globalScopeCheck('ChatMessage', ChatMessage);
//globalScopeCheck('User', User);

User.users = [];
Chat.chats = [];

function Chat(chatName) {
    if (!chatName) {
        throw new Error('Enter chat name')
    }
    this.chatName = chatName;
    this.users = [];
    this.messageHistory = [];
    this.chats = [];
    this.unreadMessage = [];
    Chat.chats.push(this);
}

Chat.prototype = {
    formattedData: function () {
        this.date = new Date();
        let localTime = this.date.toLocaleTimeString();
        let milliseconds = this.date.getMilliseconds();
        return localTime + ':' + milliseconds
    },
    addUser: function () {
        for (let i = 0; i < arguments.length; i++) {
            let user = arguments[i];
            this.users.push(user);
        }
    },
    removeUser: function () {
        for (let i = 0; i < arguments.length; i++) {
            let user = arguments[i];
            for (let j = 0; j < this.users.length; j++) {
                if (this.users[j] === user) {
                    this.users.splice(j, 1)
                }
            }
        }
    },
    sendMessage: function (user, message) {
        if (this.checkConnecting(user)) {
            message = new ChatMessage(user, message);
            this.messageHistory.push(message);
            return message
        }
    },
    checkConnecting: function (user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i] === user) {
                return 'online'
            }
        }
        return 'offline'
    },
    showMessageHistory: function (index, amount) {
        if (arguments.length === 2) {
            index = arguments[0];
            amount = arguments[1] + 2;
        } else if (arguments.length === 1) {
            index = 0;
            amount = arguments[0];
        } else {
            index = 0;
            amount = 10;
        }
        for (let i = index; i < amount; i++) {
            let history = this.messageHistory[i];
            if (this.messageHistory > history) {
                console.log(`[${history.user.userName}] {${this.checkConnecting(history.user)}} [${this.formattedData()}] :${history.messageText}`)
            }
        }
        return this.messageHistory
    },
    unReadMessage: function (user, amount) {
        for (let i = 0; i < this.messageHistory.length; i++){
            this.unreadMessage = this.messageHistory[i];
            if (this.unreadMessage.user === user) {
                let unread = this.unreadMessage;
                //console.error(unread);
            }
        }
    }
};

function ChatMessage(user, messageText) {
    if (!user || !messageText) {
        throw new Error('user or message missing')
    }
    this.user = user;
    this.messageText = messageText;
    //this.userRead = [];
}

//ChatMessage.prototype = {};

function User(userName) {
    if (!userName) {
        throw new Error('Enter your name')
    }
    this.userName = userName;
    User.users.push(this);
}

User.prototype = {
    joinDefaultChat: function () {
        Chat.chats[0].addUser(this)
    },
    leftDefaultChat: function () {
        Chat.chats[0].removeUser(this)
    },
    joinChat: function (chat) {
        if (!chat) {
            this.joinDefaultChat()
        } else {
            chat.addUser(this)
        }
    },
    leaveChat: function (chat) {
        if (!chat) {
            this.leftDefaultChat()
        } else {
            chat.removeUser(this)
        }
    },
    sendNewMessage: function (chat, message) {
        if (arguments.length === 1) {
            message = arguments[0];
            message = new ChatMessage(this, message);
            defaultChat.messageHistory.push(message);
        } else {
            chat.sendMessage(this, message)
        }
    },
    //readUnreadMessage: function (chat, amount) {}
};

function globalScopeCheck(propName, value) {
    if (window.hasOwnProperty(propName)) {
        throw new Error(propName + ' constructor already exist')
    }
    Object.defineProperty(window, propName, {
        value: value,
        writable: false
    })
}

let defaultChat = new Chat('default');
let chat1 = new Chat('chat1');
let chat2 = new Chat('chat2');
let chat3 = new Chat('chat3');

let user1 = new User('Kosta');
let user2 = new User('Andrew');
let user3 = new User('Olly');
let user4 = new User('Bogdan');

chat1.addUser(user1, user2, user3, user4);
chat1.sendMessage(user1, 'hello1');
chat1.sendMessage(user2, 'hi2');
chat1.sendMessage(user3, 'hello3');
chat1.sendMessage(user4, 'hi4');
chat1.sendMessage(user1, 'hello5');
chat1.sendMessage(user2, 'hi6');
chat1.sendMessage(user3, 'hello7');
chat1.sendMessage(user4, 'hi8');
chat1.sendMessage(user1, 'hello9');
chat1.sendMessage(user2, 'hi10');
user1.leaveChat(chat1);
chat1.sendMessage(user3, 'hello11');
chat1.sendMessage(user4, 'hi12');
chat1.showMessageHistory(4);

chat1.unReadMessage(user1);





