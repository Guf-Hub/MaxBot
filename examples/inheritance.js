/**
 * Пример создания кастомного бота с помощью MaxBot.createBot()
 * Демонстрирует создание кастомного бота с расширенной функциональностью
 * без прямого наследования от Bot класса (что невозможно в Apps Script библиотеках)
 */

// Кастомный класс бота (без наследования от Bot)
class MyCustomBot {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.userStates = new Map(); // Хранение состояний пользователей
    this.userData = {}; // Хранение данных пользователей
    this.commands = new Map(); // Регистрация команд
    this.setupCommands();
  }

  // Настройка команд
  setupCommands() {
    this.commands.set("/start", this.handleStart.bind(this));
    this.commands.set("/help", this.handleHelp.bind(this));
    this.commands.set("/register", this.handleRegister.bind(this));
    this.commands.set("/profile", this.handleProfile.bind(this));
    this.commands.set("/stats", this.handleStats.bind(this));
    this.commands.set("/cancel", this.handleCancel.bind(this));
  }

  // Обработка входящих сообщений
  onMessage(message) {
    const chatId = message.recipient.data.chat_id;
    const text = message.body.text;
    const userId = message.sender.data.user_id;

    console.log(`Получено сообщение от ${userId}: ${text}`);

    // Получаем текущее состояние пользователя
    const userState = this.userStates.get(userId) || "main";

    // Проверяем команды
    if (text.startsWith("/")) {
      const command = this.commands.get(text);
      if (command) {
        command(chatId, userId, message);
        return;
      }
    }

    // Обрабатываем по состоянию
    switch (userState) {
      case "waiting_name":
        this.handleNameInput(chatId, text, userId);
        break;
      case "waiting_age":
        this.handleAgeInput(chatId, text, userId);
        break;
      case "waiting_email":
        this.handleEmailInput(chatId, text, userId);
        break;
      default:
        this.handleMainMenu(chatId, text, userId);
    }
  }

  // Обработка нажатий кнопок
  onCallback(callback) {
    const chatId = callback.chat_id;
    const payload = callback.payload;
    const userId = callback.sender.data.user_id;

    console.log(`Получен callback от ${userId}: ${payload}`);

    switch (payload) {
      case "register":
        this.handleRegister(chatId, userId);
        break;
      case "help":
        this.handleHelp(chatId, userId);
        break;
      case "profile":
        this.handleProfile(chatId, userId);
        break;
      case "stats":
        this.handleStats(chatId, userId);
        break;
      case "cancel":
        this.handleCancel(chatId, userId);
        break;
      default:
        this.sendMessage({
          text: `Неизвестная команда: ${payload}`,
          chatId: chatId,
        });
    }
  }

  // Обработка команды /start
  handleStart(chatId, userId) {
    this.userStates.set(userId, "main");
    this.sendWelcomeMessage(chatId);
  }

  // Обработка команды /help
  handleHelp(chatId, userId) {
    this.showHelp(chatId);
  }

  // Обработка команды /register
  handleRegister(chatId, userId) {
    this.startRegistration(chatId, userId);
  }

  // Обработка команды /profile
  handleProfile(chatId, userId) {
    this.showProfile(chatId, userId);
  }

  // Обработка команды /stats
  handleStats(chatId, userId) {
    const stats = this.getStats();
    this.sendMessage({
      text: `📊 Статистика бота:\n👥 Всего пользователей: ${stats.totalUsers}\n🔄 Активных состояний: ${stats.activeStates}`,
      chatId: chatId,
    });
  }

  // Обработка команды /cancel
  handleCancel(chatId, userId) {
    this.userStates.set(userId, "main");
    this.sendMessage({
      text: "❌ Операция отменена",
      chatId: chatId,
    });
    this.sendWelcomeMessage(chatId);
  }

  // Обработка главного меню
  handleMainMenu(chatId, text, userId) {
    this.sendMessage({
      text: `Вы написали: "${text}"\n\nИспользуйте /start для начала работы или кнопки ниже:`,
      chatId: chatId,
    });
    this.sendMainKeyboard(chatId);
  }

  // Начало регистрации
  startRegistration(chatId, userId) {
    this.userStates.set(userId, "waiting_name");

    const keyboard = this.keyboard.callback("❌ Отмена", "cancel").build();

    this.sendMessage({
      text: "📝 Регистрация\n\nВведите ваше имя:",
      chatId: chatId,
      keyboard: keyboard,
    });
  }

  // Обработка ввода имени
  handleNameInput(chatId, text, userId) {
    if (text === "❌ Отмена" || text === "/cancel") {
      this.handleCancel(chatId, userId);
      return;
    }

    if (text.length < 2) {
      this.sendMessage({
        text: "❌ Имя должно содержать минимум 2 символа. Попробуйте еще раз:",
        chatId: chatId,
      });
      return;
    }

    // Сохраняем имя и переходим к возрасту
    this.userData[userId] = { name: text };
    this.userStates.set(userId, "waiting_age");

    this.sendMessage({
      text: "📅 Введите ваш возраст (1-120):",
      chatId: chatId,
    });
  }

  // Обработка ввода возраста
  handleAgeInput(chatId, text, userId) {
    if (text === "❌ Отмена" || text === "/cancel") {
      this.handleCancel(chatId, userId);
      return;
    }

    const age = parseInt(text);

    if (isNaN(age) || age < 1 || age > 120) {
      this.sendMessage({
        text: "❌ Пожалуйста, введите корректный возраст (1-120):",
        chatId: chatId,
      });
      return;
    }

    // Сохраняем возраст и переходим к email
    this.userData[userId].age = age;
    this.userStates.set(userId, "waiting_email");

    this.sendMessage({
      text: "📧 Введите ваш email:",
      chatId: chatId,
    });
  }

  // Обработка ввода email
  handleEmailInput(chatId, text, userId) {
    if (text === "❌ Отмена" || text === "/cancel") {
      this.handleCancel(chatId, userId);
      return;
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      this.sendMessage({
        text: "❌ Пожалуйста, введите корректный email:",
        chatId: chatId,
      });
      return;
    }

    // Завершаем регистрацию
    this.userData[userId].email = text;
    this.userStates.set(userId, "main");

    this.sendMessage({
      text: `✅ Регистрация завершена!\n\n📋 Ваши данные:\n👤 Имя: ${this.userData[userId].name}\n🎂 Возраст: ${this.userData[userId].age}\n📧 Email: ${this.userData[userId].email}`,
      chatId: chatId,
    });

    this.sendMainKeyboard(chatId);
  }

  // Показать профиль
  showProfile(chatId, userId) {
    const userData = this.userData[userId];

    if (!userData) {
      this.sendMessage({
        text: "❌ Профиль не найден.\n\nПройдите регистрацию:",
        chatId: chatId,
      });
      this.sendMainKeyboard(chatId);
      return;
    }

    this.sendMessage({
      text: `📋 Ваш профиль:\n\n👤 Имя: ${userData.name}\n🎂 Возраст: ${
        userData.age
      }\n📧 Email: ${userData.email || "Не указан"}`,
      chatId: chatId,
    });
  }

  // Показать справку
  showHelp(chatId) {
    const helpText = `
🤖 Доступные команды:

/start - Начать работу с ботом
/register - Регистрация
/profile - Показать профиль
/stats - Статистика бота
/help - Показать эту справку
/cancel - Отменить текущую операцию

💡 Используйте кнопки для быстрой навигации
    `;

    this.sendMessage({
      text: helpText,
      chatId: chatId,
    });

    this.sendMainKeyboard(chatId);
  }

  // Приветственное сообщение
  sendWelcomeMessage(chatId) {
    const welcomeText = `
🎉 Добро пожаловать в MaxBot!

Этот бот демонстрирует возможности наследования и создания сложной логики.

Выберите действие:
    `;

    this.sendMessage({
      text: welcomeText,
      chatId: chatId,
    });

    this.sendMainKeyboard(chatId);
  }

  // Отправка главной клавиатуры
  sendMainKeyboard(chatId) {
    const keyboard = this.keyboard
      .callback("📝 Регистрация", "register")
      .callback("👤 Профиль", "profile")
      .callback("📊 Статистика", "stats")
      .callback("❓ Помощь", "help")
      .build();

    this.sendMessage({
      text: "Выберите действие:",
      chatId: chatId,
      keyboard: keyboard,
    });
  }

  // Кастомный метод для статистики
  getStats() {
    return {
      totalUsers: Object.keys(this.userData).length,
      activeStates: this.userStates.size,
      registeredUsers: Object.keys(this.userData).filter(
        (id) => this.userData[id].email
      ).length,
    };
  }

  // Кастомный метод для очистки данных
  clearUserData(userId) {
    delete this.userData[userId];
    this.userStates.delete(userId);
  }

  // Кастомный метод для получения данных пользователя
  getUserData(userId) {
    return this.userData[userId] || null;
  }
}

// Создание экземпляра кастомного бота
const bot = MaxBot.createBot("YOUR_ACCESS_TOKEN", MyCustomBot);

// Пример использования кастомных методов
function testCustomMethods() {
  const stats = bot.getStats();
  console.log("Статистика бота:", stats);

  // Получение данных пользователя
  const userData = bot.getUserData("some_user_id");
  console.log("Данные пользователя:", userData);
}

// Функция doPost для обработки вебхуков
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    bot.handleWebhook(data);
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Webhook processed",
      })
    );
  } catch (error) {
    console.error("Ошибка обработки вебхука:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: "Webhook processing failed",
        error: error.message,
      })
    );
  }
}

// Пример установки вебхука
function setupWebhook() {
  const webhookUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
  bot.setWebhook(webhookUrl);

  const webhooks = bot.getWebhooks();
  console.log("Установленные вебхуки:", webhooks);
}
