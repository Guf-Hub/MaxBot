/**
 * MaxBot - Библиотека для работы с API MAX бота в Google Apps Script
 * Документация: https://dev.max.ru/docs-api
 */
class Bot {
  constructor(accessToken, webhookUrl = null) {
    this.accessToken = accessToken;
    this.baseUrl = "https://botapi.max.ru";
    this.webhookUrl = webhookUrl;
  }

  /**
   * Формирует URL с токеном доступа
   */
  _buildUrl(endpoint) {
    if (endpoint.includes("?")) {
      return `${this.baseUrl}${endpoint}&access_token=${this.accessToken}`;
    }
    return `${this.baseUrl}${endpoint}?access_token=${this.accessToken}`;
  }

  /**
   * Выполняет HTTP запрос
   */
  _makeRequest(
    endpoint,
    method = "GET",
    body = null,
    contentType = "application/json"
  ) {
    const url = this._buildUrl(endpoint);
    const options = {
      method: method,
      headers: {
        "Content-Type": contentType,
      },
      muteHttpExceptions: true,
    };

    if (body) {
      options.payload = JSON.stringify(body);
    }

    try {
      const response = UrlFetchApp.fetch(url, options);
      const code = response.getResponseCode();
      const text = response.getContentText();

      // Проверяем HTTP статус код
      if (code !== 200) {
        // Создаем специальную ошибку MAX API
        const error = createError(code, text);
        console.error(`Endpoint: ${endpoint}`, error);
        throw error;
      }

      return JSON.parse(text);
    } catch (error) {
      // Если это уже MaxError, просто пробрасываем
      if (error instanceof MaxError) {
        throw error;
      }

      // Для других ошибок (сеть, парсинг JSON и т.д.)
      console.error(`Endpoint: ${endpoint}`, error.stack);
      throw error;
    }
  }

  // ===== МЕТОДЫ ДЛЯ РАБОТЫ С БОТОМ =====

  /**
   * Получение информации о текущем боте
   * @returns {BotInfo} - Информация о боте
   */
  getMe() {
    return this._makeRequest("/me");
  }

  /**
   * Изменение информации о текущем боте
   * @param {Object} updates - Обновления информации о боте
   * @returns {BotInfo} - Результат обновления
   */
  updateMe(updates) {
    return this._makeRequest("/me", "PATCH", updates);
  }

  // ===== МЕТОДЫ ДЛЯ РАБОТЫ С КОМАНДАМИ БОТА =====

  /**
   * Получение команд бота через getMe
   * @returns {Array<BotCommand>} - Список команд
   */
  getMyCommands() {
    return this.getMe()?.commands || [];
  }

  /**
   * Установка команд бота через updateMe
   * @param {Array<BotCommand>} commands - Массив команд
   * @param {string} commands[].name - Название команды (например, "start")
   * @param {string} commands[].description - Описание команды
   * @returns {BotInfo} - Результат обновления
   */
  setMyCommands(commands) {
    return this.updateMe({ commands });
  }

  /**
   * Удаление всех команд бота через updateMe
   * @returns {BotInfo} - Результат обновления
   */
  deleteMyCommands() {
    return this.updateMe({ commands: [] });
  }

  // ===== МЕТОДЫ ДЛЯ РАБОТЫ С ЧАТАМИ =====

  /**
   * Получение списка всех чатов
   * @param {number} [count] - Количество запрашиваемых чатов (1-100, по умолчанию 50)
   * @param {number} [marker] - Указатель на следующую страницу данных
   * @returns {ChatList} - Список чатов с пагинацией
   */
  getChats(count = 50, marker = null) {
    const params = createURLParams();
    if (count) params.append("count", count);
    if (marker) params.append("marker", marker);
    return this._makeRequest(`/chats?${params.toString()}`);
  }

  /**
   * Получение чата по ссылке
   * @param {string} chatLink - Публичная ссылка на чат или username пользователя
   * @returns {Chat} - Информация о чате
   */
  getChatByLink(chatLink) {
    return this._makeRequest(`/chats/${encodeURIComponent(chatLink)}`);
  }

