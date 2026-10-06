# Label Generator Website

Frontend-приложение для создания и редактирования штрихкодов и этикеток с данными о товарах.

## Проекты

- Frontend: [Frontend-label-generator-website](https://github.com/BekowDev/Frontend-label-generator-website)
- Backend API: [API-for-barcode-label-generator](https://github.com/BekowDev/API-for-barcode-label-generator)
- Live demo: [frontend-label-generator-website.vercel.app](https://frontend-label-generator-website.vercel.app/)

## Возможности

- регистрация и вход в учётную запись;
- создание, просмотр, редактирование и удаление сохранённых этикеток;
- генерация штрихкодов EAN-13 и CODE128;
- ввод дополнительных данных и характеристик товара;
- русская и казахская локализации;
- интерфейс на Vue 3 с Vuex и Tailwind CSS.

## Технологии

- Vue 3 и Vue CLI
- Vue Router
- Vuex 4
- Axios
- Vue I18n
- Tailwind CSS
- JsBarcode

## Требования

- Node.js и npm
- Запущенный [backend API](https://github.com/BekowDev/API-for-barcode-label-generator), если нужны регистрация, авторизация и сохранение этикеток

## Запуск локально

Установите зависимости:

```bash
npm install
```

В `src/api/index.js` задаётся адрес backend. По умолчанию используется:

```text
http://localhost:5000/api
```

Убедитесь, что backend доступен по этому адресу, либо замените `baseURL` в `src/api/index.js` на адрес своего сервера.

Запустите frontend:

```bash
npm run serve
```

Откройте URL, указанный Vue CLI в терминале (обычно `http://localhost:8080`).

Для production-сборки:

```bash
npm run build
```

## Live demo

Откройте [демо Label Generator Website](https://frontend-label-generator-website.vercel.app/).

Доступность функций, требующих backend, зависит от конфигурации развёрнутого сервиса. В локальной разработке для сохранения этикеток нужен запущенный backend и подключённая MongoDB.
