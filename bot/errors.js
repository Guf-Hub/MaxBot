/**
 * Класс для обработки ошибок MAX Bot API
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} code - Код ошибки
 * @property {string} message - Сообщение об ошибке
 */

/**
 * Класс ошибки MAX Bot API
 */
class MaxError extends Error {
  /**
   * @param {number} status - HTTP статус код
   * @param {ErrorResponse} response - Ответ с ошибкой от API
   */
  constructor(status, response) {
    super(`${status}: ${response.message}`);
    this.name = "MaxError";
    this.status = status;
    this.response = response;
  }

  /**
   * Получить код ошибки
   * @returns {string} Код ошибки
   */
  get code() {
    return this.response.code;
  }

  /**
   * Получить описание ошибки
   * @returns {string} Описание ошибки
   */
  get description() {
    return this.response.message;
  }
}

/**
 * HTTP коды ответов
 */
const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Создать ошибку на основе HTTP статуса
 * @param {number} status - HTTP статус код
 * @param {string} responseText - Текст ответа
 * @returns {MaxError} Объект ошибки
 */
function createError(status, responseText) {
  let response;

  try {
    response = JSON.parse(responseText);
  } catch (e) {
    // Если не удалось распарсить JSON, создаем базовый объект ошибки
    response = {
      code: `HTTP_${status}`,
      message: responseText || `HTTP Error ${status}`,
    };
  }

  return new MaxError(status, response);
}

// Экспорт для использования в других файлах
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MaxError,
    HTTP_CODES,
    createError,
  };
}
