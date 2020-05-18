import React, { Component, MouseEvent } from 'react';
import { Modal } from 'antd';


class Image extends Component<{ src: string }, { visible: boolean }> {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { src } = this.props;

    return (
      <React.Fragment>
        <img
          onClick={this.showModal}
          src={src}
          alt=""
          className="chat-image"
        />
        <Modal
          title={
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
            >
              {src}
            </a>
          }
          closable
          footer={null}
          visible={this.state.visible}
          onCancel={this.showModal}
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
