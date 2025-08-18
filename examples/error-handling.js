/**
 * Примеры обработки ошибок MAX Bot API
 */

// Создание экземпляра бота
const bot = new Bot("YOUR_ACCESS_TOKEN");

/**
 * Пример 1: Обработка ошибок при отправке сообщения
 */
function example1() {
  try {
    // Попытка отправить сообщение с неверным chatId
    const result = bot.sendMessage({
      text: "Тестовое сообщение",
      chatId: "invalid_chat_id",
    });
    console.log("Сообщение отправлено:", result);
  } catch (error) {
    if (error instanceof MaxError) {
      console.log("Ошибка MAX API:");
      console.log("  Статус:", error.status);
      console.log("  Код ошибки:", error.code);
      console.log("  Описание:", error.description);

      // Обработка конкретных ошибок
      switch (error.status) {
        case HTTP_CODES.BAD_REQUEST:
          console.log("  Неверный запрос - проверьте параметры");
          break;
        case HTTP_CODES.UNAUTHORIZED:
          console.log("  Ошибка аутентификации - проверьте токен");
          break;
        case HTTP_CODES.NOT_FOUND:
          console.log("  Ресурс не найден");
          break;
        case HTTP_CODES.TOO_MANY_REQUESTS:
          console.log("  Превышен лимит запросов - подождите");
          break;
        case HTTP_CODES.SERVICE_UNAVAILABLE:
          console.log("  Сервис недоступен - попробуйте позже");
          break;
        default:
          console.log("  Неизвестная ошибка");
      }
    } else {
      console.log("Другая ошибка:", error.message);
    }
  }
}

/**
 * Пример 2: Обработка ошибок при получении информации о боте
 */
function example2() {
  try {
    // Попытка получить информацию с неверным токеном
    const botInfo = bot.getMe();
    console.log("Информация о боте:", botInfo);
  } catch (error) {
    if (error instanceof MaxError) {
      console.log("Ошибка при получении информации о боте:");
      console.log("  Код:", error.code);
      console.log("  Сообщение:", error.description);

      if (error.status === HTTP_CODES.UNAUTHORIZED) {
        console.log("  Токен недействителен или отсутствует");
      }
    }
  }
}

/**
 * Пример 3: Обработка ошибок при работе с чатами
 */
function example3() {
  try {
    // Попытка получить несуществующий чат
    const chat = bot.getChat("non_existent_chat_id");
    console.log("Информация о чате:", chat);
  } catch (error) {
    if (error instanceof MaxError) {
      console.log("Ошибка при получении чата:");
      console.log("  Статус:", error.status);
      console.log("  Код:", error.code);
      console.log("  Описание:", error.description);
    }
  }
}

/**
 * Пример 4: Универсальная функция обработки ошибок
 */
function handleMaxError(error, operation) {
  if (error instanceof MaxError) {
    console.log(`Ошибка при выполнении операции "${operation}":`);
    console.log(`  HTTP ${error.status}: ${error.description}`);

    // Логирование для отладки
    console.log(`  Код ошибки: ${error.code}`);
    console.log(`  Полный ответ:`, error.response);

    return {
      success: false,
      error: {
        status: error.status,
        code: error.code,
        message: error.description,
      },
    };
  } else {
    console.log(
      `Неожиданная ошибка при выполнении "${operation}":`,
      error.message
    );
    return {
      success: false,
      error: {
        status: 0,
        code: "UNKNOWN_ERROR",
        message: error.message,
      },
    };
  }
}

/**
 * Пример 5: Использование универсальной обработки ошибок
 */
function example5() {
  // Отправка сообщения с обработкой ошибок
  try {
    const result = bot.sendMessage({
      text: "Тестовое сообщение",
      chatId: "test_chat_id",
    });
    console.log("Успешно:", result);
  } catch (error) {
    const errorInfo = handleMaxError(error, "отправка сообщения");
    if (!errorInfo.success) {
      console.log("Не удалось отправить сообщение:", errorInfo.error);
    }
  }

  // Получение чатов с обработкой ошибок
  try {
    const chats = bot.getChats(10);
    console.log("Чаты получены:", chats);
  } catch (error) {
    const errorInfo = handleMaxError(error, "получение чатов");
    if (!errorInfo.success) {
      console.log("Не удалось получить чаты:", errorInfo.error);
    }
  }
}

/**
 * Пример 6: Retry механизм для ошибок 429 (Too Many Requests)
 */
async function example6() {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const result = bot.sendMessage({
        text: "Сообщение с retry",
        chatId: "test_chat_id",
      });
      console.log("Успешно отправлено:", result);
      break;
    } catch (error) {
      if (
        error instanceof MaxError &&
        error.status === HTTP_CODES.TOO_MANY_REQUESTS
      ) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // Экспоненциальная задержка
        console.log(
          `Превышен лимит запросов. Повтор ${retryCount}/${maxRetries} через ${delay}ms`
        );

        if (retryCount < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.log("Превышено максимальное количество попыток");
        }
      } else {
        console.log("Другая ошибка:", error.message);
        break;
      }
    }
  }
}

// Экспорт функций для использования
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    example1,
    example2,
    example3,
    example5,
    example6,
    handleMaxError,
  };
}
