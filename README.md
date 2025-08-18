# MaxBot - Библиотека для работы с API MAX

<div align="center">
  <img src="src/logo.jpg" alt="MaxBot Logo" width="200" height="200">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-Library-blue.svg)](https://script.google.com/)
[![MAX API](https://img.shields.io/badge/MAX%20API-Documentation-green.svg)](https://dev.max.ru/docs-api)

</div>

Полнофункциональная библиотека для работы с API MAX в Google Apps Script с поддержкой вебхуков, медиафайлов, клавиатур и методов API.

## 📦 ID библиотеки Apps Script

```
1dUzlK1qVuXOB8OOKgWazEBtCSbFRqIUv9F0-yQXM4K9xk6UlH-Ks2aOU
```

## 📋 Содержание

- [Установка](#установка)
- [Быстрый старт](#быстрый-старт)
- [API методы](#api-методы)
- [Примеры](#примеры)
- [Вебхуки](#вебхуки)
- [Обработка ошибок](#обработка-ошибок)
- [Документация](#документация)

## 🚀 Установка

### Способ 1: Использование как библиотеки (Рекомендуется)

1. **Откройте [Google Apps Script](https://script.google.com/)**
2. **Создайте новый проект**
3. **Добавьте библиотеку MaxBot:**
   - В редакторе нажмите на значок `+` рядом с "Библиотеки"
   - Введите ID библиотеки: `1dUzlK1qVuXOB8OOKgWazEBtCSbFRqIUv9F0-yQXM4K9xk6UlH-Ks2aOU`
   - Выберите последнюю версию
   - Нажмите "Добавить"

### Способ 2: Полное копирование кода

1. **Создайте проект Apps Script**
2. **Добавьте файлы:**
   - Создайте файл `bot.gs` и скопируйте код из `bot/bot.js`
   - Создайте файл `builders.gs` и скопируйте код из `bot/builders.js`
   - Создайте файл `errors.gs` и скопируйте код из `bot/errors.js`
   - Создайте файл `types.gs` и скопируйте код из `bot/types.js`
   - Создайте файл `utils.gs` и скопируйте код из `bot/utils.js`

## ⚡ Быстрый старт

### Получение токена доступа

Инструкция, для получение токена на [dev.max.ru](https://dev.max.ru/docs/chatbots/bots-coding/prepare)
1. Создайте нового бота
2. Скопируйте токен доступа

### Простое использование

```javascript
// Импорт библиотеки (если используете как библиотеку)
const { Bot } = MaxBot;

// Создание экземпляра бота
const bot = new Bot("YOUR_ACCESS_TOKEN");

// Получение информации о боте
const botInfo = bot.getMe();
console.log("Информация о боте:", botInfo);

// Отправка сообщения
bot.sendMessage({
  text: "Привет, мир!",
  chatId: "CHAT_ID",
});
```

### С обработчиками событий

```javascript
class MyBot extends Bot {
  onMessage(message) {
    const chatId = message.recipient.data.chat_id;
    const text = message.body.text;

    if (text === "/start") {
      this.sendMessage({
        text: "Добро пожаловать!",
        chatId: chatId,
      });
    } else {
      this.sendMessage({
        text: `Вы написали: ${text}`,
        chatId: chatId,
      });
    }
  }

  onCallback(callback) {
    const chatId = callback.chat_id;
    const payload = callback.payload;

    this.sendMessage({
      text: `Нажата кнопка: ${payload}`,
      chatId: chatId,
    });
  }
}

const myBot = new MyBot("YOUR_ACCESS_TOKEN");
```

### Настройка вебхука

```javascript
// Установка вебхука
const webhookUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
bot.setWebhook(webhookUrl);

// Удаление вебхука
bot.deleteWebhook();
```

## 🔧 API методы

### 🏠 Методы бота

- `getMe()` - Получение информации о текущем боте
- `updateMe(updates)` - Изменение информации о боте
- `getMyCommands()` - Получение команд бота
- `setMyCommands(commands)` - Установка команд бота
- `deleteMyCommands()` - Удаление всех команд бота

### 💬 Методы чатов

- `getChats(count, marker)` - Получение списка чатов с пагинацией
- `getChatByLink(chatLink)` - Получение чата по ссылке или username
- `getChat(chatId)` - Получение информации о чате
- `updateChat(chatId, updates)` - Изменение информации о чате
- `deleteChat(chatId)` - Удаление чата
- `sendChatAction(chatId, action)` - Отправка действия в чат (typing, upload_photo, etc.)
- `getPinnedMessage(chatId)` - Получение закрепленного сообщения
- `pinMessage(chatId, messageId, notify)` - Закрепление сообщения
- `unpinMessage(chatId)` - Удаление закрепленного сообщения

### 👥 Методы участников

- `getMyChatMember(chatId)` - Получение информации о членстве бота
- `leaveChat(chatId)` - Выход из чата
- `getChatAdmins(chatId)` - Получение списка администраторов
- `setChatAdmins(chatId, admins)` - Назначение администраторов
- `deleteChatAdmin(chatId, userId)` - Удаление администратора
- `getChatMembers(chatId, userIds, marker, count)` - Получение участников чата
- `addChatMembers(chatId, userIds)` - Добавление участников в чат
- `removeChatMember(chatId, userId, block)` - Удаление участника из чата

### 📨 Методы сообщений

- `getMessages(chatId, messageIds, from, to, count)` - Получение сообщений
- `sendMessage(options)` - Отправка сообщения
- `editMessage(messageId, messageBody)` - Редактирование сообщения
- `deleteMessage(messageId)` - Удаление сообщения
- `getMessage(messageId)` - Получение сообщения
- `getVideoInfo(videoToken)` - Получение информации о видео
- `answerCallback(callbackId, callbackAnswer)` - Ответ на callback

### 🔗 Методы вебхуков

- `getWebhooks()` - Получение списка подписок
- `setWebhook(url, updateTypes, secret, version)` - Подписка на обновления
- `removeWebhook(url)` - Отписка от обновлений
- `getUpdates(limit, timeout, marker, types)` - Получение обновлений

### 📁 Методы файлов

- `getUploadUrl(type)` - Получение URL для загрузки файла
  - `type` - Тип файла: `"image"`, `"video"`, `"audio"`, `"file"`

### 🎯 Обработчики событий

- `handleUpdate(update)` - Обработка обновления от вебхука
- `onMessage(message)` - Обработка входящих сообщений (переопределяется)
- `onCallback(callback)` - Обработка нажатий кнопок (переопределяется)
- `onChatMember(chatMember)` - Обработка изменений участников (переопределяется)
- `onChatAction(chatAction)` - Обработка действий в чате (переопределяется)

## 🛠️ Билдеры

### ⌨️ KeyboardBuilder

Создание интерактивных клавиатур:

- `callback(text, payload)` - Callback кнопка
- `link(text, url)` - Кнопка-ссылка
- `contact(text)` - Запрос контакта
- `location(text)` - Запрос геолокации
- `app(text, appId)` - Открытие приложения
- `message(text)` - Отправка сообщения
- `row()` - Переход на новую строку
- `build()` - Создание клавиатуры

### 📸 MediaBuilders

#### PhotoBuilder

- `url(url)` - URL изображения
- `caption(caption)` - Подпись к фото
- `format(format)` - Формат подписи (markdown/html)
- `build()` - Создание объекта фото

#### VideoBuilder

- `url(url)` - URL видео
- `caption(caption)` - Подпись к видео
- `keyboard(keyboard)` - Клавиатура
- `build()` - Создание объекта видео

#### AudioBuilder

- `url(url)` - URL аудио
- `title(title)` - Название
- `performer(performer)` - Исполнитель
- `caption(caption)` - Подпись
- `build()` - Создание объекта аудио

#### FileBuilder

- `url(url)` - URL файла
- `caption(caption)` - Подпись к файлу
- `build()` - Создание объекта файла

#### LocationBuilder

- `coordinates(lat, lng)` - Координаты
- `title(title)` - Название места
- `address(address)` - Адрес
- `build()` - Создание объекта местоположения

#### ContactBuilder

- `phone(phone)` - Номер телефона
- `firstName(name)` - Имя
- `lastName(name)` - Фамилия
- `build()` - Создание объекта контакта

### 📝 CommandBuilder

Создание команд бота:

- `add(name, description)` - Добавить команду
- `start(description)` - Команда /start
- `help(description)` - Команда /help
- `menu(description)` - Команда /menu
- `settings(description)` - Команда /settings
- `profile(description)` - Команда /profile
- `info(description)` - Команда /info
- `contact(description)` - Команда /contact
- `feedback(description)` - Команда /feedback
- `language(description)` - Команда /language
- `notifications(description)` - Команда /notifications
- `clear()` - Очистить все команды
- `build()` - Создать массив команд
- `buildDefault()` - Стандартный набор команд
- `buildMinimal()` - Минимальный набор команд

## 📚 Примеры

### Полные примеры использования

Смотрите папку `examples/` для подробных примеров:

- `bot.js` - Основной пример бота
- `media.js` - Работа с медиафайлами
- `keyboard.js` - Создание клавиатур
- `command.js` - Обработка команд
- `error-handling.js` - Обработка ошибок

### Отправка сообщений

```javascript
// Простое сообщение
bot.sendMessage({
  text: "Привет!",
  chatId: "CHAT_ID",
});

// Сообщение с форматированием
bot.sendMessage({
  text: "**Жирный текст**",
  chatId: "CHAT_ID",
  format: "markdown",
});

// Сообщение с клавиатурой
const keyboard = bot.keyboard
  .callback("Кнопка 1", "btn1")
  .callback("Кнопка 2", "btn2")
  .build();

bot.sendMessage({
  text: "Выберите:",
  chatId: "CHAT_ID",
  keyboard,
});
```

### Отправка медиафайлов

```javascript
// Фото
const photo = bot.photo
  .url("https://example.com/photo.jpg")
  .caption("Красивое фото!")
  .build();

bot.sendMessage({
  text: photo.caption,
  chatId: "CHAT_ID",
  photo: photo.photo,
});

// Видео
const video = bot.video
  .url("https://example.com/video.mp4")
  .caption("Интересное видео")
  .build();

bot.sendMessage({
  text: video.caption,
  chatId: "CHAT_ID",
  video: video.video,
});

// Аудио
bot.sendMessage({
  text: "Музыка",
  chatId: "CHAT_ID",
  audio: "https://example.com/audio.mp3",
  title: "Название песни",
  performer: "Исполнитель",
});

// Файл
bot.sendMessage({
  text: "Документ",
  chatId: "CHAT_ID",
  file: "https://example.com/document.pdf",
});

// Местоположение
bot.sendMessage({
  text: "Местоположение",
  chatId: "CHAT_ID",
  latitude: 55.7558,
  longitude: 37.6176,
  title: "Москва",
  address: "Красная площадь",
});

// Контакт
bot.sendMessage({
  text: "Контакт",
  chatId: "CHAT_ID",
  phone_number: "+79001234567",
  first_name: "Иван",
  last_name: "Иванов",
});
```

## 🌐 Вебхуки

### Настройка веб-приложения

1. Создайте функцию `doPost`:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    myBot.handleWebhook(data);
    return ContentService.createTextOutput("OK");
  } catch (error) {
    console.error("Ошибка обработки вебхука:", error);
    return ContentService.createTextOutput("ERROR");
  }
}
```

2. Опубликуйте как веб-приложение
3. Установите вебхук:

```javascript
const webhookUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
bot.setWebhook(webhookUrl);
```

### Обработка событий

```javascript
class MyBot extends Bot {
  onMessage(message) {
    // Обработка входящих сообщений
  }

  onCallback(callback) {
    // Обработка нажатий кнопок
  }

  onChatMember(chatMember) {
    // Обработка изменений участников чата
  }

  onMessageEdited(messageEdited) {
    // Обработка редактирования сообщений
  }

  onMessageDeleted(messageDeleted) {
    // Обработка удаления сообщений
  }

  onBotAdded(botAdded) {
    // Обработка добавления бота в чат
  }

  onBotRemoved(botRemoved) {
    // Обработка удаления бота из чата
  }
}
```

### Автоматическое выполнение

```javascript
// Установка триггера на каждые 5 минут
function createTrigger() {
  ScriptApp.newTrigger("checkUpdates").timeBased().everyMinutes(5).create();
}

// Проверка обновлений
function checkUpdates() {
  const updates = myBot.getUpdates();
  updates.forEach((update) => {
    myBot.handleUpdate(update);
  });
}
```

## ❌ Обработка ошибок

### Типы ошибок

```javascript
try {
  const result = bot.sendMessage({
    text: "Тест",
    chatId: "invalid_chat_id",
  });
} catch (error) {
  if (error instanceof MaxError) {
    console.error(`MAX API ошибка: ${error.code} - ${error.message}`);
  } else {
    console.error(`Общая ошибка: ${error.message}`);
  }
}
```

### MaxError

Основной класс для обработки ошибок API MAX:

- `status` - HTTP статус код
- `code` - Код ошибки от API
- `description` - Описание ошибки
- `response` - Полный ответ с ошибкой

### HTTP_CODES

Константы HTTP кодов ответов:

- `200` - Успешная операция
- `400` - Недействительный запрос
- `401` - Ошибка аутентификации
- `404` - Ресурс не найден
- `405` - Метод не допускается
- `429` - Превышено количество запросов
- `503` - Сервис недоступен

### Повторные попытки

```javascript
async function sendMessageWithRetry(bot, options, maxRetries = 3) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const result = bot.sendMessage(options);
      return result;
    } catch (error) {
      retryCount++;
      if (retryCount >= maxRetries) {
        throw error;
      }

      // Ждем перед повторной попыткой
      await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
    }
  }
}
```

## 🔧 Утилиты

### URLParams

Класс для работы с параметрами URL:

- `append(key, value)` - Добавить параметр
- `toString()` - Получить строку параметров
- `has(key)` - Проверить наличие параметра
- `get(key)` - Получить значение параметра
- `delete(key)` - Удалить параметр
- `clear()` - Очистить все параметры

### Функции утилит

- `createURLParams()` - Создать объект URLParams
- `toUnixTimestamp(date)` - Форматировать дату в Unix timestamp
- `isValidId(value)` - Проверить валидность ID
- `isValidNumber(value, min, max)` - Проверить валидность числа
- `isValidArray(value)` - Проверить валидность массива
- `safeAssign(...objects)` - Безопасное объединение объектов

## 📖 Документация

### Поддерживаемые форматы

- **Markdown**: `format: 'markdown'`
- **HTML**: `format: 'html'`

### Типы кнопок

- `callback` - Callback кнопка
- `link` - Ссылка
- `request_contact` - Запрос контакта
- `request_geo_location` - Запрос геолокации
- `open_app` - Открытие приложения
- `message` - Отправка сообщения

### Ограничения Apps Script

1. **Квоты выполнения**: 6 часов в день
2. **Время выполнения**: максимум 6 минут на запрос
3. **HTTP запросы**: максимум 20,000 в день
4. **Размер кода**: максимум 50 МБ

### Отладка

1. Откройте редактор Apps Script
2. Перейдите в "Выполнения"
3. Выберите функцию и нажмите "Просмотр выполнения"
4. Проверьте логи в консоли

## 📄 Лицензия

MIT License - см. файл [LICENSE](src/LICENSE) для подробностей.

## 🆘 Поддержка

Если у вас есть вопросы или проблемы:

1. Проверьте логи выполнения в Apps Script
2. Убедитесь, что токен правильный
3. Проверьте настройки веб-приложения
4. Обратитесь к документации API MAX: https://dev.max.ru/docs-api

---

**Примечание**: Этот проект не является официальным и не связан с MAX. Используйте на свой страх и риск.
