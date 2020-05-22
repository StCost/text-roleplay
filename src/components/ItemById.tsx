import React from 'react';
import { connect } from 'react-redux';

import Item from './Item';
import { IItem, IState } from '../reducers/interfaces';
import actions from '../reducers/actions';

interface IItemByIdProps {
  id: string;
  item?: IItem;
  disabled?: boolean;
  footer?: JSX.Element;
  messageId?: number;
  amount?: number;
}

const ItemById = (props: IItemByIdProps) => {
  const { id, item, ...itemProps } = props;

  if (!item) {
    actions.getItemById({ id });
    return <React.Fragment/>;
  }

  return (
    <Item
      item={item}
      {...itemProps}
    />
  );
};

const mapStateToProps = (state: IState, props: IItemByIdProps) => {
  const { items } = state;
  const item = items.find((item: IItem) => item.id === props.id);

  return { item }
};

export default connect(mapStateToProps)(ItemById);
