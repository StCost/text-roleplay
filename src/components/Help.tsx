import React from 'react';
import { Card } from 'antd';

export default () => (
  <Card className="help">
    Чат для текстовой ролевой игры. Инвентарь, управление чатом, настройки персонажа, профиля.
    <br/>
    <a
      href="https://drive.google.com/file/d/0B-RDVZxCOJTPdDVXaERkZUQ5dWc/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
    >
      Правила игры
    </a>
    <br/><br/>
    <h1>Возможности</h1>
    <pre>
      - Новосозданный игрок должен быть подтверждён админом<br/>
      - РП сообщение, если первым символом написать "*"<br/>
      - Кнопка скролла вниз чата<br/>
      - Игроки онлайн имеют синюю обводку вокруг аватара<br/>
      - При наведении на игрока показывается последний онлайн<br/>
      - При клике на игрока открывается страница персонажа<br/>
      - Админы могут редактировать других игроков<br/>
      - Настройки имени и аватара<br/>
      - Настройки применяются сразу после изменения (даже в процессе редактирования)<br/>
      - Картинку для аватара можно вставить, перетащив картинку либо через буфер омбена<br/>
      - Все пользователи видят изменения<br/>
      - При наведении на время сообщения показывается его дата<br/>
      - Сообщения от одного автора сгруппированы<br/>
      - В верхнем левом углу дата последнего билда проекта. Появляется только при наведении курсора<br/>
      - Лист персонажа<br/>
      - Не активные характеристики персонажа расчитываются сами<br/>
      - После подтверждения изменений персонажа, чат оповещается об изменениях<br/>
      - Нельзя сохранить персонажа при отрицательных Очках Навыков<br/>
      - Каждая страница грузится отдельно, что уменьшает нагрузку<br/>
      - Админ может закреплять сообщения<br/>
      - Статус игрока (онлайн, оффлайн, афк) в зависимости от того, в фокусе ли вкладка или закрыта<br/>
      - Список пользователей, позволяющий попасть на страницу любого из них<br/>
      - Страница с перками персонажа (добавление и удаление)<br/>
      - Полученные и потерянные перки логируются в чат<br/>
      - Каждый игрок имеет личные записи<br/>
      - При необходимости видимость записей может быть открыта для всех<br/>
      - Призовые навыки, которые улучшаются в два раза быстрее. Подсвечивается синим<br/>
      - Призовые навыки выбираются кликом по названию навыка<br/>
      - При выходе со страницы, данные о персонаже остаются не сохраненными (сбрасываются при перезагрузке)<br/>
      - Любые изменения данных синхронизированы между пользователями и обновляются сразу же<br/>
      - Экспорт персонажа в виде .json файла<br/>
      - При уровне выше первого - редактирование базового значения SPECIAL отключается<br/>
      - Отключенные функции можно активировать в настройках профиля<br/>
      - <br/>
    </pre>

    <h1>Баги/ошибки</h1>
    <pre>
      - Самое первое сообщение почему-то не группируется<br/>
      - В списке предметов и инвентаре не регистрируется создание первого предмета и удаление единственного. Применяется только после перезагрузки. (На данный момент не важно)<br/>
      - <br/>
    </pre>

    <h1>Todo</h1>
    <pre>
      - <br/>
    </pre>

    <h1>Отключенo</h1>
    - Отправлять в чат картинки из буфера обмена (ctrl + v) либо перетаскивая в поле ввода<br/>
    - Увеличение картинки<br/>
    - Вставка ссылок<br/>
    - Вставка YouTube видео (полная ссылка, не youtu.be)<br/>
    - Броски дайсов<br/>
    - В одном сообщении может быть не больше 10-ти дайсов<br/>
    - Кол-во дайсов в первой цифре. Не больше 10<br/>
    - Буква "д" или "d" вторым символом<br/>
    - Размер дайса во второй цифре. Только размера 4 6 8 10 12 и 20<br/>
    - Примеры: 1д10, 2д20, 9d4<br/>
    - При неправильном дайсе сообщение не будет отправлено<br/>
    - Дайс можно писать в любом месте сообщения не больше 10-ти раз<br/>
    - При наведении на брошенный дайс можно увидеть полный результат<br/>
    - Крит попадания и промахи слегка подсвечиваются зеленым и красным соответственно<br/>
    - Предметы (создание, удаление, редактирование)<br/>
    - Только админ может создавать предметы<br/>
    - Удалять и редактировать можно только предметы созданные тобой же, либо если админ<br/>
    - Фильтр по типу предмета<br/>
    - Поиск одновременно по названию, описанию и эффекту предметов<br/>
    - Вес и стоимость не показываются, если нулевая<br/>
    - Количество не показывается, если предмет один<br/>
    - Загрузка больше предметов по нажатию на кнопку (не сортированных)<br/>
    - Выбор кол-во загружаемых предметов<br/>
    - Инвентарь<br/>
    - Админ может взять в инвентарь предметы из списка<br/>
    - Предмет из инвентаря может быть показан другим в чате<br/>
    - Предмет может быть использован, чем будет израсходован (1шт)<br/>
    - Предмет можно выбросить в чат и любой игрок может его подобрать<br/>
    - Передача предмета другим игрокам<br/>
    - Можно зайти в чужой инвентарь без редактирования<br/>
    - Если получить сообщение, когда вкладка чата не активна - в названии вкладки появится "(!)", а кнопка Чата в меню начнет моргать<br/>
    - Страница статуса персонажа (повреждения конечностей, основные характеристика)<br/>
    - Кликом на конечность она повреждается либо лечится<br/>
    - <br/>
  </Card>
)
