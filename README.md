# yandex-geocoder-coords-by-list

Позволяет скормить яндексу список адресов и получить файл для импорта отметок на карту.

1. Установить зависимости npm i
2. В source.txt построчно занести названия городов или адреса
3. Получить АПИ ключ Яндекса для геокодера - https://developer.tech.yandex.ru/services/
4. Вписать полученнный ключ в index.js var apikey = 'xxxxxxx-xxxxxxxx-xxxxxx-xxxxxxxx';
5. Запустить npm start
6. Для каждого адреса скрипт определит координаты и запишет все в coords.csv
7. Результирующий файл пригоден для импорта в конструктор карт Яндекса