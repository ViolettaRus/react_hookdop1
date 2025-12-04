# useWindowScroll Hook

## Цель репозитория

Этот проект реализует кастомный React-хук `useWindowScroll()` для отслеживания позиции прокрутки окна браузера и программного управления прокруткой страницы. Проект создан в рамках изучения продвинутых паттернов работы с хуками в React и демонстрирует создание переиспользуемых хуков с использованием композиции.

## Задача и функциональные требования

### Проблема
В React-приложениях часто возникает необходимость:
- Отслеживать текущую позицию прокрутки окна браузера
- Программно управлять прокруткой страницы (например, прокручивать к началу страницы)
- Реагировать на изменения позиции прокрутки в реальном времени

### Решение
Хук `useWindowScroll()` предоставляет простое и удобное API для работы с прокруткой:
- **Отслеживание позиции**: автоматически отслеживает изменения позиции прокрутки по осям X и Y
- **Программная прокрутка**: функция `scrollTo` позволяет прокручивать страницу к заданным координатам
- **Реактивность**: компонент автоматически обновляется при изменении позиции прокрутки

### Функциональные требования
- Возвращает текущую позицию прокрутки `{ x, y }`
- Предоставляет функцию `scrollTo({ x?, y? })` для программной прокрутки
- Поддерживает плавную прокрутку (smooth scrolling)
- Безопасен для SSR (Server-Side Rendering)
- Автоматически очищает слушатели событий при размонтировании компонента

## Структура репозитория

```
hook_dop1/
├── useWindowEvent.js      # Вспомогательный хук для работы с событиями window
├── useWindowScroll.js     # Основной хук для работы с прокруткой
└── README.md              # Документация проекта
```

### Описание модулей

#### `useWindowEvent.js`
Вспомогательный хук для безопасного добавления и удаления слушателей событий на объекте `window`. Обеспечивает:
- Автоматическую очистку слушателей при размонтировании компонента
- Проверку наличия `window` для поддержки SSR
- Правильную работу с зависимостями в `useEffect`

#### `useWindowScroll.js`
Основной хук, который:
- Использует `useState` для хранения текущей позиции прокрутки
- Использует `useWindowEvent` для подписки на события `scroll`
- Предоставляет функцию `scrollTo` через `useCallback` для оптимизации производительности
- Инициализирует состояние из текущей позиции прокрутки при монтировании

### Взаимодействие модулей

```
useWindowScroll
    │
    ├─→ useState (хранение позиции прокрутки)
    │
    └─→ useWindowEvent('scroll', handler)
            │
            └─→ useEffect (добавление/удаление слушателя)
```

## Как использовать

### Установка зависимостей

Убедитесь, что в вашем проекте установлен React:

```
npm install react
# или
yarn add react
```

### Базовое использование

```jsx
import { useWindowScroll } from './useWindowScroll';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div>
      <p>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </p>
      <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
    </div>
  );
}
```

### Примеры использования

#### Отслеживание позиции прокрутки

```jsx
function ScrollIndicator() {
  const [scroll] = useWindowScroll();
  
  return (
    <div>
      <p>Прокручено по Y: {scroll.y}px</p>
      <div style={{ 
        width: `${(scroll.y / document.body.scrollHeight) * 100}%`,
        height: '4px',
        background: 'blue'
      }} />
    </div>
  );
}
```

#### Кнопка "Наверх"

```jsx
function ScrollToTopButton() {
  const [scroll, scrollTo] = useWindowScroll();
  const isVisible = scroll.y > 300;

  return (
    <>
      {isVisible && (
        <button 
          onClick={() => scrollTo({ y: 0 })}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px'
          }}
        >
          ↑ Наверх
        </button>
      )}
    </>
  );
}
```

#### Прокрутка к элементу

```jsx
function ScrollToSection() {
  const [, scrollTo] = useWindowScroll();

  const handleScrollToSection = () => {
    const element = document.getElementById('section');
    if (element) {
      scrollTo({ y: element.offsetTop });
    }
  };

  return (
    <button onClick={handleScrollToSection}>
      Перейти к разделу
    </button>
  );
}
```

#### Горизонтальная прокрутка

```jsx
function HorizontalScroll() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div>
      <p>Позиция по X: {scroll.x}px</p>
      <button onClick={() => scrollTo({ x: 0 })}>
        В начало (горизонтально)
      </button>
    </div>
  );
}
```
