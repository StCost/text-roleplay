import React, { ChangeEvent, Component } from 'react';
import {
  Card,
  Input,
  Checkbox,
  InputNumber,
  Button,
  Popconfirm,
  message as notify,
  Modal,
} from 'antd';
import { ClearOutlined, CloseOutlined } from '@ant-design/icons';

import { IItem } from '../../reducers/interfaces';
import Avatar from '../../components/Avatar';
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const defaultItem: IItem = {
  id: '',
  name: 'New item',
  weight: 0,
  effect: '',
  image: '',
  description: '',
  isWeapon: false,
  hasAmmo: false,
  capacity: 0,
};

interface IItemCreatorProps {
  onCreate: (item: IItem) => void;
  onClose: () => void;
  visible: boolean;
}

class ItemCreator extends Component<IItemCreatorProps, IItem> {
  state = defaultItem;

  labels = {
    id: 'ID',
    name: 'Название*',
    weight: 'Вес',
    effect: 'Эффект',
    image: 'Картинка',
    description: 'Описание',
    isWeapon: 'Оружие',
    hasAmmo: 'Имеет патроны',
    capacity: 'Размер магазина',
  };

  onChange = (key: string, value: string | boolean | number) =>
    // @ts-ignore
    this.setState({ [key]: value });

  clearImage = () =>
    this.setState({ image: '' });

  fields = {
    id: () => false,
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
    isWeapon: (value: boolean, key: string) => (
      <Checkbox
        checked={value}
        onChange={(e: CheckboxChangeEvent) => this.onChange(key, e.target.checked)}
      />
    ),
    hasAmmo: (value: boolean, key: string, item: IItem) => (
      <Checkbox
        checked={value}
        disabled={!item.isWeapon}
        onChange={(e: CheckboxChangeEvent) => this.onChange(key, e.target.checked)}
      />
    ),
    capacity: (value: number, key: string, item: IItem) => (
      <InputNumber
        value={value}
        min={1}
        disabled={!item.isWeapon || !item.hasAmmo}
        step={1}
        onChange={(value?: number) => this.onChange(key, value || 0)}
      />
    ),
  };

  getField = (key: string, value: string | number | boolean, item: IItem) => {
    // @ts-ignore
    return this.fields[key](value, key, item);
  };

  onCreate = () => {
    const { state } = this;
    const { onCreate } = this.props;

    if (!state.name) {
      notify.error('Имя не может быть пустым')
    }

    onCreate(state);
  };

  render = () => {
    const { state } = this;
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
        <div className="item-creator">
          <div className="item-creator__body">
            {Object
              .keys(defaultItem)
              .map((key: string) => {
                  // @ts-ignore
                  const field = this.getField(key, state[key], state);
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
              title="Уверены в создании? Его нельзя будет больше редактировать"
              onConfirm={this.onCreate}
              okText="Создать"
              cancelText="Отмена"
              icon={<ClearOutlined style={{ color: '#15395b' }}/>}
            >
              <Button>
                Создать
              </Button>
            </Popconfirm>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ItemCreator;