  /**
   * Получение информации о чате
   */
  getChat(chatId) {
    return this._makeRequest(`/chats/${chatId}`);
  }

  /**
   * Изменение информации о чате
   */
  updateChat(chatId, updates) {
    return this._makeRequest(`/chats/${chatId}`, "PATCH", updates);
  }

  /**
   * Удалить чат
   */
  deleteChat(chatId) {
    return this._makeRequest(`/chats/${chatId}`, "DELETE");
  }

  /**
   * Отправка действия в чат
   * @param {number} chatId - ID чата
   * @param {SenderAction} action - Действие для отправки
   * @returns {SimpleQueryResult} - Результат операции
   */
  sendChatAction(chatId, action) {
    return this._makeRequest(`/chats/${chatId}/actions`, "POST", { action });
  }

  /**
   * Получение закрепленного сообщения
   * @param {number} chatId - ID чата
   * @returns {GetPinnedMessageResult} - Закрепленное сообщение
   */
  getPinnedMessage(chatId) {
    return this._makeRequest(`/chats/${chatId}/pin`);
  }

  /**
   * Закрепление сообщения
   * @param {number} chatId - ID чата
   * @param {string} messageId - ID сообщения для закрепления
   * @param {boolean} [notify] - Если true, участники получат уведомление
   * @returns {SimpleQueryResult} - Результат операции
   */
  pinMessage(chatId, messageId, notify = true) {
    return this._makeRequest(`/chats/${chatId}/pin`, "PUT", {
      message_id: messageId,
      notify: notify,
    });
  }

  /**
   * Удаление закрепленного сообщения
   * @param {number} chatId - ID чата
   * @returns {SimpleQueryResult} - Результат операции
   */
  unpinMessage(chatId) {
    return this._makeRequest(`/chats/${chatId}/pin`, "DELETE");
  }

  /**
   * Получение информации о членстве бота в чате
   * @param {number} chatId - ID чата
   * @returns {ChatMember} - Информация о членстве бота
   */
  getMyChatMember(chatId) {
    return this._makeRequest(`/chats/${chatId}/members/me`);
  }

  /**
   * Удаление бота из чата
   * @param {number} chatId - ID чата
   * @returns {SimpleQueryResult} - Результат операции
   */
  leaveChat(chatId) {
    return this._makeRequest(`/chats/${chatId}/members/me`, "DELETE");
  }

  /**
   * Получение списка администраторов чата
   * @param {number} chatId - ID чата
   * @returns {ChatAdminsList} - Список администраторов
   */
  getChatAdmins(chatId) {
    return this._makeRequest(`/chats/${chatId}/members/admins`);
  }

  /**
   * Назначить администратора чата
   * @param {number} chatId - ID чата
   * @param {Array<ChatAdmin>} admins - Массив администраторов
   * @returns {SimpleQueryResult} - Результат операции
   */
  setChatAdmins(chatId, admins) {
    return this._makeRequest(`/chats/${chatId}/members/admins`, "POST", {
      admins: admins,
    });
  }

  /**
   * Отменить права администратора
   * @param {number} chatId - ID чата
   * @param {number} userId - ID пользователя
   * @returns {SimpleQueryResult} - Результат операции
   */
  deleteChatAdmin(chatId, userId) {
    return this._makeRequest(
      `/chats/${chatId}/members/admins/${userId}`,
      "DELETE"
    );
  }

  /**
   * Получение участников чата
   * @param {number} chatId - ID чата
   * @param {Array<number>} [userIds] - Список ID пользователей
   * @param {number} [marker] - Указатель на следующую страницу данных
   * @param {number} [count] - Количество участников (1-100, по умолчанию 20)
   * @returns {ChatMembersList} - Список участников
   */
  getChatMembers(chatId, userIds = null, marker = null, count = 20) {
    const params = createURLParams();
    if (userIds && userIds.length > 0)
      params.append("user_ids", userIds.join(","));
    if (marker) params.append("marker", marker);
    if (count) params.append("count", count);
    return this._makeRequest(`/chats/${chatId}/members?${params.toString()}`);
  }

