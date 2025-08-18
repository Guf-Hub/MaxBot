/**
 * Типы и интерфейсы для MAX Bot API
 * Основано на официальной документации: https://dev.max.ru/docs-api
 */

/**
 * @typedef {Object} BotInfo
 * @property {number} user_id - ID пользователя
 * @property {string} first_name - Отображаемое имя пользователя
 * @property {string} [last_name] - Отображаемая фамилия пользователя
 * @property {string} [name] - Устаревшее поле, скоро будет удалено
 * @property {string} [username] - Уникальное публичное имя пользователя
 * @property {boolean} is_bot - true, если пользователь является ботом
 * @property {number} last_activity_time - Время последней активности
 * @property {string} [description] - Описание пользователя (до 16000 символов)
 * @property {string} [avatar_url] - URL аватара
 * @property {string} [full_avatar_url] - URL аватара большего размера
 * @property {Array<BotCommand>} [commands] - Команды, поддерживаемые ботом (до 32 элементов)
 */

/**
 * @typedef {Object} BotCommand
 * @property {string} name - Название команды (например, "start")
 * @property {string} description - Описание команды
 */

/**
 * @typedef {Object} BotPatch
 * @property {string} [first_name] - Отображаемое имя бота
 * @property {string} [last_name] - Отображаемое второе имя бота
 * @property {string} [name] - Устаревшее поле, используйте first_name
 * @property {string} [description] - Описание бота
 * @property {Array<BotCommand>} [commands] - Команды бота
 * @property {PhotoAttachmentRequestPayload} [photo] - Запрос на установку фото бота
 */

/**
 * @typedef {Object} User
 * @property {number} user_id - ID пользователя
 * @property {string} first_name - Отображаемое имя пользователя
 * @property {string} [last_name] - Отображаемая фамилия пользователя
 * @property {string} [name] - Устаревшее поле, скоро будет удалено
 * @property {string} [username] - Уникальное публичное имя пользователя
 * @property {boolean} is_bot - true, если пользователь является ботом
 * @property {number} last_activity_time - Время последней активности (Unix-время в миллисекундах)
 */

/**
 * @typedef {Object} Chat
 * @property {number} chat_id - ID чата
 * @property {string} type - Тип чата ("chat" - групповой чат)
 * @property {string} status - Статус чата ("active", "removed", "left", "closed")
 * @property {string} [title] - Отображаемое название чата (может быть null для диалогов)
 * @property {Image} [icon] - Иконка чата
 * @property {number} last_event_time - Время последнего события в чате
 * @property {number} participants_count - Количество участников чата (для диалогов всегда 2)
 * @property {number} [owner_id] - ID владельца чата
 * @property {Object} [participants] - Участники чата с временем последней активности
 * @property {boolean} is_public - Доступен ли чат публично (для диалогов всегда false)
 * @property {string} [link] - Ссылка на чат
 * @property {string} [description] - Описание чата
 * @property {UserWithPhoto} [dialog_with_user] - Данные о пользователе в диалоге (только для чатов типа "dialog")
 * @property {string} [chat_message_id] - ID сообщения, содержащего кнопку, через которую был инициирован чат
 * @property {Message} [pinned_message] - Закреплённое сообщение в чате (возвращается только при запросе конкретного чата)
 */

/**
 * @typedef {Object} ChatType
 * @property {string} type - Тип чата: "chat"
 */

/**
 * @typedef {Object} ChatStatus
 * @property {string} status - Статус чата: "active", "removed", "left", "closed"
 */

/**
 * @typedef {Object} ChatList
 * @property {Array<Chat>} chats - Список запрашиваемых чатов
 * @property {number} [marker] - Указатель на следующую страницу запрашиваемых чатов
 */

/**
 * @typedef {Object} ChatPatch
 * @property {PhotoAttachmentRequestPayload} [icon] - Иконка чата
 * @property {string} [title] - Название чата
 * @property {string} [pin] - ID сообщения для закрепления в чате
 * @property {boolean} [notify] - Если true, участники получат системное уведомление об изменении
 */

/**
 * @typedef {Object} Image
 * @property {string} url - URL изображения
 */

