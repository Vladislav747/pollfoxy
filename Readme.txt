

Здесь присуствует модель подписки на события. При отправке запроса Post документ генерирует событие в скрипте poll.js с помощью метода trigger а в скрипте main.js мы это событие читаем и реагируем на него в режиме онлайн .


Для хранения данных используется онлайн база данных Mongo в MLab.

Предварительно создается Model Schema - Vote


Доступно на https://pollfoxy.herokuapp.com/


Первый скрипт package.json -> start -> node app.js
Запуск тестов mocha public\tests\node_test.js