/**
 * Билдер для создания клавиатур
 */
class KeyboardBuilder {
  constructor() {
    this.buttons = [];
    this.currentRow = [];
  }

  /**
   * Добавить кнопку callback
   */
  callback(text, payload) {
    this.currentRow.push({
      type: "callback",
      text: text,
      payload: payload,
    });
    return this;
  }

  /**
   * Добавить кнопку ссылки
   */
  link(text, url) {
    this.currentRow.push({
      type: "link",
      text: text,
      url: url,
    });
    return this;
  }

  /**
   * Добавить кнопку запроса контакта
   */
  contact(text) {
    this.currentRow.push({
      type: "request_contact",
      text: text,
    });
    return this;
  }

  /**
   * Добавить кнопку запроса геолокации
   */
  location(text) {
    this.currentRow.push({
      type: "request_geo_location",
      text: text,
    });
    return this;
  }

  /**
   * Добавить кнопку открытия приложения
   */
  app(text, appId) {
    this.currentRow.push({
      type: "open_app",
      text: text,
      app_id: appId,
    });
    return this;
  }

  /**
   * Добавить кнопку сообщения
   */
  message(text) {
    this.currentRow.push({
      type: "message",
      text: text,
    });
    return this;
  }

  /**
   * Перейти на новую строку
   */
  row() {
    if (this.currentRow.length > 0) {
      this.buttons.push([...this.currentRow]);
      this.currentRow = [];
    }
    return this;
  }

  /**
   * Создать клавиатуру
   */
  build() {
    // Добавляем последнюю строку, если она есть
    if (this.currentRow.length > 0) {
      this.buttons.push([...this.currentRow]);
    }

    return {
      type: "inline_keyboard",
      payload: {
        buttons: this.buttons,
      },
    };
  }

  /**
   * Очистить клавиатуру
   */
  clear() {
    this.buttons = [];
    this.currentRow = [];
    return this;
  }
}

/**
 * Билдеры для создания медиафайлов и других типов сообщений
 */

/**
 * Билдер для создания фото
 */
class PhotoBuilder {
  constructor() {
    this.photo = null;
    this.caption = null;
    this.format = "plain";
    this.keyboard = null;
    this.replyToMessageId = null;
  }

  /**
   * Установить URL фото
   * @param {string} url - URL фото
   */
  url(url) {
    this.photo = url;
    return this;
  }

  /**
   * Установить подпись к фото
   * @param {string} caption - Подпись
   */
  caption(caption) {
    this.caption = caption;
    return this;
  }

  /**
   * Установить формат подписи
   * @param {string} format - Формат (plain, markdown, html)
   */
  format(format) {
    this.format = format;
    return this;
  }

  /**
   * Установить клавиатуру
   * @param {Object} keyboard - Inline клавиатура
   */
  keyboard(keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  /**
   * Установить ID сообщения для ответа
   * @param {string} messageId - ID сообщения
   */
  replyTo(messageId) {
    this.replyToMessageId = messageId;
    return this;
  }

  /**
   * Создать объект фото
   */
  build() {
    if (!this.photo) {
      throw new Error("URL фото обязателен");
    }

    const result = {
      photo: this.photo,
    };

    if (this.caption) {
      result.caption = this.caption;
      result.format = this.format;
    }

    if (this.keyboard) {
      result.keyboard = this.keyboard;
    }

    if (this.replyToMessageId) {
      result.reply_to_message_id = this.replyToMessageId;
    }

    return result;
  }
}

/**
 * Билдер для создания видео
 */
class VideoBuilder {
  constructor() {
    this.video = null;
    this.caption = null;
    this.format = "plain";
    this.keyboard = null;
    this.replyToMessageId = null;
  }

  /**
   * Установить URL видео
   * @param {string} url - URL видео
   */
  url(url) {
    this.video = url;
    return this;
  }

  /**
   * Установить подпись к видео
   * @param {string} caption - Подпись
   */
  caption(caption) {
    this.caption = caption;
    return this;
  }

  /**
   * Установить формат подписи
   * @param {string} format - Формат (plain, markdown, html)
   */
  format(format) {
    this.format = format;
    return this;
  }

  /**
   * Установить клавиатуру
   * @param {Object} keyboard - Inline клавиатура
   */
  keyboard(keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  /**
   * Установить ID сообщения для ответа
   * @param {string} messageId - ID сообщения
   */
  replyTo(messageId) {
    this.replyToMessageId = messageId;
    return this;
  }

  /**
   * Создать объект видео
   */
  build() {
    if (!this.video) {
      throw new Error("URL видео обязателен");
    }

    const result = {
      video: this.video,
    };

    if (this.caption) {
      result.caption = this.caption;
      result.format = this.format;
    }

    if (this.keyboard) {
      result.keyboard = this.keyboard;
    }

    if (this.replyToMessageId) {
      result.reply_to_message_id = this.replyToMessageId;
    }

    return result;
  }
}

/**
 * Билдер для создания аудио
 */
class AudioBuilder {
  constructor() {
    this.audio = null;
    this.caption = null;
    this.format = "plain";
    this.title = null;
    this.performer = null;
    this.keyboard = null;
    this.replyToMessageId = null;
  }