/**
 * @typedef {Object} UserWithPhoto
 * @property {number} user_id - ID пользователя
 * @property {string} first_name - Отображаемое имя пользователя
 * @property {string} [last_name] - Отображаемая фамилия пользователя
 * @property {string} [name] - Устаревшее поле, скоро будет удалено
 * @property {string} [username] - Уникальное публичное имя пользователя
 * @property {boolean} is_bot - true, если пользователь является ботом
 * @property {number} last_activity_time - Время последней активности
 * @property {string} [description] - Описание пользователя (до 16000 символов)
 * @property {string} [avatar_url] - URL аватара
 * @property {string} [full_avatar_url] - URL аватара большего размера
 */

/**
 * @typedef {Object} Message
 * @property {User} [sender] - Пользователь, отправивший сообщение
 * @property {Recipient} recipient - Получатель сообщения (пользователь или чат)
 * @property {number} timestamp - Время создания сообщения в формате Unix-time
 * @property {LinkedMessage} [link] - Пересланное или ответное сообщение
 * @property {MessageBody} body - Содержимое сообщения (текст + вложения). Может быть null, если сообщение содержит только пересланное сообщение
 * @property {MessageStat} [stat] - Статистика сообщения
 * @property {string} [url] - Публичная ссылка на сообщение. Может быть null для диалогов или не публичных чатов
 */

/**
 * @typedef {Object} Recipient
 * @property {string} type - Тип получателя ("user" или "chat")
 * @property {User|Chat} data - Данные получателя
 */

/**
 * @typedef {Object} LinkedMessage
 * @property {string} type - Тип связи ("forward" или "reply")
 * @property {Message} message - Связанное сообщение
 */

/**
 * @typedef {Object} MessageBody
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {Array<Attachment>} [attachments] - Вложения
 */

/**
 * @typedef {Object} MessageStat
 * @property {number} views - Количество просмотров
 * @property {number} reactions - Количество реакций
 */

/**
 * @typedef {Object} NewMessageBody
 * @property {string} [text] - Новый текст сообщения (до 4000 символов)
 * @property {Array<AttachmentRequest>} [attachments] - Вложения сообщения. Если пусто, все вложения будут удалены
 * @property {NewMessageLink} [link] - Ссылка на сообщение
 * @property {boolean} [notify] - Если false, участники чата не будут уведомлены (по умолчанию true)
 * @property {string} [format] - Формат текста ("markdown" или "html")
 */

/**
 * @typedef {Object} NewMessageLink
 * @property {string} type - Тип ссылки на сообщение
 * @property {string} message_id - ID сообщения
 */

/**
 * @typedef {Object} AttachmentRequest
 * @property {string} type - Тип вложения
 * @property {Object} payload - Данные вложения
 */

/**
 * @typedef {Object} VideoAttachmentRequest
 * @property {string} type - "video"
 * @property {UploadedInfo} payload
 */

/**
 * @typedef {Object} AudioAttachmentRequest
 * @property {string} type - "audio"
 * @property {UploadedInfo} payload
 */

/**
 * @typedef {Object} FileAttachmentRequest
 * @property {string} type - "file"
 * @property {UploadedInfo} payload
 */

/**
 * @typedef {Object} UploadedInfo
 * @property {string} token - Токен — уникальный ID загруженного медиафайла
 */

/**
 * @typedef {Object} ContactAttachmentRequest
 * @property {string} type - "contact"
 * @property {ContactAttachmentRequestPayload} payload
 */

/**
 * @typedef {Object} ContactAttachmentRequestPayload
 * @property {string} [name] - Имя контакта
 * @property {number} [contact_id] - ID контакта, если он зарегистрирован в MAX
 * @property {string} [vcf_info] - Полная информация о контакте в формате VCF
 * @property {string} [vcf_phone] - Телефон контакта в формате VCF
 */

/**
 * @typedef {Object} InlineKeyboardAttachmentRequest
 * @property {string} type - "inline_keyboard"
 * @property {InlineKeyboardAttachmentRequestPayload} payload
 */

/**
 * @typedef {Object} InlineKeyboardAttachmentRequestPayload
 * @property {Array<Array<Button>>} buttons - Двумерный массив кнопок
 */

/**
 * @typedef {Object} ReplyKeyboardAttachmentRequest
 * @property {string} type - "reply_keyboard"
 * @property {boolean} [direct] - Применимо только для чатов
 * @property {number} [direct_user_id] - ID пользователя для показа клавиатуры
 * @property {Array<Array<ReplyButton>>} buttons - Двумерный массив кнопок
 */

