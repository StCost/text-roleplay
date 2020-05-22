import React from 'react';
import { connect } from 'react-redux';

import Item from './Item';
import { IItem, IState } from "../reducers/interfaces";
import actions from "../actions";

interface IItemByIdProps {
  id: string;
  loading: boolean;
  items: IItem[];
  disabled?: boolean;
  footer?: JSX.Element;
}

const ItemById = (props: IItemByIdProps) => {
  const { id, loading, items, ...itemProps } = props;

  const item = items.find((item: IItem) => item.id === id);
  if (!item && !loading) {
    actions.getItemById({ id });
  }

  return item ? (
    <Item
      item={item}
      {...itemProps}
    />
  ) : (
    <React.Fragment/>
  );
};

const mapStateToProps = (state: IState) => {
  const { loading, items } = state;

  return { loading, items }
};

export default connect(mapStateToProps)(ItemById);
