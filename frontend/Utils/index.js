/**
 * Кастомная генерация id.
 * TODO: перенести реализацию на бек.
 */
export function createIdForTodoTask () {
  return Math.random(0) * (1000)
}