/**
 * @typedef {Object} LocationAttachmentRequest
 * @property {string} type - "location"
 * @property {number} latitude - Широта
 * @property {number} longitude - Долгота
 */

/**
 * @typedef {Object} ShareAttachmentRequest
 * @property {string} type - "share"
 * @property {ShareAttachmentPayload} payload
 */

/**
 * @typedef {Object} ShareAttachmentPayload
 * @property {string} [url] - URL, прикрепленный к сообщению в качестве предпросмотра медиа
 * @property {string} [token] - Токен вложения
 */

/**
 * @typedef {Object} ShareAttachment
 * @property {string} type - "share"
 * @property {ShareAttachmentPayload} payload
 * @property {string} [title] - Заголовок предпросмотра ссылки
 * @property {string} [description] - Описание предпросмотра ссылки
 * @property {string} [image_url] - Изображение предпросмотра ссылки
 */

/**
 * @typedef {Object} PhotoMessage
 * @property {string} id - ID сообщения
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {PhotoAttachment} photo - Фото вложение
 * @property {Array<Attachment>} [attachments] - Дополнительные вложения
 * @property {Message} [reply_to] - Ответ на сообщение
 * @property {number} timestamp - Временная метка
 * @property {boolean} is_edited - Отредактировано ли сообщение
 * @property {boolean} is_deleted - Удалено ли сообщение
 */

/**
 * @typedef {Object} VideoMessage
 * @property {string} id - ID сообщения
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {VideoAttachment} video - Видео вложение
 * @property {Array<Attachment>} [attachments] - Дополнительные вложения
 * @property {Message} [reply_to] - Ответ на сообщение
 * @property {number} timestamp - Временная метка
 * @property {boolean} is_edited - Отредактировано ли сообщение
 * @property {boolean} is_deleted - Удалено ли сообщение
 */

/**
 * @typedef {Object} AudioMessage
 * @property {string} id - ID сообщения
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {AudioAttachment} audio - Аудио вложение
 * @property {Array<Attachment>} [attachments] - Дополнительные вложения
 * @property {Message} [reply_to] - Ответ на сообщение
 * @property {number} timestamp - Временная метка
 * @property {boolean} is_edited - Отредактировано ли сообщение
 * @property {boolean} is_deleted - Удалено ли сообщение
 */

/**
 * @typedef {Object} FileMessage
 * @property {string} id - ID сообщения
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {FileAttachment} file - Файл вложение
 * @property {Array<Attachment>} [attachments] - Дополнительные вложения
 * @property {Message} [reply_to] - Ответ на сообщение
 * @property {number} timestamp - Временная метка
 * @property {boolean} is_edited - Отредактировано ли сообщение
 * @property {boolean} is_deleted - Удалено ли сообщение
 */

/**
 * @typedef {Object} LocationMessage
 * @property {string} id - ID сообщения
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {LocationAttachment} location - Местоположение
 * @property {Array<Attachment>} [attachments] - Дополнительные вложения
 * @property {Message} [reply_to] - Ответ на сообщение
 * @property {number} timestamp - Временная метка
 * @property {boolean} is_edited - Отредактировано ли сообщение
 * @property {boolean} is_deleted - Удалено ли сообщение
 */

/**
 * @typedef {Object} ContactMessage
 * @property {string} id - ID сообщения
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} [text] - Текст сообщения
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {ContactAttachment} contact - Контакт
 * @property {Array<Attachment>} [attachments] - Дополнительные вложения
 * @property {Message} [reply_to] - Ответ на сообщение
 * @property {number} timestamp - Временная метка
 * @property {boolean} is_edited - Отредактировано ли сообщение
 * @property {boolean} is_deleted - Удалено ли сообщение
 */

/**
 * @typedef {Object} Attachment
 * @property {string} type - Тип вложения
 * @property {Object} payload - Данные вложения
 */

/**
 * @typedef {Object} PhotoAttachment
 * @property {string} type - "photo"
 * @property {PhotoAttachmentPayload} payload
 */

/**
 * @typedef {Object} PhotoAttachmentPayload
 * @property {number} photo_id - Уникальный ID этого изображения
 * @property {string} token - Токен изображения
 * @property {string} url - URL изображения
 */

/**
 * @typedef {Object} PhotoAttachmentRequestPayload
 * @property {string} [url] - Любой внешний URL изображения
 * @property {string} [token] - Токен существующего вложения
 * @property {Object} [photos] - Токены, полученные после загрузки изображений
 */

