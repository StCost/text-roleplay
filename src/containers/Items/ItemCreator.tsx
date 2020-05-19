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
} from 'antd';
import { ClearOutlined, CloseOutlined } from '@ant-design/icons';

import { defaultItem, IItem } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';

interface IItemCreatorProps {
  onSubmit: (item: IItem) => void;
  onClose: () => void;
  visible: boolean;
  item?: IItem;
}

class ItemCreator extends Component<IItemCreatorProps, IItem> {
  state = defaultItem;

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
    amount: 'Количество',
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
      key: 'consumable',
      value: 'Употребляемое',
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
    // @ts-ignore
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
        precision={1}
        onChange={(value?: number) => this.onChange(key, value || 0)}
        step={0.1}
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
    amount: (value: number, key: string, item: IItem) => (
      item.type === 'ammo' && <InputNumber
        value={value}
        min={0}
        step={1}
        onChange={(value?: number) => this.onChange(key, value || 0)}
      />
    ),
  };

  getField = (key: string, value: string | number | boolean, item: IItem) => {
    // @ts-ignore
    const field = this.fields[key];
    return field && field(value, key, item);
  };

  onSubmit = () => {
    const { state } = this;
    const { onSubmit, item = {} } = this.props;

    const newItem: IItem = { ...state };
    Object.keys(state).forEach((key: string) =>
      // @ts-ignore
      // eslint-disable-next-line
      newItem[key] = newItem[key] === defaultItem[key] && item[key] || (newItem[key])
    );

    if (!newItem.name) {
      notify.error('Имя не может быть пустым')
    }

    onSubmit(newItem);
    this.setState(defaultItem);
  };

  content = () => {
    const { state } = this;
    const { item = {} } = this.props;

    return (
      <div className="item-creator">
        <div className="item-creator__body">
          {Object
            .keys(defaultItem)
            .map((key: string) => {
                // @ts-ignore
                // eslint-disable-next-line
                const value = state[key] === defaultItem[key] && item[key] || (state[key]);
                const field = this.getField(key, value, state);
                return field && (
                  <Card
                    className={key}
                    key={key}
                    // @ts-ignore
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
