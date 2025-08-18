/**
 * Примеры использования методов для работы с командами бота
 */

// Создание экземпляра бота
// const bot = MaxBot.init("YOUR_ACCESS_TOKEN");
const bot = new Bot("YOUR_ACCESS_TOKEN");

/**
 * Пример 1: Установка команд бота (ручной способ)
 */
function example1() {
  const commands = [
    {
      name: "start",
      description: "Старт",
    },
    {
      name: "help",
      description: "Справка",
    },
    {
      name: "menu",
      description: "Меню",
    },
  ];

  try {
    const result = bot.setMyCommands(commands);
    console.log("Команды установлены:", result);
  } catch (error) {
    console.error("Ошибка при установке команд:", error);
  }
}

/**
 * Пример 1a: Установка команд бота через билдер
 */
function example1a() {
  const commands = bot.command
    .start("Запустить бота")
    .help("Показать справку")
    .menu("Показать главное меню")
    .build();

  try {
    const result = bot.setMyCommands(commands);
    console.log("Команды установлены:", result);
  } catch (error) {
    console.error("Ошибка при установке команд:", error);
  }
}

/**
 * Пример 2: Удаление всех команд
 */
function example2() {
  try {
    const result = bot.deleteMyCommands();
    console.log("Все команды удалены:", result);
  } catch (error) {
    console.error("Ошибка при удалении всех команд:", error);
  }
}

/**
 * Пример 2a: Использование готовых наборов команд
 */
function example2a() {
  // Стандартный набор команд
  const defaultCommands = bot.command.buildDefault();
  console.log("Стандартные команды:", defaultCommands);

  // Минимальный набор команд
  const minimalCommands = bot.command.buildMinimal();
  console.log("Минимальные команды:", minimalCommands);

  // Установка стандартных команд
  try {
    const result = bot.setMyCommands(defaultCommands);
    console.log("Стандартные команды установлены:", result);
  } catch (error) {
    console.error("Ошибка при установке команд:", error);
  }
}

/**
 * Пример 2b: Расширенный набор команд
 */
function example2b() {
  const commands = bot.command
    .start("Запустить бота")
    .help("Показать справку")
    .menu("Главное меню")
    .settings("Настройки")
    .profile("Мой профиль")
    .info("Информация о боте")
    .contact("Связаться с поддержкой")
    .feedback("Оставить отзыв")
    .language("Изменить язык")
    .notifications("Настройки уведомлений")
    .build();

  try {
    const result = bot.setMyCommands(commands);
    console.log("Расширенные команды установлены:", result);
  } catch (error) {
    console.error("Ошибка при установке команд:", error);
  }
}

/**
 * Пример 3: Бот с командами
 */
class CommandBot extends Bot {
  constructor(accessToken) {
    super(accessToken);
    this.setupCommands();
  }

  /**
   * Настройка команд при инициализации бота
   */
  setupCommands() {
    const commands = this.command
      .start("Запустить бота")
      .help("Показать справку")
      .menu("Главное меню")
      .build();

    this.setMyCommands(commands);
  }

  /**
   * Обработка входящих сообщений
   */
  onMessage(message) {
    const chatId = message.chat_id;
    const text = message.text;

    if (!text) return;

    // Обработка команд
    if (text.startsWith("/")) {
      this.handleCommand(chatId, text);
    } else {
      // Обычные сообщения
      this.sendMessage({ text: `Вы написали: ${text}`, chatId });
    }
  }

  /**
   * Обработка команд
   */
  handleCommand(chatId, text) {
    const command = text.split(" ")[0].substring(1); // Убираем '/'

    switch (command) {
      case "start":
        this.sendMessage({
          text: "Добро пожаловать! Используйте /help для справки.",
          chatId,
        });
        break;

      case "help":
        const helpText = `📚 **Доступные команды:**

/start - Запустить бота
/help - Показать эту справку
/menu - Главное меню

**Как использовать:**
Просто отправьте команду, например: /start`;

        this.sendMessage({ text: helpText, chatId, format: "markdown" });
        break;

      case "menu":
        const keyboard = this.keyboard
          .callback("📋 Профиль", "profile")
          .callback("⚙️ Настройки", "settings")
          .callback("❓ Помощь", "help")
          .build();

        this.sendMessage({ text: "Выберите действие:", chatId, keyboard });
        break;

      default:
        this.sendMessage({
          text: `Неизвестная команда: /${command}\nИспользуйте /help для справки.`,
          chatId,
        });
    }
  }

  /**
   * Обработка callback кнопок
   */
  onCallback(callback) {
    const chatId = callback.chat_id;
    const payload = callback.payload;

    switch (payload) {
      case "profile":
        this.sendMessage({
          text: "Ваш профиль:\nИмя: Пользователь\nСтатус: Активен",
          chatId,
        });
        break;

      case "settings":
        this.sendMessage({
          text: "Настройки бота:\nУведомления: Включены\nЯзык: Русский",
          chatId,
        });
        break;

      case "help":
        this.sendMessage({
          text: "Помощь по использованию бота. Используйте /help для подробной справки.",
          chatId,
        });
        break;
    }
  }
}