  /**
   * Установить URL аудио
   * @param {string} url - URL аудио
   */
  url(url) {
    this.audio = url;
    return this;
  }

  /**
   * Установить подпись к аудио
   * @param {string} caption - Подпись
   */
  caption(caption) {
    this.caption = caption;
    return this;
  }

  /**
   * Установить формат подписи
   * @param {string} format - Формат (plain, markdown, html)
   */
  format(format) {
    this.format = format;
    return this;
  }

  /**
   * Установить название аудио
   * @param {string} title - Название
   */
  title(title) {
    this.title = title;
    return this;
  }

  /**
   * Установить исполнителя
   * @param {string} performer - Исполнитель
   */
  performer(performer) {
    this.performer = performer;
    return this;
  }

  /**
   * Установить клавиатуру
   * @param {Object} keyboard - Inline клавиатура
   */
  keyboard(keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  /**
   * Установить ID сообщения для ответа
   * @param {string} messageId - ID сообщения
   */
  replyTo(messageId) {
    this.replyToMessageId = messageId;
    return this;
  }

  /**
   * Создать объект аудио
   */
  build() {
    if (!this.audio) {
      throw new Error("URL аудио обязателен");
    }

    const result = {
      audio: this.audio,
    };

    if (this.caption) {
      result.caption = this.caption;
      result.format = this.format;
    }

    if (this.title) {
      result.title = this.title;
    }

    if (this.performer) {
      result.performer = this.performer;
    }

    if (this.keyboard) {
      result.keyboard = this.keyboard;
    }

    if (this.replyToMessageId) {
      result.reply_to_message_id = this.replyToMessageId;
    }

    return result;
  }
}

/**
 * Билдер для создания файла
 */
class FileBuilder {
  constructor() {
    this.file = null;
    this.caption = null;
    this.format = "plain";
    this.keyboard = null;
    this.replyToMessageId = null;
  }

  /**
   * Установить URL файла
   * @param {string} url - URL файла
   */
  url(url) {
    this.file = url;
    return this;
  }

  /**
   * Установить подпись к файлу
   * @param {string} caption - Подпись
   */
  caption(caption) {
    this.caption = caption;
    return this;
  }

  /**
   * Установить формат подписи
   * @param {string} format - Формат (plain, markdown, html)
   */
  format(format) {
    this.format = format;
    return this;
  }

  /**
   * Установить клавиатуру
   * @param {Object} keyboard - Inline клавиатура
   */
  keyboard(keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  /**
   * Установить ID сообщения для ответа
   * @param {string} messageId - ID сообщения
   */
  replyTo(messageId) {
    this.replyToMessageId = messageId;
    return this;
  }

  /**
   * Создать объект файла
   */
  build() {
    if (!this.file) {
      throw new Error("URL файла обязателен");
    }

    const result = {
      file: this.file,
    };

    if (this.caption) {
      result.caption = this.caption;
      result.format = this.format;
    }

    if (this.keyboard) {
      result.keyboard = this.keyboard;
    }

    if (this.replyToMessageId) {
      result.reply_to_message_id = this.replyToMessageId;
    }

    return result;
  }
}

/**
 * Билдер для создания местоположения
 */
class LocationBuilder {
  constructor() {
    this.latitude = null;
    this.longitude = null;
    this.title = null;
    this.address = null;
    this.keyboard = null;
    this.replyToMessageId = null;
  }

  /**
   * Установить координаты
   * @param {number} latitude - Широта
   * @param {number} longitude - Долгота
   */
  coordinates(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    return this;
  }

  /**
   * Установить название места
   * @param {string} title - Название
   */
  title(title) {
    this.title = title;
    return this;
  }

  /**
   * Установить адрес
   * @param {string} address - Адрес
   */
  address(address) {
    this.address = address;
    return this;
  }

  /**
   * Установить клавиатуру
   * @param {Object} keyboard - Inline клавиатура
   */
  keyboard(keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  /**
   * Установить ID сообщения для ответа
   * @param {string} messageId - ID сообщения
   */
  replyTo(messageId) {
    this.replyToMessageId = messageId;
    return this;
  }

  /**
   * Создать объект местоположения
   */
  build() {
    if (this.latitude === null || this.longitude === null) {
      throw new Error("Координаты обязательны");
    }

    const result = {
      latitude: this.latitude,
      longitude: this.longitude,
    };

    if (this.title) {
      result.title = this.title;
    }

    if (this.address) {
      result.address = this.address;
    }

    if (this.keyboard) {
      result.keyboard = this.keyboard;
    }

    if (this.replyToMessageId) {
      result.reply_to_message_id = this.replyToMessageId;
    }

    return result;
  }
}

/**
 * Билдер для создания контакта
 */
class ContactBuilder {
  constructor() {
    this.phoneNumber = null;
    this.firstName = null;
    this.lastName = null;
    this.userId = null;
    this.keyboard = null;
    this.replyToMessageId = null;
  }