/**
 * @typedef {Object} PhotoToken
 * @property {string} token - Закодированная информация загруженного изображения
 */

/**
 * @typedef {Object} PhotoTokens
 * @property {Object} photos - Информация о загруженных изображениях
 */

/**
 * @typedef {Object} VideoAttachment
 * @property {string} type - "video"
 * @property {MediaAttachmentPayload} payload
 * @property {VideoThumbnail} [thumbnail] - Миниатюра видео
 * @property {number} [width] - Ширина видео
 * @property {number} [height] - Высота видео
 * @property {number} [duration] - Длина видео в секундах
 */

/**
 * @typedef {Object} VideoThumbnail
 * @property {string} url - URL изображения
 */

/**
 * @typedef {Object} MediaAttachmentPayload
 * @property {string} url - URL медиа-вложения
 * @property {string} token - Токен для повторного использования вложения
 */

/**
 * @typedef {Object} AudioAttachment
 * @property {string} type - "audio"
 * @property {MediaAttachmentPayload} payload
 * @property {string} [transcription] - Аудио транскрипция
 */

/**
 * @typedef {Object} FileAttachment
 * @property {string} type - "file"
 * @property {FileAttachmentPayload} payload
 * @property {string} filename - Имя загруженного файла
 * @property {number} size - Размер файла в байтах
 */

/**
 * @typedef {Object} FileAttachmentPayload
 * @property {string} url - URL медиа-вложения
 * @property {string} token - Токен для повторного использования вложения
 */

/**
 * @typedef {Object} AttachmentPayload
 * @property {string} url - URL медиа-вложения
 */

/**
 * @typedef {Object} FileAttachment
 * @property {string} type - "file"
 * @property {Object} payload
 * @property {string} payload.file_id - ID файла
 * @property {string} payload.url - URL файла
 * @property {string} payload.filename - Имя файла
 * @property {number} payload.size - Размер в байтах
 * @property {string} payload.mime_type - MIME тип
 */

/**
 * @typedef {Object} LocationAttachment
 * @property {string} type - "location"
 * @property {Object} payload
 * @property {number} payload.latitude - Широта
 * @property {number} payload.longitude - Долгота
 * @property {string} payload.title - Название места
 * @property {string} payload.address - Адрес
 */

/**
 * @typedef {Object} ContactAttachment
 * @property {string} type - "contact"
 * @property {ContactAttachmentPayload} payload
 */

/**
 * @typedef {Object} ContactAttachmentPayload
 * @property {string} [vcf_info] - Информация о пользователе в формате VCF
 * @property {User} [max_info] - Информация о пользователе
 */

/**
 * @typedef {Object} LocationAttachment
 * @property {string} type - "location"
 * @property {number} latitude - Широта
 * @property {number} longitude - Долгота
 */

/**
 * @typedef {Object} InlineKeyboardAttachment
 * @property {string} type - "inline_keyboard"
 * @property {Keyboard} payload
 */

/**
 * @typedef {Object} Keyboard
 * @property {Array<Array<Button>>} buttons - Двумерный массив кнопок
 */

/**
 * @typedef {Object} ReplyKeyboardAttachment
 * @property {string} type - "reply_keyboard"
 * @property {Array<Array<ReplyButton>>} buttons - Двумерный массив кнопок
 */

/**
 * @typedef {Object} Button
 * @property {string} type - Тип кнопки
 * @property {string} text - Видимый текст кнопки (1-128 символов)
 */

/**
 * @typedef {Object} ReplyButton
 * @property {string} text - Видимый текст кнопки (1-128 символов)
 * @property {string} [payload] - Токен кнопки
 */

/**
 * @typedef {Object} CallbackButton
 * @property {string} type - "callback"
 * @property {string} text - Текст кнопки
 * @property {string} payload - Токен кнопки (до 1024 символов)
 * @property {string} [intent] - Намерение кнопки: "positive", "negative", "default"
 */

/**
 * @typedef {Object} Intent
 * @property {string} intent - Намерение кнопки: "positive", "negative", "default"
 */

/**
 * @typedef {Object} LinkButton
 * @property {string} type - "link"
 * @property {string} text - Текст кнопки
 * @property {string} url - URL ссылки (до 2048 символов)
 */

