import React, { useState } from 'react';
import { InputNumber, Modal, Slider } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import { ModalFuncProps } from 'antd/lib/modal';

import { IItem } from '../reducers/interfaces';

interface IAmountModalProps {
  item: IItem;
  inputProps?: InputNumberProps;
  modalProps?: ModalFuncProps;
  onSubmit?: (value: number) => void;
  onChange?: (value?: number | [number, number]) => void;
  max?: number;
}

export const AmountModal: (props: IAmountModalProps) => JSX.Element = (props) => {
  const { item, inputProps, onChange, max } = props;

  const [amount, setAmount] = useState(1);
  const onInnerChange = (value?: number | [number, number]) => {
    if (typeof value === 'number') {
      setAmount(value || 1);
      onChange && onChange(value || 1);
    }
  };

  return (
    <>
      <InputNumber
        defaultValue={1}
        value={amount}
        min={1}
        max={max || item.amount}
        onChange={onInnerChange}
        {...(inputProps || {})}
      />
      <Slider
        value={amount}
        defaultValue={1}
        min={1}
        max={max || item.amount}
        onChange={onInnerChange}
        dots={(max || item.amount || 10) <= 12}
      />
    </>
  )
};

/**
 * This function creates modal for choosing item quantity.
 * I didn't made a simple modal, because I would need to make
 * a lot of state actions in order to pass all needed data
 */
const amountModal: (props: IAmountModalProps) => void = (props) => {
  const { item, onSubmit, modalProps, max } = props;
  const enough = (max && max >= 2) || (!max && item.amount && item.amount >= 2);
  const title = enough
    ? `Сколько? (макс. ${max || item.amount}шт)`
    : 'Уверены?';

  let amount = 1;

  Modal.confirm({
    title: title,
    className: 'amount-modal',
    content: enough && (
      <AmountModal
        {...props}
        onChange={(value?: number | [number, number]) => {
          if (typeof value === 'number') amount = value;
        }}
      />
    ),
    onOk: (close) => {
      onSubmit && onSubmit(amount);
      close();
    },
    okText: 'Готово',
    cancelText: 'Отмена',
    maskClosable: true,
    centered: true,
    ...(modalProps || {}),
  });
};

export default amountModal;
