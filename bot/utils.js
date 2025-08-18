/**
 * Утилиты для работы с MAX Bot API
 */

/**
 * Класс для работы с параметрами URL (аналог URLSearchParams)
 */
class URLParams {
  constructor() {
    this.params = new Map();
  }

  /**
   * Добавить параметр
   * @param {string} key - Ключ параметра
   * @param {string} value - Значение параметра
   */
  append(key, value) {
    this.params.set(key, value);
  }

  /**
   * Получить строку параметров
   * @returns {string} Строка параметров для URL
   */
  toString() {
    const pairs = [];
    for (const [key, value] of this.params) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return pairs.join("&");
  }

  /**
   * Проверить наличие параметра
   * @param {string} key - Ключ параметра
   * @returns {boolean} Есть ли параметр
   */
  has(key) {
    return this.params.has(key);
  }

  /**
   * Получить значение параметра
   * @param {string} key - Ключ параметра
   * @returns {string|undefined} Значение параметра
   */
  get(key) {
    return this.params.get(key);
  }

  /**
   * Удалить параметр
   * @param {string} key - Ключ параметра
   */
  delete(key) {
    this.params.delete(key);
  }

  /**
   * Очистить все параметры
   */
  clear() {
    this.params.clear();
  }
}

/**
 * Создать объект URLParams
 * @returns {URLParams} Объект для работы с параметрами URL
 */
function createURLParams() {
  return new URLParams();
}

/**
 * Форматировать дату в Unix timestamp
 * @param {Date} date - Дата
 * @returns {number} Unix timestamp
 */
function toUnixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Проверить, является ли значение валидным ID
 * @param {*} value - Значение для проверки
 * @returns {boolean} Является ли валидным ID
 */
function isValidId(value) {
  return value !== null && value !== undefined && value !== "";
}

/**
 * Проверить, является ли значение валидным числом
 * @param {*} value - Значение для проверки
 * @param {number} min - Минимальное значение
 * @param {number} max - Максимальное значение
 * @returns {boolean} Является ли валидным числом
 */
function isValidNumber(value, min = null, max = null) {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
}

/**
 * Проверить, является ли значение валидным массивом
 * @param {*} value - Значение для проверки
 * @returns {boolean} Является ли валидным массивом
 */
function isValidArray(value) {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Безопасно объединить объекты
 * @param {...Object} objects - Объекты для объединения
 * @returns {Object} Объединенный объект
 */
function safeAssign(...objects) {
  const result = {};
  for (const obj of objects) {
    if (obj && typeof obj === "object") {
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined) {
          result[key] = value;
        }
      }
    }
  }
  return result;
}

// Экспорт для использования в других файлах
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    URLParams,
    createURLParams,
    toUnixTimestamp,
    isValidId,
    isValidNumber,
    isValidArray,
    safeAssign,
  };
}