/**
 * @typedef {Object} ChatButton
 * @property {string} type - "chat"
 * @property {string} text - Текст кнопки
 * @property {string} chat_title - Название чата, который будет создан
 * @property {string} [chat_description] - Описание чата
 * @property {string} [start_payload] - Стартовая полезная нагрузка
 * @property {number} [uuid] - Уникальный ID кнопки
 */

/**
 * @typedef {Object} ContactButton
 * @property {string} type - "request_contact"
 * @property {string} text - Текст кнопки
 */

/**
 * @typedef {Object} LocationButton
 * @property {string} type - "request_geo_location"
 * @property {string} text - Текст кнопки
 * @property {boolean} [quick] - Если true, отправляет местоположение без запроса подтверждения
 */

/**
 * @typedef {Object} AppButton
 * @property {string} type - "open_app"
 * @property {string} text - Текст кнопки
 * @property {string} [web_app] - Публичное имя бота или ссылка на мини-приложение
 * @property {number} [contact_id] - Идентификатор бота
 * @property {string} [payload] - Параметр запуска для мини-приложения
 */

/**
 * @typedef {Object} MessageButton
 * @property {string} type - "message"
 * @property {string} text - Текст кнопки, который будет отправлен в чат от лица пользователя
 */

/**
 * @typedef {Object} LocationButton
 * @property {string} type - "request_geo_location"
 * @property {string} text - Текст кнопки
 */

/**
 * @typedef {Object} AppButton
 * @property {string} type - "open_app"
 * @property {string} text - Текст кнопки
 * @property {string} app_id - ID приложения
 */

/**
 * @typedef {Object} MessageButton
 * @property {string} type - "message"
 * @property {string} text - Текст кнопки
 */

/**
 * @typedef {Object} Callback
 * @property {string} id - ID callback
 * @property {string} chat_id - ID чата
 * @property {User} sender - Отправитель
 * @property {string} payload - Данные callback
 * @property {number} timestamp - Временная метка
 */

/**
 * @typedef {Object} ChatMember
 * @property {number} last_access_time - Время последней активности пользователя в чате
 * @property {boolean} is_owner - Является ли пользователь владельцем чата
 * @property {boolean} is_admin - Является ли пользователь администратором чата
 * @property {number} join_time - Дата присоединения к чату в формате Unix time
 * @property {Array<ChatAdminPermission>} [permissions] - Перечень прав пользователя
 * @property {string} [alias] - Заголовок, который будет показан на клиенте
 */

/**
 * @typedef {Object} ChatAdmin
 * @property {number} user_id - Идентификатор администратора с правами доступа
 * @property {Array<ChatAdminPermission>} permissions - Перечень прав пользователя
 * @property {string} [alias] - Заголовок, который будет показан на клиенте
 */

/**
 * @typedef {Object} ChatAdminPermission
 * @property {string} permission - Права администратора: "read_all_messages", "add_remove_members", "add_admins", "change_chat_info", "pin_message", "write", "edit_link"
 */

/**
 * @typedef {Object} ChatMembersList
 * @property {Array<ChatMember>} members - Список участников чата с информацией о времени последней активности
 * @property {number} [marker] - Указатель на следующую страницу данных
 */

/**
 * @typedef {Object} ChatAdminsList
 * @property {Array<ChatAdmin>} admins - Массив администраторов чата
 * @property {number} [marker] - Указатель на следующую страницу данных
 */

/**
 * @typedef {Object} UserIdsList
 * @property {Array<number>} user_ids - Массив ID пользователей для добавления в чат
 */

/**
 * @typedef {Object} ActionRequestBody
 * @property {SenderAction} action - Действие, отправляемое участникам чата
 */

/**
 * @typedef {Object} SenderAction
 * @property {string} action - Действие: "typing_on", "sending_photo", "sending_video", "sending_audio", "sending_file", "mark_seen"
 */

/**
 * @typedef {Object} PinMessageBody
 * @property {string} message_id - ID сообщения, которое нужно закрепить
 * @property {boolean} [notify] - Если true, участники получат уведомление с системным сообщением о закреплении
 */

/**
 * @typedef {Object} GetPinnedMessageResult
 * @property {Message} [message] - Закрепленное сообщение. Может быть null, если в чате нет закрепленного сообщения
 */

