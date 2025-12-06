import * as signalR from "@microsoft/signalr";

const API_BASE_URL = import.meta.env.VITE_API_HUB_URL || "https://connect-api-depi-r3-2025.runasp.net";
// const API_BASE_URL = "http://localhost:5034";

class ChatService {
  constructor() {
    this.connection = null;
    this.listeners = new Map();
  }

  async connect(token) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/chatHub`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // Set up event listeners
    this.setupListeners();

    try {
      await this.connection.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.error("SignalR Connection Error:", err);
      throw err;
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.stop();
      console.log("SignalR Disconnected");
    }
  }

  setupListeners() {
    // Message Events
    this.connection.on("ReceiveMessage", (message) => {
      this.notify("ReceiveMessage", message);
    });

    this.connection.on("MessageDeleted", (messageId) => {
      this.notify("MessageDeleted", messageId);
    });

    this.connection.on("MessageRead", (messageId, userId) => {
      this.notify("MessageRead", { messageId, userId });
    });

    // Typing Events
    this.connection.on("UserTyping", (user) => {
      this.notify("UserTyping", user);
    });

    this.connection.on("UserStoppedTyping", (userId) => {
      this.notify("UserStoppedTyping", userId);
    });

    // Chat Events
    this.connection.on("NewChat", (chat) => {
      this.notify("NewChat", chat);
    });

    this.connection.on("MemberAdded", (member) => {
      this.notify("MemberAdded", member);
    });

    this.connection.on("MemberRemoved", (userId) => {
      this.notify("MemberRemoved", userId);
    });

    // Connection Events
    this.connection.onreconnecting(() => {
      console.log("SignalR Reconnecting...");
      this.notify("Reconnecting");
    });

    this.connection.onreconnected(() => {
      console.log("SignalR Reconnected");
      this.notify("Reconnected");
    });

    this.connection.onclose(() => {
      console.log("SignalR Connection Closed");
      this.notify("Disconnected");
    });
  }

  // Subscribe to events
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  notify(event, data) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  // Hub Methods
  async joinChat(chatId) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("JoinChat", chatId);
    }
  }

  async leaveChat(chatId) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("LeaveChat", chatId);
    }
  }

  async sendMessage(chatId, content) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("SendMessage", chatId, content);
    }
  }

  async startTyping(chatId) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("StartTyping", chatId);
    }
  }

  async stopTyping(chatId) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("StopTyping", chatId);
    }
  }

  async markAsRead(chatId, messageId) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("MarkAsRead", chatId, messageId);
    }
  }

  isConnected() {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

// Singleton instance
const chatService = new ChatService();
export default chatService;
