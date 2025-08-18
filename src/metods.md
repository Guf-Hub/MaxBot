# 📚 Методы и билдеры MaxBot

Полная документация всех доступных методов, билдеров и утилит библиотеки MaxBot.

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

### 🏭 Фабричные методы

- `init(accessToken, webhookUrl)` - Создание экземпляра бота
- `createBot(accessToken, BotClass, webhookUrl)` - Создание экземпляра кастомного бота с копированием методов базового класса
- `withCustomHandlers(bot, handlers)` - Добавление кастомных обработчиков к боту (Mixin паттерн)

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
- `support(description)` - Команда /support
- `feedback(description)` - Команда /feedback
- `language(description)` - Команда /language
- `notifications(description)` - Команда /notifications
- `clear()` - Очистить все команды
- `build()` - Создать массив команд
- `buildDefault()` - Стандартный набор команд
- `buildMinimal()` - Минимальный набор команд

## ❌ Обработка ошибок

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

## 📖 Дополнительная информация

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

---

**Примечание**: Для получения подробной информации о каждом методе обратитесь к исходному коду библиотеки или примерам использования.