  /**
   * Добавление участников в чат
   * @param {number} chatId - ID чата
   * @param {Array<number>} userIds - Массив ID пользователей
   * @returns {SimpleQueryResult} - Результат операции
   */
  addChatMembers(chatId, userIds) {
    return this._makeRequest(`/chats/${chatId}/members`, "POST", {
      user_ids: userIds,
    });
  }

  /**
   * Удаление участника из чата
   * @param {number} chatId - ID чата
   * @param {number} userId - ID пользователя
   * @param {boolean} [block] - Если true, пользователь будет заблокирован
   * @returns {SimpleQueryResult} - Результат операции
   */
  removeChatMember(chatId, userId, block = false) {
    const params = createURLParams();
    params.append("user_id", userId);
    if (block) params.append("block", block);
    return this._makeRequest(
      `/chats/${chatId}/members?${params.toString()}`,
      "DELETE"
    );
  }

  // ===== МЕТОДЫ ДЛЯ РАБОТЫ С ПОДПИСКАМИ =====

  /**
   * Получение подписок по Webhook
   * @returns {GetSubscriptionsResult} - Список подписок
   */
  getWebhooks() {
    return this._makeRequest("/subscriptions");
  }

  /**
   * Подписка на обновления по Webhook
   * @param {string} url - URL для подписки
   * @param {Array<string>} [updateTypes] - Типы обновлений
   * @param {string} [secret] - Секрет для подписки
   * @param {string} [version] - Версия API
   * @returns {SimpleQueryResult} - Результат операции
   */
  setWebhook(url, updateTypes = null, secret = null, version = null) {
    this.webhookUrl = url;
    const body = { url };
    if (updateTypes) body.update_types = updateTypes;
    if (secret) body.secret = secret;
    if (version) body.version = version;

    return this._makeRequest("/subscriptions", "POST", body);
  }

  /**
   * Отписка от обновлений по Webhook
   * @param {string} url - URL для отписки
   * @returns {SimpleQueryResult} - Результат операции
   */
  removeWebhook(url) {
    const params = createURLParams();
    params.append("url", url || this.webhookUrl);
    return this._makeRequest(`/subscriptions?${params.toString()}`, "DELETE");
  }

  /**
   * Получение обновлений (Long Polling)
   * @param {number} [limit] - Лимит обновлений (1-1000, по умолчанию 100)
   * @param {number} [timeout] - Таймаут ожидания (0-90 секунд, по умолчанию 30)
   * @param {number} [marker] - Маркер для получения непрочитанных обновлений
   * @param {Array<string>} [types] - Типы обновлений для фильтрации
   * @returns {Array<Update>} - Массив обновлений
   */
  getUpdates(limit = 100, timeout = 30, marker = null, types = null) {
    const params = createURLParams();

    if (limit) params.append("limit", limit);
    if (timeout !== null) params.append("timeout", timeout);
    if (marker) params.append("marker", marker);
    if (types && types.length > 0) params.append("types", types.join(","));

    return this._makeRequest(`/updates?${params.toString()}`);
  }

  // ===== МЕТОДЫ ДЛЯ РАБОТЫ С ФАЙЛАМИ =====

  /**
   * Получение URL для загрузки файла
   * @param {string} type - Тип загружаемого файла (image, video, audio, file)
   * @returns {UploadEndpoint} - URL для загрузки файла
   */
  getUploadUrl(type) {
    const params = createURLParams();
    params.append("type", type);
    return this._makeRequest(`/uploads?${params.toString()}`, "POST");
  }

  // ===== МЕТОДЫ ДЛЯ РАБОТЫ С СООБЩЕНИЯМИ =====

  /**
   * Получение сообщений
   * @param {string} [chatId] - ID чата
   * @param {Array<string>} [messageIds] - Список ID сообщений
   * @param {number} [from] - Время начала (Unix timestamp)
   * @param {number} [to] - Время окончания (Unix timestamp)
   * @param {number} [count] - Количество сообщений (1-100, по умолчанию 50)
   */
  getMessages(
    chatId = null,
    messageIds = null,
    from = null,
    to = null,
    count = 50
  ) {
    const params = createURLParams();

    if (chatId) params.append("chat_id", chatId);
    if (messageIds && messageIds.length > 0)
      params.append("message_ids", messageIds.join(","));
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (count) params.append("count", count);

    return this._makeRequest(`/messages?${params.toString()}`);
  }

