import React from 'react';
import { Card } from 'antd';

export default () => (
  <Card>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    Чат для текстовой ролевой игры. Инвентарь, управление чатом, настройки персонажа, профиля.
    <br/><br/>
    <h1>Возможности</h1>
    <pre>
      - Отправлять в чат картинки из буфера обмена (ctrl + v) либо перетаскивая в поле ввода<br/>
      - Увеличение картинки<br/>
      - Вставка ссылок<br/>
      - Вставка YouTube видео (полная ссылка, не youtu.be)<br/>
      - Броски дайсов<br/>
      - Кол-во дайсов в первой цифре. Не больше 10<br/>
      - Буква "д" или "d" вторым символом<br/>
      - Размер дайса во второй цифре. Только размера 4 6 8 10 12 и 20<br/>
      - Примеры: 1д10, 2д20, 9d4<br/>
      - При неправильном дайсе сообщение не будет отправлено<br/>
      - Дайс можно писать в любом месте сообщения и сколько угодно раз<br/>
      - При наведении на брошенный дайс можно увидеть полный результат<br/>
      - Крит попадания и промахи слегка подсвечиваются зеленым и красным соответственно<br/>
      - РП сообщение, если первым символом написать "*"<br/>
      - Игроки онлайн имеют синюю обводку вокруг аватара<br/>
      - При наведении на игрока показывается последний онлайн<br/>
      - При клике на игрока открывается страница настроек<br/>
      - Только админы могут редактировать настройки других игроков<br/>
      - Настройки имени и аватара<br/>
      - Настройки применяются сразу после изменения (даже в процессе редактирования)<br/>
      - Все пользователи видят изменения<br/>
      - При наведении на время сообщения показывается его дата<br/>
      - Сообщения от одного автора сгруппированы<br/>
      -<br/>
    </pre>

    <h1>Баги/ошибки/исправления</h1>
    <pre>
      - Нет поддержки всех типов ссылок на Ютуб<br/>
      - Изменить крит попадание на синий (цветовая схема)<br/>
      - Решить, как попасть на чужую страницу инвентаря<br/>
      - Сделать регистрацию с подтверждением аккаунта от админа<br/>
      - Сделать lazy loading для подгрузки проекта только после регистрации<br/>
      - Lazy loading для каждой основной страницы<br/>
      - Нужна кнопка быстрого скролла в низ чата<br/>
      - Ограничить кол-во дайсов на одно сообщение<br/>
      - Не показывать детали дайса, если брошен только один<br/>
      - Загрузка аватара через буфер обмена<br/>
      - Добавить подтверждение к отправке картинки<br/>
      - Порезать контейнеры на файлы поменьше<br/>
      -<br/>
    </pre>

    <h1>Todo</h1>
    <pre>
      - Inventory page (give, show, create, remove items)<br/>
      - Item list<br/>
      - Character page<br/>
      - Local Notes<br/>
      - Global notes<br/>
      - Drawing<br/>
      -<br/>
    </pre>
  </Card>
)