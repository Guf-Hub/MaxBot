/**
 * Пример использования MaxBot в Google Apps Script
 * Демонстрирует работу с вебхуками и обработку различных типов сообщений
 */

// Глобальные переменные для Apps Script
const BOT_TOKEN = "YOUR_ACCESS_TOKEN_HERE";
const WEBHOOK_SECRET = "your-webhook-secret";

// Создание экземпляра бота
// const bot = MaxBot.init("YOUR_ACCESS_TOKEN");
const bot = new Bot("YOUR_ACCESS_TOKEN");

// Настройка обработчиков событий
class MyBot extends Bot {
  constructor(accessToken, webhookUrl) {
    super(accessToken, webhookUrl);
  }

  /**
   * Обработчик входящих сообщений
   */
  onMessage(message) {
    console.log("Получено сообщение:", message);

    const chatId = message.chat_id;
    const text = message.text;
    const userId = message.user_id;

    // Простой эхо-бот
    if (text) {
      if (text.toLowerCase() === "/start") {
        this.sendWelcomeMessage(chatId);
      } else if (text.toLowerCase() === "/help") {
        this.sendHelpMessage(chatId);
      } else if (text.toLowerCase() === "/keyboard") {
        // Создание клавиатуры с помощью билдера
        const keyboard = this.keyboard
          .callback("Кнопка 1", "button1")
          .callback("Кнопка 2", "button2")
          .row()
          .link("Открыть сайт", "https://dev.max.ru")
          .contact("Поделиться контактом")
          .build();

        this.sendMessage({
          text: "Выберите действие:",
          chatId: chatId,
          keyboard,
        });
      } else {
        // Эхо-ответ
        this.sendMessage({ text: `Вы написали: ${text}`, chatId: chatId });
      }
    }
  }

  /**
   * Обработчик callback кнопок
   */
  onCallback(callback) {
    console.log("Получен callback:", callback);

    const chatId = callback.chat_id;
    const payload = callback.payload;
    const callbackId = callback.callback_id;

    // Обработка различных callback'ов
    switch (payload) {
      case "button1":
        this.answerCallback(callbackId, {
          text: "Вы нажали кнопку 1!",
          notification: true,
        });
        this.sendMessage({
          text: "Обработка кнопки 1 завершена",
          chatId: chatId,
        });
        break;
      case "button2":
        this.answerCallback(callbackId, {
          text: "Вы нажали кнопку 2!",
          notification: true,
        });
        this.sendMessage({
          text: "Обработка кнопки 2 завершена",
          chatId: chatId,
        });
        break;
      default:
        this.answerCallback(callbackId, {
          text: "Неизвестная кнопка",
          notification: true,
        });
    }
  }

  /**
   * Обработчик изменений участников чата
   */
  onChatMember(chatMember) {
    console.log("Изменение участника чата:", chatMember);

    const chatId = chatMember.chat_id;
    const userId = chatMember.user_id;
    const action = chatMember.action; // 'join' или 'leave'

    if (action === "join") {
      this.sendMessage({
        text: `Добро пожаловать в чат, пользователь ${userId}!`,
        chatId: chatId,
      });
    } else if (action === "leave") {
      this.sendMessage({
        text: `Пользователь ${userId} покинул чат.`,
        chatId: chatId,
      });
    }
  }

  /**
   * Обработчик действий в чате
   */
  onChatAction(chatAction) {
    console.log("Действие в чате:", chatAction);

    const chatId = chatAction.chat_id;
    const action = chatAction.action;
    const userId = chatAction.user_id;

    // Можно отслеживать действия пользователей (печатает, отправляет фото и т.д.)
    console.log(`Пользователь ${userId} выполняет действие: ${action}`);
  }

  /**
   * Отправка приветственного сообщения
   */
  sendWelcomeMessage(chatId) {
    const welcomeText = `🎉 Добро пожаловать!

Я бот для MAX. Вот что я умею:

📝 /help - показать справку
⌨️ /keyboard - показать клавиатуру с кнопками
💬 Просто напишите мне что-нибудь для эхо-ответа

Используйте команды или просто отправьте сообщение!`;

    this.sendMessage({
      text: welcomeText,
      chatId: chatId,
      format: "markdown",
    });
  }

  /**
   * Отправка справки
   */
  sendHelpMessage(chatId) {
    const helpText = `📚 **Справка по командам:**

/start - приветственное сообщение
/help - эта справка
/keyboard - показать интерактивную клавиатуру

**Возможности бота:**
• Эхо-ответ на сообщения
• Обработка callback кнопок
• Отслеживание участников чата
• Поддержка Markdown форматирования

**Примеры кнопок:**
• Callback кнопки
• Ссылки
• Запрос контакта
• Запрос геолокации`;

    this.sendMessage({
      text: helpText,
      chatId: chatId,
      format: "markdown",
    });
  }
}

// Создание экземпляра нашего бота
const myBot = new MyBot(BOT_TOKEN);

/**
 * Функция для обработки вебхуков в Apps Script
 * Эта функция будет вызываться автоматически при получении вебхука
 */