  /**
   * Отправить сообщение
   * @param {Object} options - Опции сообщения
   * @param {string} options.text - Текст сообщения
   * @param {string} [options.chatId] - ID чата для отправки
   * @param {string} [options.userId] - ID пользователя для отправки
   * @param {Array} [options.attachments] - Вложения к сообщению
   * @param {string} [options.format] - Формат текста (markdown, html)
   * @param {boolean} [options.disableLinkPreview=false] - Отключить превью ссылок
   * @returns {SendMessageResult} - Результат отправки сообщения
   */
  sendMessage(options) {
    const { chatId, userId, disableLinkPreview = false, ...rest } = options;

    const params = createURLParams();

    if (userId) params.append("user_id", userId);
    if (chatId) params.append("chat_id", chatId);
    if (disableLinkPreview) {
      params.append("disable_link_preview", disableLinkPreview);
    }

    return this._makeRequest(`/messages?${params.toString()}`, "POST", {
      ...rest,
    });
  }

  /**
   * Редактировать сообщение
   * @param {string} messageId - ID сообщения
   * @param {NewMessageBody} messageBody - Новое содержимое сообщения
   * @returns {SimpleQueryResult} - Результат операции
   */
  editMessage(messageId, messageBody) {
    const params = createURLParams();
    params.append("message_id", messageId);
    return this._makeRequest(
      `/messages?${params.toString()}`,
      "PUT",
      messageBody
    );
  }

  /**
   * Удалить сообщение
   * @param {string} messageId - ID сообщения
   * @returns {SimpleQueryResult} - Результат операции
   */
  deleteMessage(messageId) {
    const params = createURLParams();
    params.append("message_id", messageId);
    return this._makeRequest(`/messages?${params.toString()}`, "DELETE");
  }

  /**
   * Получить сообщение
   * @param {string} messageId - ID сообщения
   * @returns {Message} - Сообщение
   */
  getMessage(messageId) {
    return this._makeRequest(`/messages/${messageId}`);
  }

  /**
   * Получить информацию о видео
   * @param {string} videoToken - Токен видео
   * @returns {VideoAttachmentDetails} - Детальная информация о видео
   */
  getVideoInfo(videoToken) {
    return this._makeRequest(`/videos/${videoToken}`);
  }

  /**
   * Ответ на callback
   * @param {string} callbackId - ID callback
   * @param {CallbackAnswer} callbackAnswer - Ответ на callback
   * @returns {SimpleQueryResult} - Результат операции
   */
  answerCallback(callbackId, callbackAnswer) {
    const params = createURLParams();
    params.append("callback_id", callbackId);
    return this._makeRequest(
      `/answers?${params.toString()}`,
      "POST",
      callbackAnswer
    );
  }

  // ===== БИЛДЕР КЛАВИАТУР =====

  /**
   * Билдер для создания клавиатур
   */
  get keyboard() {
    return new KeyboardBuilder();
  }

  /**
   * Билдер для создания фото
   */
  get photo() {
    return new PhotoBuilder();
  }

  /**
   * Билдер для создания видео
   */
  get video() {
    return new VideoBuilder();
  }

  /**
   * Билдер для создания аудио
   */
  get audio() {
    return new AudioBuilder();
  }

  /**
   * Билдер для создания файлов
   */
  get file() {
    return new FileBuilder();
  }

  /**
   * Билдер для создания местоположения
   */
  get location() {
    return new LocationBuilder();
  }

  /**
   * Билдер для создания контактов
   */
  get contact() {
    return new ContactBuilder();
  }

  /**
   * Билдер для создания команд
   */
  get command() {
    return new CommandBuilder();
  }

