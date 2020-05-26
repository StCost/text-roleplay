import React, { Component } from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

class Image extends Component<{ src: string, noTitle?: boolean }, { visible: boolean }> {
  state = { visible: false };

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { src, noTitle = false } = this.props;

    return (
      <React.Fragment>
        <img
          onClick={this.toggleModal}
          src={src}
          alt=""
          className="chat-image"
        />
        <Modal
          title={!noTitle && (
            <div>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {src}
              </a>
              <CloseOutlined onClick={this.toggleModal}/>
            </div>
          )}
          className="image-modal"
          closable={false}
          footer={null}
          visible={this.state.visible}
          onCancel={this.toggleModal}
          width="fit-content"
        >
          <img
            style={{
              maxWidth: '90vw',
            }}
            src={src}
            alt=""
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Image;