/**
 * @typedef {Object} ChatAction
 * @property {string} chat_id - ID чата
 * @property {User} user - Пользователь
 * @property {string} action - Действие (typing, recording_video, etc.)
 * @property {number} timestamp - Временная метка
 */

/**
 * @typedef {Object} Update
 * @property {string} update_type - Тип обновления (message_created, message_edited, message_removed, message_callback, chat_member, chat_action, bot_added, bot_removed, user_added, user_removed, bot_started, chat_title_changed, message_chat_created)
 * @property {number} timestamp - Unix-время, когда произошло событие
 * @property {Message} message - Новое созданное сообщение
 * @property {string} [user_locale] - Текущий язык пользователя в формате IETF BCP 47 (доступно только в диалогах)
 */

/**
 * @typedef {Object} SendMessageOptions
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {string} [photo] - URL фото
 * @property {string} [video] - URL видео
 * @property {string} [audio] - URL аудио
 * @property {string} [file] - URL файла
 * @property {number} [latitude] - Широта для местоположения
 * @property {number} [longitude] - Долгота для местоположения
 * @property {string} [title] - Название места или аудио
 * @property {string} [address] - Адрес места
 * @property {string} [phone_number] - Номер телефона для контакта
 * @property {string} [first_name] - Имя для контакта
 * @property {string} [last_name] - Фамилия для контакта
 * @property {string} [performer] - Исполнитель аудио
 * @property {InlineKeyboardAttachment} [keyboard] - Inline клавиатура
 * @property {Array<Attachment>} [attachments] - Вложения
 * @property {string} [reply_to_message_id] - ID сообщения для ответа
 */

/**
 * @typedef {Object} EditMessageOptions
 * @property {string} [format] - Формат текста (plain, markdown, html)
 * @property {InlineKeyboardAttachment} [keyboard] - Inline клавиатура
 * @property {Array<Attachment>} [attachments] - Вложения
 */

/**
 * @typedef {Object} UploadUrl
 * @property {string} url - URL для загрузки файла
 * @property {string} [token] - Видео- или аудио-токен для отправки сообщения
 */

/**
 * @typedef {Object} UploadEndpoint
 * @property {string} url - URL для загрузки файла
 * @property {string} [token] - Видео- или аудио-токен для отправки сообщения
 */

/**
 * @typedef {Object} UploadType
 * @property {string} type - Тип загружаемого файла: "image", "video", "audio", "file"
 */

/**
 * @typedef {Object} MessageList
 * @property {Array<Message>} messages - Массив сообщений
 */

/**
 * @typedef {Object} SendMessageResult
 * @property {Message} message - Созданное сообщение
 */

/**
 * @typedef {Object} VideoAttachmentDetails
 * @property {string} token - Токен видео-вложения
 * @property {VideoUrls} [urls] - URL-ы для скачивания или воспроизведения видео
 * @property {PhotoAttachmentPayload} [thumbnail] - Миниатюра видео
 * @property {number} width - Ширина видео
 * @property {number} height - Высота видео
 * @property {number} duration - Длина видео в секундах
 */

/**
 * @typedef {Object} VideoUrls
 * @property {string} [mp4_1080] - URL видео в разрешении 1080p
 * @property {string} [mp4_720] - URL видео в разрешении 720p
 * @property {string} [mp4_480] - URL видео в разрешении 480p
 * @property {string} [mp4_360] - URL видео в разрешении 360p
 * @property {string} [mp4_240] - URL видео в разрешении 240p
 * @property {string} [mp4_144] - URL видео в разрешении 144p
 * @property {string} [hls] - URL трансляции
 */

/**
 * @typedef {Object} Callback
 * @property {number} timestamp - Unix-время, когда пользователь нажал кнопку
 * @property {string} callback_id - Текущий ID клавиатуры
 * @property {string} payload - Токен кнопки
 * @property {User} user - Пользователь, нажавший на кнопку
 */

/**
 * @typedef {Object} CallbackAnswer
 * @property {NewMessageBody} [message] - Заполните это, если хотите изменить текущее сообщение
 * @property {string} [notification] - Заполните это, если хотите просто отправить одноразовое уведомление пользователю
 */

/**
 * @typedef {Object} UpdateList
 * @property {Array<Update>} updates - Страница обновлений
 * @property {number} [marker] - Указатель на следующую страницу данных
 */