  /**
   * Обработка входящих обновлений
   * @param {Update} update - Обновление от API
   */
  handleUpdate(update) {
    switch (update.type) {
      case "message":
      case "message_created":
      case "message_edited":
        this.onMessage(update.payload);
        break;
      case "message_callback":
        this.onCallback(update.payload);
        break;
      case "chat_member":
        this.onChatMember(update.payload);
        break;
      case "chat_action":
        this.onChatAction(update.payload);
        break;
      case "bot_added":
      case "bot_removed":
      case "user_added":
      case "user_removed":
      case "bot_started":
      case "chat_title_changed":
      case "message_chat_created":
        // Эти события можно обрабатывать в onMessage или создать отдельные обработчики
        console.log(`Получено событие: ${update.type}`, update.payload);
        break;
      default:
        console.log(`Неизвестный тип обновления: ${update.type}`, update);
    }
  }

  // ===== МЕТОДЫ ДЛЯ ПЕРЕОПРЕДЕЛЕНИЯ =====

  /**
   * Обработчик входящих сообщений (переопределите в наследнике)
   * @param {Message|PhotoMessage|VideoMessage|AudioMessage|FileMessage|LocationMessage|ContactMessage} message - Сообщение
   */
  onMessage(message) {
    console.log("Получено сообщение:", message);
  }

  /**
   * Обработчик callback кнопок (переопределите в наследнике)
   * @param {Callback} callback - Callback данные
   */
  onCallback(callback) {
    console.log("Получен callback:", callback);
  }

  /**
   * Обработчик изменений участников чата (переопределите в наследнике)
   * @param {ChatMember} chatMember - Данные участника чата
   */
  onChatMember(chatMember) {
    console.log("Изменение участника чата:", chatMember);
  }

  /**
   * Обработчик действий в чате (переопределите в наследнике)
   * @param {ChatAction} chatAction - Действие в чате
   */
  onChatAction(chatAction) {
    console.log("Действие в чате:", chatAction);
  }
}

/**
 * Создает экземпляр бота
 * @param {string} accessToken - Токен доступа
 * @param {string} [webhookUrl] - URL вебхука (опционально)
 * @returns {Bot} Экземпляр бота
 */
function init(accessToken, webhookUrl) {
  return new Bot(accessToken, webhookUrl);
}

/**
 * Создает экземпляр бота с кастомным классом
 * @param {string} accessToken - Токен доступа
 * @param {Function} CustomBotClass - Класс бота для наследования
 * @param {string} [webhookUrl] - URL вебхука (опционально)
 * @returns {Bot} Экземпляр кастомного бота
 */
function createBot(accessToken, CustomBotClass, webhookUrl = null) {
  // Создаем базовый экземпляр бота
  const baseBot = new Bot(accessToken, webhookUrl);

  // Создаем экземпляр кастомного класса
  const customBot = new CustomBotClass(accessToken, webhookUrl);

  // Копируем все методы и свойства базового бота в кастомный
  for (const key in baseBot) {
    if (baseBot.hasOwnProperty(key) && !customBot.hasOwnProperty(key)) {
      customBot[key] = baseBot[key];
    }
  }

  // Копируем прототипные методы
  const basePrototype = Object.getPrototypeOf(baseBot);
  const customPrototype = Object.getPrototypeOf(customBot);

  for (const key in basePrototype) {
    if (
      basePrototype.hasOwnProperty(key) &&
      !customPrototype.hasOwnProperty(key)
    ) {
      customPrototype[key] = basePrototype[key];
    }
  }

  return customBot;
}

/**
 * Добавляет кастомные обработчики к экземпляру бота (Mixin паттерн)
 * @param {Bot} bot - Экземпляр бота
 * @param {Object} handlers - Объект с обработчиками событий
 * @param {Function} handlers.onMessage - Обработчик сообщений
 * @param {Function} handlers.onCallback - Обработчик callback кнопок
 * @param {Function} [handlers.onChatMember] - Обработчик изменений участников
 * @param {Function} [handlers.onChatAction] - Обработчик действий в чате
 * @returns {Bot} Бот с добавленными обработчиками
 */
function withCustomHandlers(bot, handlers) {
  return Object.assign(bot, {
    onMessage: handlers.onMessage?.bind(bot),
    onCallback: handlers.onCallback?.bind(bot),
    onChatMember: handlers.onChatMember?.bind(bot),
    onChatAction: handlers.onChatAction?.bind(bot),
  });
}
