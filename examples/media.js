/**
 * Примеры использования билдеров медиафайлов MaxBot
 */

// Создание экземпляра бота
// const bot = MaxBot.init("YOUR_ACCESS_TOKEN");
const bot = new Bot("YOUR_ACCESS_TOKEN");

/**
 * Пример 1: Отправка фото с подписью
 */
function example1() {
  const photo = bot.photo
    .url("https://example.com/photo.jpg")
    .caption("Красивое фото!")
    .format("markdown")
    .build();

  bot.sendMessage({
    text: photo.caption,
    chatId: "CHAT_ID",
    photo: photo.photo,
    format: photo.format,
  });
}

/**
 * Пример 2: Отправка видео с клавиатурой
 */
function example2() {
  const keyboard = bot.keyboard
    .callback("👍 Нравится", "like")
    .callback("👎 Не нравится", "dislike")
    .build();

  const video = bot.video
    .url("https://example.com/video.mp4")
    .caption("Интересное видео")
    .keyboard(keyboard)
    .build();

  bot.sendMessage({
    text: video.caption,
    chatId: "CHAT_ID",
    video: video.video,
    keyboard: video.keyboard,
  });
}

/**
 * Пример 3: Отправка аудио с метаданными
 */
function example3() {
  const audio = bot.audio
    .url("https://example.com/song.mp3")
    .title("Название песни")
    .performer("Исполнитель")
    .caption("Отличная песня!")
    .build();

  bot.sendMessage({
    text: audio.caption,
    chatId: "CHAT_ID",
    audio: audio.audio,
    title: audio.title,
    performer: audio.performer,
  });
}

/**
 * Пример 4: Отправка файла
 */
function example4() {
  const file = bot.file
    .url("https://example.com/document.pdf")
    .caption("Важный документ")
    .build();

  bot.sendMessage({
    text: file.caption,
    chatId: "CHAT_ID",
    file: file.file,
  });
}

/**
 * Пример 5: Отправка местоположения
 */
function example5() {
  const location = bot.location
    .coordinates(55.7558, 37.6176)
    .title("Красная площадь")
    .address("Москва, Россия")
    .build();

  bot.sendMessage({
    text: "Местоположение",
    chatId: "CHAT_ID",
    latitude: location.latitude,
    longitude: location.longitude,
    title: location.title,
    address: location.address,
  });
}

/**
 * Пример 6: Отправка контакта
 */
function example6() {
  const contact = bot.contact
    .phone("+79001234567")
    .firstName("Иван")
    .lastName("Иванов")
    .build();

  bot.sendMessage({
    text: "Контакт",
    chatId: "CHAT_ID",
    phone_number: contact.phone_number,
    first_name: contact.first_name,
    last_name: contact.last_name,
  });
}

/**
 * Пример 7: Отправка фото с ответом на сообщение
 */
function example7() {
  const photo = bot.photo
    .url("https://example.com/photo.jpg")
    .caption("Ответ на ваше сообщение")
    .replyTo("MESSAGE_ID")
    .build();

  bot.sendMessage({
    text: photo.caption,
    chatId: "CHAT_ID",
    photo: photo.photo,
    reply_to_message_id: photo.reply_to_message_id,
  });
}

/**
 * Пример 8: Отправка видео с форматированной подписью
 */
function example8() {
  const video = bot.video
    .url("https://example.com/video.mp4")
    .caption("**Жирный текст** и *курсив*")
    .format("markdown")
    .build();

  bot.sendMessage({
    text: video.caption,
    chatId: "CHAT_ID",
    video: video.video,
    format: video.format,
  });
}

/**
 * Пример 9: Отправка аудио с клавиатурой
 */
function example9() {
  const keyboard = bot.keyboard
    .callback("🎵 Добавить в плейлист", "add_to_playlist")
    .callback("📱 Поделиться", "share")
    .build();

  const audio = bot.audio
    .url("https://example.com/song.mp3")
    .title("Название песни")
    .performer("Исполнитель")
    .keyboard(keyboard)
    .build();

  bot.sendMessage({
    text: audio.caption,
    chatId: "CHAT_ID",
    audio: audio.audio,
    title: audio.title,
    performer: audio.performer,
    keyboard: audio.keyboard,
  });
}

/**
 * Пример 10: Отправка файла с HTML форматированием
 */