function doPost(e) {
  try {
    // Получаем данные из запроса
    const postData = e.postData.contents;
    const update = JSON.parse(postData);

    console.log("Получен вебхук:", update);

    // Проверяем секрет вебхука (если настроен)
    if (WEBHOOK_SECRET) {
      // Проверяем секрет в URL параметрах
      const urlSecret = e.parameter.secret;
      // Проверяем секрет в заголовках (если MAX API отправляет его так)
      let bodySecret = null;

      try {
        const body = JSON.parse(postData);
        bodySecret = body.secret || body.webhook_secret;
      } catch (parseError) {
        // Игнорируем ошибку парсинга
      }

      const receivedSecret = urlSecret || bodySecret;

      if (receivedSecret !== WEBHOOK_SECRET) {
        console.error("Неверный секрет вебхука");
        console.error("Ожидаемый:", WEBHOOK_SECRET);
        console.error("Полученный:", receivedSecret);
        return ContentService.createTextOutput("Unauthorized").setMimeType(
          ContentService.MimeType.TEXT
        );
      }
    }

    // Обрабатываем обновление
    myBot.handleUpdate(update);

    // Отправляем успешный ответ
    return ContentService.createTextOutput("OK").setMimeType(
      ContentService.MimeType.TEXT
    );
  } catch (error) {
    console.error("Ошибка при обработке вебхука:", error);
    return ContentService.createTextOutput("Error").setMimeType(
      ContentService.MimeType.TEXT
    );
  }
}

/**
 * Функция для получения информации о боте
 */
function getBotInfo() {
  try {
    const botInfo = myBot.getMe();
    console.log("Информация о боте:", botInfo);
    return botInfo;
  } catch (error) {
    console.error("Ошибка получения информации о боте:", error);
    return null;
  }
}

/**
 * Функция для отправки тестового сообщения
 */
function sendTestMessage(chatId) {
  try {
    const result = myBot.sendMessage({
      text: "Тестовое сообщение от Apps Script!",
      chatId: chatId,
    });
    console.log("Сообщение отправлено:", result);
    return result;
  } catch (error) {
    console.error("Ошибка отправки сообщения:", error);
    return null;
  }
}

/**
 * Функция для настройки вебхука
 */
function setWebhook() {
  try {
    // Получаем URL веб-приложения
    let webAppUrl = ScriptApp.getService().getUrl();
    console.log("URL веб-приложения:", webAppUrl);
    // Подписываемся на вебхуки
    const result = myBot.setWebhook({ url: webAppUrl, secret: WEBHOOK_SECRET });
    console.log("Вебхук настроен:", result);
    return result;
  } catch (error) {
    console.error("Ошибка настройки вебхука:", error);
    return null;
  }
}

/**
 * Функция для отписки от вебхуков
 */
function removeWebhook() {
  try {
    const result = myBot.removeWebhook();
    console.log("Вебхук удален:", result);
    return result;
  } catch (error) {
    console.error("Ошибка удаления вебхука:", error);
    return null;
  }
}

/**
 * Функция для получения обновлений (Long Polling)
 */
function getUpdates() {
  try {
    const updates = myBot.getUpdates(30, 100, 0);
    console.log("Получены обновления:", updates);

    // Обрабатываем каждое обновление
    if (updates && updates.length > 0) {
      updates.forEach((update) => {
        myBot.handleUpdate(update);
      });
    }

    return updates;
  } catch (error) {
    console.error("Ошибка получения обновлений:", error);
    return null;
  }
}

/**
 * Функция для создания триггера для периодического получения обновлений
 */
function createUpdateTrigger() {
  // Удаляем существующие триггеры
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((trigger) => {
    if (trigger.getHandlerFunction() === "getUpdates") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Создаем новый триггер (каждые 30 секунд)
  ScriptApp.newTrigger("getUpdates").timeBased().everySeconds(30).create();

  console.log("Триггер для получения обновлений создан");
}

/**
 * Функция для удаления триггера обновлений
 */
function removeUpdateTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((trigger) => {
    if (trigger.getHandlerFunction() === "getUpdates") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  console.log("Триггер для получения обновлений удален");
}

/**
 * Функция для тестирования клавиатуры
 */
function testKeyboard(chatId) {
  try {
    // Создание клавиатуры с помощью билдера
    const keyboard = myBot.keyboard
      .callback("Тест 1", "test1")
      .callback("Тест 2", "test2")
      .row()
      .link("Документация", "https://dev.max.ru/docs-api")
      .contact("Поделиться контактом")
      .build();

    const result = myBot.sendMessage({
      text: "Тестовая клавиатура:",
      chatId: chatId,
      keyboard,
    });
    console.log("Клавиатура отправлена:", result);
    return result;
  } catch (error) {
    console.error("Ошибка отправки клавиатуры:", error);
    return null;
  }
}

/**
 * Функция для инициализации бота
 */
function initializeBot() {
  try {
    // Получаем информацию о боте
    const botInfo = getBotInfo();
    if (!botInfo) {
      console.error("Не удалось получить информацию о боте");
      return false;
    }

    console.log("Бот инициализирован:", botInfo.name || botInfo.username);

    // Настраиваем вебхук
    setupWebhook();

    // Создаем триггер для получения обновлений (если вебхук недоступен)
    createUpdateTrigger();

    return true;
  } catch (error) {
    console.error("Ошибка инициализации бота:", error);
    return false;
  }
}
