import React, { ChangeEvent, Component } from 'react';
import {
  Card,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  message as notify,
  Modal,
  Select,
  Switch,
} from 'antd';
import { ClearOutlined, CloseOutlined } from '@ant-design/icons';

import { defaultItem, IItem } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';

interface IItemCreatorProps {
  onSubmit: (item: IItem) => void;
  onClose: () => void;
  visible: boolean;
  item?: IItem;
  isAdmin?: boolean;
}

class ItemCreator extends Component<IItemCreatorProps, Partial<IItem>> {
  state = {};

  labels = {
    id: 'ID',
    type: 'Тип*',
    name: 'Название*',
    weight: 'Вес',
    effect: 'Эффект',
    image: 'Картинка',
    description: 'Описание',
    price: 'Цена',
    capacity: 'Размер магазина',
    armor: 'Защита',
    approved: 'Подтверждён',
  };

  types = [
    {
      key: 'weapon',
      value: 'Оружие',
    },
    {
      key: 'wearable',
      value: 'Одежда/Броня',
    },
    {
      key: 'usable',
      value: 'Используемое',
    },
    {
      key: 'ammo',
      value: 'Патроны',
    },
    {
      key: 'misc',
      value: 'Прочее',
    },
    {
      key: 'note',
      value: 'Записка',
    },
    {
      key: 'key',
      value: 'Ключ',
    },
    {
      key: 'junk',
      value: 'Мусор',
    },
  ];

  onChange = (key: string, value: string | boolean | number) =>

    this.setState({ [key]: value });

  clearImage = () =>
    this.setState({ image: '' });

  fields = {
    id: () => false,
    type: (value: string, key: string) => (
      <Select
        value={value}
        onChange={(value: string) => this.onChange(key, value)}
      >
        {this.types.map(({ key, value }) => (
          <Select.Option value={key} key={key}>
            {value}
          </Select.Option>
        ))}
      </Select>
    ),
    name: (value: string, key: string) => (
      <Input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => this.onChange(key, e.currentTarget.value)}
      />
    ),
    weight: (value: number, key: string) => (
      <InputNumber
        value={value}
        min={0}
        precision={2}
        onChange={(value?: number) => this.onChange(key, value || 0)}
        step={0.01}
      />
    ),
    effect: (value: string, key: string) => (
      <Input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => this.onChange(key, e.currentTarget.value)}
      />
    ),
    image: (value: string, key: string) => (
      <div>
        <div style={{ display: 'flex' }}>
          <Input
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => this.onChange(key, e.currentTarget.value)}
          />
          <Popconfirm
            title="Очистить картинку?"
            onConfirm={this.clearImage}
            okText="Да"
            cancelText="Нет"
            icon={<ClearOutlined style={{ color: '#ff4d4f' }}/>}
          >
            <Button
              disabled={!value}
              danger
            >
              <ClearOutlined/>
            </Button>
          </Popconfirm>
        </div>
        <Avatar
          shape="square"
          avatar={value}
          nickname={value}
          size={128}
          style={{ margin: '8px auto', display: 'block' }}
        />
      </div>
    ),
    description: (value: string, key: string) => (
      <Input.TextArea
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.onChange(key, e.currentTarget.value)}
      />
    ),
    price: (value: number, key: string) => (
      <InputNumber
        value={value}
        min={0}
        step={1}
        onChange={(value?: number) => this.onChange(key, value || 0)}
      />
    ),
    capacity: (value: number, key: string, item: IItem) => (
      item.type === 'weapon' && <InputNumber
        value={value}
        min={1}
        step={1}
        onChange={(value?: number) => this.onChange(key, value || 1)}
      />
    ),
    armor: (value: number, key: string, item: IItem) => (
      item.type === 'wearable' && <InputNumber
        value={value}
        min={0}
        step={1}
        onChange={(value?: number) => this.onChange(key, value || 0)}
      />
    ),
    approved: (value: boolean, key: string) => (
      this.props.isAdmin && <Switch
        checked={value}
        disabled={!this.props.isAdmin}
        onChange={(checked: boolean) => this.onChange(key, checked)}
      />
    ),
  };

  getField = (key: string, value: string | number | boolean, item: Partial<IItem>) => {
    const field = this.fields[key];
    return field && field(value, key, item);
  };

  onSubmit = () => {
    const { onSubmit } = this.props;

    const newItem = {};
    Object.keys(defaultItem).forEach((key: string) => {
      newItem[key] = this.getValue(key);
    });

    const instanceOfItem = (object: any): object is IItem => {
      return object.discriminator === 'IItem';
    };

    if (!instanceOfItem(newItem)) {
      notify.error('Ошибка генерации предмета!');
      console.error(newItem);
      return;
    }

    if (!newItem.name) {
      notify.error('Имя не может быть пустым');
      return;
    }

    onSubmit(newItem);
    this.setState({});
  };

  getValue = (key: string) => {
    const { state } = this;
    const { item } = this.props;

    const value = state[key];
    const itemValue = item ? item[key] : undefined;
    const defaultValue = defaultItem[key];

    if (value !== undefined)
      return value;
    else if (itemValue !== undefined)
      return itemValue;
    else
      return defaultValue;
  };

  content = () => {
    const { state } = this;

    return (
      <div className="item-creator">
        <div className="item-creator__body">
          {Object
            .keys(defaultItem)
            .map((key: string) => {
                const field = this.getField(key, this.getValue(key), state);
                return field && (
                  <Card
                    className={key}
                    key={key}
                    title={this.labels[key]}
                  >
                    {field}
                  </Card>
                )
              }
            )
          }
        </div>
        <div className="item-creator__controls">
          <Popconfirm
            title="Все данные будут обнулены"
            onConfirm={() => this.setState(defaultItem)}
            okText="Очистить"
            cancelText="Отмена"
            icon={<ClearOutlined style={{ color: '#ff4d4f' }}/>}
          >
            <Button>
              Очистить
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Подтвердить изменения?"
            onConfirm={this.onSubmit}
            okText="Готово"
            cancelText="Отмена"
            icon={<ClearOutlined style={{ color: '#15395b' }}/>}
          >
            <Button>
              Готово
            </Button>
          </Popconfirm>
        </div>
      </div>
    )
  };

  render = () => {
    const { onClose, visible } = this.props;

    return (
      <Modal
        className="item-creator-modal"
        centered
        closable={false}
        onCancel={onClose}
        footer={null}
        visible={visible}
        title={
          <CloseOutlined onClick={onClose}/>
        }
      >
        {this.content()}
      </Modal>
    )
  }
}

export default ItemCreator;
