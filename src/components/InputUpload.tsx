import React, { ClipboardEvent, Component, DragEvent } from 'react';
import { Input, message as notify, Modal } from 'antd';

import Image from './Image';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import actions from '../reducers/actions';
import {btoa} from "buffer";
import {fileURLToPath} from "url";

interface IInputUploadProps {
  textArea?: boolean;
  onUpload: (link: string) => void;
}

export const base64ToUrl = (base64: string) => `data:image/png;base64,${base64}`;

export const uploadFile = function(file: File, onFinish: (imgurLink: string) => void, onCancel?: () => void) {
  console.log('file', file);
  if (file) {
    if (file.type.indexOf('image') > -1)
    {
      if (FileReader) {
        const fileReader = new FileReader();
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result && typeof e.target.result === 'string')
            Modal.confirm({
              title: 'Загрузить изображение?',
              content: <Image src={URL.createObjectURL(file)} noTitle/>,
              onOk: (close) => {
                close();
                actions.uploadFile({
                  file,
                  onFinish,
                  onFail: onCancel
                });
              },
              onCancel,
              okText: 'Загрузить',
              cancelText: 'Отмена',
              maskClosable: true,
              centered: true,
            });
        };
        fileReader.readAsDataURL(file);
      } else {
        notify.error('Загрузка не поддерживается браузером');
      }
    } else {
      notify.error('Только картинки могут быть загружены');
    }
  }
};

class InputUpload extends Component<(IInputUploadProps & InputProps) | (IInputUploadProps & TextAreaProps)> {
  onPaste = async (e: ClipboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const file = await e.clipboardData.files[0]
    console.log('onPaste', e.clipboardData, file);
    if (file) {
      uploadFile(file, this.props.onUpload)
    }
  };

  onDrop = (e: DragEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // const file = e.dataTransfer.items[0].getAsFile();
    // console.log('onDrop', e.dataTransfer, file);
    // if (file)
    //   uploadFile(file, this.props.onUpload)
    actions.notify({ message: 'сорян, drag n drop загрузка сломана :(' });
  };

  render = () => {
    const { textArea, onUpload, ...rest } = this.props;

    return textArea
      ? (
        <Input.TextArea
          {...(rest as TextAreaProps)}
          onPaste={this.onPaste}
          onDrop={this.onDrop}
        />
      ) : (
        <Input
          {...(rest as InputProps)}
          onPaste={this.onPaste}
          onDrop={this.onDrop}
        />
      )
  }
}

export default InputUpload;
