/**
 * Примеры использования билдера клавиатур MaxBot
 */

// Создание экземпляра бота
const bot = new Bot("YOUR_ACCESS_TOKEN");

/**
 * Пример 1: Простая клавиатура с двумя кнопками
 */
function example1() {
  const keyboard = bot.keyboard
    .callback("Кнопка 1", "btn1")
    .callback("Кнопка 2", "btn2")
    .build();

  bot.sendMessage({ text: "Выберите действие:", chatId: "CHAT_ID", keyboard });
}

/**
 * Пример 2: Клавиатура с несколькими строками
 */
function example2() {
  const keyboard = bot.keyboard
    .callback("Кнопка 1", "btn1")
    .callback("Кнопка 2", "btn2")
    .row()
    .callback("Кнопка 3", "btn3")
    .callback("Кнопка 4", "btn4")
    .row()
    .callback("Кнопка 5", "btn5")
    .build();

  bot.sendMessage({ text: "Многострочная клавиатура:", chatId: "CHAT_ID", keyboard });
}

/**
 * Пример 3: Клавиатура с разными типами кнопок
 */
function example3() {
  const keyboard = bot.keyboard
    .callback("Callback кнопка", "callback_data")
    .link("Ссылка", "https://dev.max.ru")
    .row()
    .contact("Поделиться контактом")
    .location("Поделиться местоположением")
    .row()
    .app("Открыть приложение", "app_id_123")
    .message("Отправить сообщение")
    .build();

  bot.sendMessage({
    text: "Клавиатура с разными типами кнопок:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 4: Клавиатура для меню
 */
function example4() {
  const keyboard = bot.keyboard
    .callback("📊 Статистика", "stats")
    .callback("⚙️ Настройки", "settings")
    .row()
    .callback("📝 Помощь", "help")
    .callback("❌ Закрыть", "close")
    .build();

  bot.sendMessage({ text: "Главное меню:", chatId: "CHAT_ID", keyboard });
}

/**
 * Пример 5: Клавиатура для выбора языка
 */
function example5() {
  const keyboard = bot.keyboard
    .callback("🇷🇺 Русский", "lang_ru")
    .callback("🇺🇸 English", "lang_en")
    .row()
    .callback("🇪🇸 Español", "lang_es")
    .callback("🇩🇪 Deutsch", "lang_de")
    .build();

  bot.sendMessage({
    text: "Выберите язык / Choose language:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 6: Клавиатура для игры (камень-ножницы-бумага)
 */
function example6() {
  const keyboard = bot.keyboard
    .callback("✊ Камень", "game_rock")
    .callback("✌️ Ножницы", "game_scissors")
    .callback("✋ Бумага", "game_paper")
    .row()
    .callback("🔄 Новая игра", "game_new")
    .callback("📊 Статистика", "game_stats")
    .build();

  bot.sendMessage({
    text: "Камень, ножницы, бумага!",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 7: Клавиатура для заказа
 */
function example7() {
  const keyboard = bot.keyboard
    .callback("🍕 Пицца", "order_pizza")
    .callback("🍔 Бургер", "order_burger")
    .row()
    .callback("🍜 Суши", "order_sushi")
    .callback("🥗 Салат", "order_salad")
    .row()
    .callback("📞 Позвонить", "order_call")
    .link("🌐 Сайт", "https://restaurant.com")
    .build();

  bot.sendMessage({
    text: "Что хотите заказать?",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 8: Клавиатура с форматированием
 */
function example8() {
  const keyboard = bot.keyboard
    .callback("**Жирный**", "format_bold")
    .callback("_Курсив_", "format_italic")
    .row()
    .callback("~~Зачеркнутый~~", "format_strike")
    .callback("`Код`", "format_code")
    .build();

  bot.sendMessage({
    text: "Выберите формат:",
    chatId: "CHAT_ID",
    keyboard,
    format: "markdown",
  });
}

/**
 * Пример 9: Динамическая клавиатура
 */
function createDynamicKeyboard(items) {
  const keyboard = bot.keyboard;

  items.forEach((item, index) => {
    keyboard.callback(item.name, `item_${item.id}`);

    // Переходим на новую строку каждые 2 кнопки
    if ((index + 1) % 2 === 0) {
      keyboard.row();
    }
  });

  // Добавляем кнопки управления
  keyboard
    .row()
    .callback("⬅️ Назад", "back")
    .callback("➡️ Далее", "next")
    .row()
    .callback("🏠 Главная", "home");

  return keyboard.build();
}

function example9() {
  const items = [
    { id: 1, name: "Товар 1" },
    { id: 2, name: "Товар 2" },
    { id: 3, name: "Товар 3" },
    { id: 4, name: "Товар 4" },
  ];

  const keyboard = createDynamicKeyboard(items);
  bot.sendMessage({
    text: "Выберите товар:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 10: Клавиатура с очисткой и переиспользованием
 */
function example10() {
  // Создаем первую клавиатуру
  const keyboard1 = bot.keyboard
    .callback("Кнопка 1", "btn1")
    .callback("Кнопка 2", "btn2")
    .build();

  bot.sendMessage({
    text: "Первая клавиатура:",
    chatId: "CHAT_ID",
    keyboard: keyboard1,
  });

  // Очищаем и создаем вторую клавиатуру
  const keyboard2 = bot.keyboard
    .clear()
    .callback("Новая кнопка 1", "new_btn1")
    .callback("Новая кнопка 2", "new_btn2")
    .callback("Новая кнопка 3", "new_btn3")
    .build();

  bot.sendMessage({
    text: "Вторая клавиатура:",
    chatId: "CHAT_ID",
    keyboard: keyboard2,
  });
}

/**
 * Пример 11: Клавиатура для опроса
 */
function example11() {
  const keyboard = bot.keyboard
    .callback("👍 Отлично", "rating_5")
    .callback("😊 Хорошо", "rating_4")
    .callback("😐 Нормально", "rating_3")
    .row()
    .callback("😕 Плохо", "rating_2")
    .callback("👎 Ужасно", "rating_1")
    .row()
    .callback("❌ Пропустить", "rating_skip")
    .build();

  bot.sendMessage({
    text: "Как вам наш сервис?",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 12: Клавиатура для календаря
 */
function example12() {
  const keyboard = bot.keyboard
    .callback("📅 Сегодня", "date_today")
    .callback("📅 Завтра", "date_tomorrow")
    .row()
    .callback("📅 Эта неделя", "date_week")
    .callback("📅 Этот месяц", "date_month")
    .row()
    .callback("📅 Выбрать дату", "date_custom")
    .build();

  bot.sendMessage({
    text: "Выберите дату:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 13: Клавиатура для навигации
 */
function example13() {
  const keyboard = bot.keyboard
    .callback("⬆️ Вверх", "nav_up")
    .callback("⬇️ Вниз", "nav_down")
    .row()
    .callback("⬅️ Влево", "nav_left")
    .callback("➡️ Вправо", "nav_right")
    .row()
    .callback("🎯 Выбрать", "nav_select")
    .callback("🔙 Назад", "nav_back")
    .build();

  bot.sendMessage({
    text: "Навигация:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 14: Клавиатура для настроек
 */
function example14() {
  const keyboard = bot.keyboard
    .callback("🔔 Уведомления", "settings_notifications")
    .callback("🌍 Язык", "settings_language")
    .row()
    .callback("🔒 Приватность", "settings_privacy")
    .callback("🎨 Тема", "settings_theme")
    .row()
    .callback("📱 Устройства", "settings_devices")
    .callback("💳 Платежи", "settings_payments")
    .row()
    .callback("❌ Отмена", "settings_cancel")
    .callback("✅ Сохранить", "settings_save")
    .build();

  bot.sendMessage({
    text: "Настройки:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 15: Клавиатура для чата
 */
function example15() {
  const keyboard = bot.keyboard
    .callback("📷 Фото", "chat_photo")
    .callback("📹 Видео", "chat_video")
    .callback("📁 Файл", "chat_file")
    .row()
    .callback("📍 Местоположение", "chat_location")
    .callback("📞 Контакт", "chat_contact")
    .row()
    .callback("🎵 Голосовое", "chat_voice")
    .callback("📝 Заметка", "chat_note")
    .build();

  bot.sendMessage({
    text: "Выберите тип сообщения:",
    chatId: "CHAT_ID",
    keyboard,
  });
}

/**
 * Пример 16: Создание клавиатуры через билдер
 */
function example16() {
  // Клавиатура с payload (стандартная для MAX API)
  const keyboard = bot.keyboard
    .callback("Кнопка 1", "btn1")
    .callback("Кнопка 2", "btn2")
    .build();

  console.log("Клавиатура:", keyboard);
  // Результат:
  // {
  //   type: "inline_keyboard",
  //   payload: {
  //     buttons: [
  //       [{ type: "callback", text: "Кнопка 1", payload: "btn1" }],
  //       [{ type: "callback", text: "Кнопка 2", payload: "btn2" }]
  //     ]
  //   }
  // }

  // Отправляем клавиатуру
  bot.sendMessage({
    text: "Выберите действие:",
    chatId: "CHAT_ID",
    keyboard,
  });
}
