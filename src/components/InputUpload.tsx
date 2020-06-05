import React, { ClipboardEvent, Component, DragEvent } from 'react';
import { Input, message as notify, Modal } from 'antd';

import Image from './Image';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import actions from '../reducers/actions';

interface IInputUploadProps {
  textArea?: boolean;
  onUpload: (link: string) => void;
}

class InputUpload extends Component<(IInputUploadProps & InputProps) | (IInputUploadProps & TextAreaProps)> {
  uploadFile = (file: File, event: ClipboardEvent<HTMLTextAreaElement | HTMLInputElement> | DragEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (file) {
      if (file.type.indexOf('image') > -1) {
        if (FileReader) {
          const fileReader = new FileReader();
          fileReader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result && typeof e.target.result === 'string')
              Modal.confirm({
                title: 'Загрузить изображение?',
                content: <Image src={e.target.result} noTitle/>,
                onOk: (close) => {
                  close();
                  actions.uploadFile({
                    file,
                    onFinish: (link: string) => this.props.onUpload(link)
                  });
                },
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
      event.preventDefault();
    }
  };

  onPaste = (e: ClipboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    this.uploadFile(e.clipboardData.files[0], e)
  };

  onDrop = (e: DragEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const file = e.dataTransfer.items[0].getAsFile();
    if (file)
      this.uploadFile(file, e)
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