/**
 * @typedef {Object} Subscription
 * @property {string} url - URL вебхука
 * @property {number} time - Unix-время, когда была создана подписка
 * @property {Array<string>} [update_types] - Типы обновлений, на которые подписан бот
 * @property {string} version - Версия API
 */

/**
 * @typedef {Object} SubscriptionRequestBody
 * @property {string} url - URL HTTP(S)-эндпойнта вашего бота
 * @property {Array<string>} [update_types] - Список типов обновлений
 * @property {string} [secret] - Секрет для подписки
 */

/**
 * @typedef {Object} GetSubscriptionsResult
 * @property {Array<Subscription>} subscriptions - Список текущих подписок
 */

/**
 * @typedef {Object} SimpleQueryResult
 * @property {boolean} success - true, если запрос был успешным
 * @property {string} [message] - Объяснительное сообщение, если результат не был успешным
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Успешность запроса
 * @property {Object} [message] - Сообщение
 */

/**
 * @typedef {Function} MessageHandler
 * @param {Message|PhotoMessage|VideoMessage|AudioMessage|FileMessage|LocationMessage|ContactMessage} message - Сообщение
 */

/**
 * @typedef {Function} CallbackHandler
 * @param {Callback} callback - Callback данные
 */

/**
 * @typedef {Function} ChatMemberHandler
 * @param {ChatMember} chatMember - Данные участника чата
 */

/**
 * @typedef {Function} ChatActionHandler
 * @param {ChatAction} chatAction - Действие в чате
 */

// ===== ТИПЫ ДЛЯ ОБРАБОТКИ ОШИБОК =====

/**
 * @typedef {Object} ErrorResponse
 * @property {string} code - Код ошибки
 * @property {string} message - Сообщение об ошибке
 */

/**
 * @typedef {Object} MaxError
 * @property {number} status - HTTP статус код
 * @property {ErrorResponse} response - Ответ с ошибкой от API
 * @property {string} code - Код ошибки (getter)
 * @property {string} description - Описание ошибки (getter)
 */

// Экспорт типов для использования в JSDoc
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    BotInfo,
    BotPatch,
    BotCommand,
    User,
    UserWithPhoto,
    Chat,
    ChatType,
    ChatStatus,
    ChatList,
    ChatPatch,
    ChatMember,
    ChatAdmin,
    ChatAdminPermission,
    ChatMembersList,
    ChatAdminsList,
    UserIdsList,
    ActionRequestBody,
    SenderAction,
    PinMessageBody,
    GetPinnedMessageResult,
    Message,
    Recipient,
    LinkedMessage,
    MessageBody,
    MessageStat,
    MessageList,
    SendMessageResult,
    NewMessageBody,
    NewMessageLink,
    AttachmentRequest,
    VideoAttachmentRequest,
    AudioAttachmentRequest,
    FileAttachmentRequest,
    UploadedInfo,
    ContactAttachmentRequest,
    ContactAttachmentRequestPayload,
    InlineKeyboardAttachmentRequest,
    InlineKeyboardAttachmentRequestPayload,
    ReplyKeyboardAttachmentRequest,
    LocationAttachmentRequest,
    ShareAttachmentRequest,
    ShareAttachmentPayload,
    ShareAttachment,
    Attachment,
    PhotoAttachment,
    PhotoAttachmentPayload,
    PhotoAttachmentRequestPayload,
    PhotoToken,
    PhotoTokens,
    VideoAttachment,
    VideoThumbnail,
    VideoAttachmentDetails,
    VideoUrls,
    MediaAttachmentPayload,
    AudioAttachment,
    FileAttachment,
    FileAttachmentPayload,
    AttachmentPayload,
    LocationAttachment,
    ContactAttachment,
    ContactAttachmentPayload,
    InlineKeyboardAttachment,
    Keyboard,
    ReplyKeyboardAttachment,
    Button,
    ReplyButton,
    CallbackButton,
    Intent,
    LinkButton,
    ChatButton,
    ContactButton,
    LocationButton,
    AppButton,
    MessageButton,
    Callback,
    CallbackAnswer,
    Update,
    UpdateList,
    SendMessageOptions,
    EditMessageOptions,
    UploadUrl,
    UploadEndpoint,
    UploadType,
    Subscription,
    SubscriptionRequestBody,
    GetSubscriptionsResult,
    SimpleQueryResult,
    ApiResponse,
    ErrorResponse,
    MaxError,
  };
}