function example10() {
  const file = bot.file
    .url("https://example.com/report.html")
    .caption("<b>Важный отчет</b> за <i>сегодня</i>")
    .format("html")
    .build();

  bot.sendMessage({
    text: file.caption,
    chatId: "CHAT_ID",
    file: file.file,
    format: file.format,
  });
}

/**
 * Пример 11: Отправка местоположения с клавиатурой
 */
function example11() {
  const keyboard = bot.keyboard
    .callback("📍 Построить маршрут", "build_route")
    .callback("🚗 Вызвать такси", "call_taxi")
    .build();

  const location = bot.location
    .coordinates(55.7558, 37.6176)
    .title("Красная площадь")
    .keyboard(keyboard)
    .build();

  bot.sendMessage({
    text: "Местоположение",
    chatId: "CHAT_ID",
    latitude: location.latitude,
    longitude: location.longitude,
    title: location.title,
    keyboard: location.keyboard,
  });
}

/**
 * Пример 12: Отправка контакта с дополнительной информацией
 */
function example12() {
  const contact = bot.contact
    .phone("+79001234567")
    .firstName("Иван")
    .lastName("Иванов")
    .userId("user123")
    .build();

  bot.sendMessage({
    text: "Контакт",
    chatId: "CHAT_ID",
    phone_number: contact.phone_number,
    first_name: contact.first_name,
    last_name: contact.last_name,
    user_id: contact.user_id,
  });
}

/**
 * Пример 13: Комплексная отправка медиафайлов
 */
function example13() {
  // Отправляем фото
  const photo = bot.photo
    .url("https://example.com/photo.jpg")
    .caption("Наше фото")
    .build();

  bot.sendMessage({
    text: photo.caption,
    chatId: "CHAT_ID",
    photo: photo.photo,
  });

  // Отправляем видео
  const video = bot.video
    .url("https://example.com/video.mp4")
    .caption("Наше видео")
    .build();

  bot.sendMessage({
    text: video.caption,
    chatId: "CHAT_ID",
    video: video.video,
  });

  // Отправляем аудио
  const audio = bot.audio
    .url("https://example.com/audio.mp3")
    .title("Наша песня")
    .performer("Наш исполнитель")
    .build();

  bot.sendMessage({
    text: audio.caption,
    chatId: "CHAT_ID",
    audio: audio.audio,
    title: audio.title,
    performer: audio.performer,
  });
}

/**
 * Пример 14: Отправка с обработкой ошибок
 */
function example14() {
  try {
    const photo = bot.photo
      .url("https://example.com/photo.jpg")
      .caption("Фото с обработкой ошибок")
      .build();

    bot.sendMessage({
      text: photo.caption,
      chatId: "CHAT_ID",
      photo: photo.photo,
    });
  } catch (error) {
    console.error("Ошибка при отправке фото:", error);
    // Отправляем текстовое сообщение об ошибке
    bot.sendMessage({
      text: "Не удалось отправить фото: " + error.message,
      chatId: "CHAT_ID",
    });
  }
}

/**
 * Пример 15: Динамическое создание медиафайлов
 */
function createMediaMessage(type, url, caption) {
  switch (type) {
    case "photo":
      return bot.photo.url(url).caption(caption).build();
    case "video":
      return bot.video.url(url).caption(caption).build();
    case "audio":
      return bot.audio.url(url).caption(caption).build();
    case "file":
      return bot.file.url(url).caption(caption).build();
    default:
      throw new Error(`Неизвестный тип медиафайла: ${type}`);
  }
}

function example15() {
  const mediaConfigs = [
    { type: "photo", url: "https://example.com/photo1.jpg", caption: "Фото 1" },
    {
      type: "video",
      url: "https://example.com/video1.mp4",
      caption: "Видео 1",
    },
    {
      type: "audio",
      url: "https://example.com/audio1.mp3",
      caption: "Аудио 1",
    },
  ];

  mediaConfigs.forEach((config) => {
    const media = createMediaMessage(config.type, config.url, config.caption);

    const messageOptions = {
      text: media.caption,
      chatId: "CHAT_ID",
    };

    switch (config.type) {
      case "photo":
        messageOptions.photo = media.photo;
        break;
      case "video":
        messageOptions.video = media.video;
        break;
      case "audio":
        messageOptions.audio = media.audio;
        break;
    }

    bot.sendMessage(messageOptions);
  });
}