  /**
   * Установить номер телефона
   * @param {string} phoneNumber - Номер телефона
   */
  phone(phoneNumber) {
    this.phoneNumber = phoneNumber;
    return this;
  }

  /**
   * Установить имя
   * @param {string} firstName - Имя
   */
  firstName(firstName) {
    this.firstName = firstName;
    return this;
  }

  /**
   * Установить фамилию
   * @param {string} lastName - Фамилия
   */
  lastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  /**
   * Установить ID пользователя
   * @param {string} userId - ID пользователя
   */
  userId(userId) {
    this.userId = userId;
    return this;
  }

  /**
   * Установить клавиатуру
   * @param {Object} keyboard - Inline клавиатура
   */
  keyboard(keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  /**
   * Установить ID сообщения для ответа
   * @param {string} messageId - ID сообщения
   */
  replyTo(messageId) {
    this.replyToMessageId = messageId;
    return this;
  }

  /**
   * Создать объект контакта
   */
  build() {
    if (!this.phoneNumber || !this.firstName) {
      throw new Error("Номер телефона и имя обязательны");
    }

    const result = {
      phone_number: this.phoneNumber,
      first_name: this.firstName,
    };

    if (this.lastName) {
      result.last_name = this.lastName;
    }

    if (this.userId) {
      result.user_id = this.userId;
    }

    if (this.keyboard) {
      result.keyboard = this.keyboard;
    }

    if (this.replyToMessageId) {
      result.reply_to_message_id = this.replyToMessageId;
    }

    return result;
  }
}

/**
 * Билдер для создания команд бота
 */
class CommandBuilder {
  constructor() {
    this.commands = [];
  }

  /**
   * Добавить команду
   * @param {string} name - Название команды (например, "start")
   * @param {string} description - Описание команды
   */
  add(name, description) {
    this.commands.push({
      name: name,
      description: description,
    });
    return this;
  }

  /**
   * Добавить команду start
   * @param {string} description - Описание команды
   */
  start(description = "Запуск бота") {
    return this.add("start", description);
  }

  /**
   * Добавить команду help
   * @param {string} description - Описание команды
   */
  help(description = "Справка") {
    return this.add("help", description);
  }

  /**
   * Добавить команду menu
   * @param {string} description - Описание команды
   */
  menu(description = "Меню") {
    return this.add("menu", description);
  }

  /**
   * Добавить команду settings
   * @param {string} description - Описание команды
   */
  settings(description = "Настройки") {
    return this.add("settings", description);
  }

  /**
   * Добавить команду profile
   * @param {string} description - Описание команды
   */
  profile(description = "Профиль") {
    return this.add("profile", description);
  }

  /**
   * Добавить команду info
   * @param {string} description - Описание команды
   */
  info(description = "О боте") {
    return this.add("info", description);
  }

  /**
   * Добавить команду support
   * @param {string} description - Описание команды
   */
  support(description = "Поддержка") {
    return this.add("support", description);
  }

  /**
   * Добавить команду feedback
   * @param {string} description - Описание команды
   */
  feedback(description = "Оставить отзыв") {
    return this.add("feedback", description);
  }

  /**
   * Добавить команду language
   * @param {string} description - Описание команды
   */
  language(description = "Изменить язык") {
    return this.add("language", description);
  }

  /**
   * Добавить команду notifications
   * @param {string} description - Описание команды
   */
  notifications(description = "Настройки уведомлений") {
    return this.add("notifications", description);
  }

  /**
   * Очистить все команды
   */
  clear() {
    this.commands = [];
    return this;
  }

  /**
   * Получить количество команд
   */
  count() {
    return this.commands.length;
  }

  /**
   * Проверить, есть ли команды
   */
  isEmpty() {
    return this.commands.length === 0;
  }

  /**
   * Создать массив команд
   */
  build() {
    if (this.commands.length === 0) {
      throw new Error("Добавьте хотя бы одну команду");
    }

    if (this.commands.length > 32) {
      throw new Error("Максимальное количество команд: 32");
    }

    return [...this.commands];
  }

  /**
   * Создать стандартный набор команд
   */
  buildDefault() {
    return this.start("Запустить бота")
      .help("Показать справку")
      .menu("Главное меню")
      .settings("Настройки")
      .profile("Мой профиль")
      .build();
  }

  /**
   * Создать минимальный набор команд
   */
  buildMinimal() {
    return this.start("Запустить бота").help("Показать справку").build();
  }
}

// Экспорт билдеров
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    KeyboardBuilder,
    PhotoBuilder,
    VideoBuilder,
    AudioBuilder,
    FileBuilder,
    LocationBuilder,
    ContactBuilder,
    CommandBuilder,
  };
}
