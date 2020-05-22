import React, { Component } from 'react';
import {
  Switch,
  Radio,
  Card,
} from 'antd';

import Loader from '../../components/Loader';
import { RouteComponentProps } from "react-router";
import { IItem, ItemType } from "../../reducers/interfaces";

export interface IItemsTableProps extends RouteComponentProps {
  loading: boolean;
  items: IItem[];
}

export interface IItemsTableState {
  searchString: string;
  filters: { [key: string]: boolean };
  showApproved: boolean;
  showNotApproved: boolean;
}

class ItemsTable<P extends IItemsTableProps, S extends IItemsTableState> extends Component<P, S> {
  defaultState = {
    searchString: '',
    showApproved: true,
    showNotApproved: false,
    filters: {
      'weapon': true,
      'usable': true,
      'wearable': true,
      'junk': true,
      'ammo': true,
      'note': true,
      'key': true,
      'misc': true,
    },
  };

  get items() {
    const { searchString, filters, showApproved, showNotApproved } = this.state;

    const _searchString = searchString.toLowerCase();
    return this
      .props
      .items
      .filter((item: IItem) => {
        const { name, description, effect, type, approved } = item;
        return (
          (name && name.toLowerCase().indexOf(_searchString) > -1)
          || (description && description.toLowerCase().indexOf(_searchString) > -1)
          || (effect && effect.toLowerCase().indexOf(_searchString) > -1)
        ) && (
          // @ts-ignore
          filters[type]
        ) && (
          (showApproved && approved === true)
          || (showNotApproved && approved === false)
        )
      })
  }

  getFilters = (state: IItemsTableState) => {
    const { showNotApproved, showApproved, filters } = state;

    const getButton = (name: ItemType, label: string) => (
      <div
        tabIndex={0}
        className="items-approved-button"
        // @ts-ignore
        onClick={() => {
          console.log(name, filters[name]);
          this.setState({ filters: { ...filters, [name]: !filters[name] } })
        }}
      >
        <Switch
          checked={
            // @ts-ignore
            filters[name]
          }/>
        {label}
      </div>
    );

    return (
      <Radio.Group
        defaultValue={undefined}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {getButton('weapon', 'Оружие')}
        {getButton('usable', 'Используемое')}
        {getButton('wearable', 'Одежда/Броня')}
        {getButton('ammo', 'Патроны')}
        {getButton('junk', 'Мусор')}
        {getButton('note', 'Записки')}
        {getButton('key', 'Ключи')}
        {getButton('misc', 'Прочее')}
        <div tabIndex={0} className="items-approved-button"
             onClick={() => this.setState({ showApproved: !showApproved })}>
          <Switch checked={showApproved}/>Подтвержденные
        </div>
        <div tabIndex={0} className="items-approved-button"
             onClick={() => this.setState({ showNotApproved: !showNotApproved })}>
          <Switch checked={showNotApproved}/>Не Подтвержденные
        </div>
      </Radio.Group>
    )
  };

  getPageControls: (() => JSX.Element[]) = () => [];
  getHeader: ((items: IItem[]) => JSX.Element) = () => {
    return (
      <div className="items-controls">
        {this.getPageControls()}
      </div>
    )
  };

  getContent: ((items: IItem[]) => JSX.Element) = () => <React.Fragment/>;
  getFooter: ((items: IItem[]) => JSX.Element) = () => <React.Fragment/>;

  render = () => {
    const { loading } = this.props;
    const items = this.items;

    return (
      <Card className="items">
        <Loader loading={loading}/>
        {this.getHeader(items)}
        {this.getContent(items)}
        {this.getFooter(items)}
      </Card>
    )
  }
}

export default ItemsTable;
