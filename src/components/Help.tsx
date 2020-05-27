import React from 'react';
import { Card } from 'antd';

export default () => (
  <Card className="help">
    Чат для текстовой ролевой игры. Инвентарь, управление чатом, настройки персонажа, профиля.
    <br/><br/>
    <h1>Возможности</h1>
    <pre>
      - Новосозданный игрок должен быть подтверждён админом<br/>
      - Отправлять в чат картинки из буфера обмена (ctrl + v) либо перетаскивая в поле ввода<br/>
      - Увеличение картинки<br/>
      - Вставка ссылок<br/>
      - Вставка YouTube видео (полная ссылка, не youtu.be)<br/>
      - Броски дайсов<br/>
      - В одном сообщении может быть не больше 10-ти дайсов
      - Кол-во дайсов в первой цифре. Не больше 10<br/>
      - Буква "д" или "d" вторым символом<br/>
      - Размер дайса во второй цифре. Только размера 4 6 8 10 12 и 20<br/>
      - Примеры: 1д10, 2д20, 9d4<br/>
      - При неправильном дайсе сообщение не будет отправлено<br/>
      - Дайс можно писать в любом месте сообщения и сколько угодно раз<br/>
      - При наведении на брошенный дайс можно увидеть полный результат<br/>
      - Крит попадания и промахи слегка подсвечиваются зеленым и красным соответственно<br/>
      - РП сообщение, если первым символом написать "*"<br/>
      - Кнопка скролла вниз чата<br/>
      - Игроки онлайн имеют синюю обводку вокруг аватара<br/>
      - При наведении на игрока показывается последний онлайн<br/>
      - При клике на игрока открывается страница настроек<br/>
      - Админы могут редактировать настройки других игроков<br/>
      - Настройки имени и аватара<br/>
      - Настройки применяются сразу после изменения (даже в процессе редактирования)<br/>
      - Картинку для аватара можно вставить, перетащив картинку либо через буфер омбена<br/>
      - Все пользователи видят изменения<br/>
      - При наведении на время сообщения показывается его дата<br/>
      - Сообщения от одного автора сгруппированы<br/>
      - Предметы (создание, удаление, редактирование)<br/>
      - Только админ может создавать предметы<br/>
      - Удалять и редактировать можно только предметы созданные тобой же, либо если админ<br/>
      - Фильтр по типу предмета<br/>
      - Поиск одновременно по названию, описанию и эффекту предметов<br/>
      - Вес и стоимость не показываются, если нулевая<br/>
      - Количество не показывается, если предмет один<br/>
      - Загрузка больше предметов по нажатию на кнопку (не сортированных)<br/>
      - Выбор кол-во загружаемых предметов<br/>
      - В верхнем левом углу дата последнего билда проекта. Появляется только при наведении курсора<br/>
      - Инвентарь<br/>
      - Админ может взять в инвентарь предметы из списка<br/>
      - Предмет из инвентаря может быть показан другим в чате<br/>
      - Предмет может быть использован, чем будет израсходован (1шт)<br/>
      - Предмет можно выбросить в чат и любой игрок может его подобрать<br/>
      - Передача предмета другим игрокам<br/>
      - Можно зайти в чужой инвентарь без редактирования<br/>
      - Лист персонажа<br/>
      - Не активные характеристики персонажа расчитываются сами<br/>
      - После подтверждения изменений персонажа, чат оповещается об изменениях<br/>
      - Нельзя сохранить персонажа при отрицательных Очках Навыков<br/>
      - Если получить сообщение, когда вкладка не активна - в названии появится "(!)"<br/>
      - Каждая страница грузится отдельно, что уменьшает нагрузку<br/>
      - <br/>
    </pre>

    <h1>Баги/ошибки</h1>
    <pre>
      - <br/>
    </pre>

    <h1>Исправления</h1>
    <pre>
      - Возможность закреплять сообщения<br/>
      - <br/>
    </pre>

    <h1>Todo</h1>
    <pre>
      - Local Notes<br/>
      - Global notes<br/>
      - Drawing<br/>
      - <br/>
    </pre>
  </Card>
)
