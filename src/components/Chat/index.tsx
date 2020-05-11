import React, { Component } from 'react';
import { connect } from 'react-redux';

interface IChatProps {}

class Chat extends Component<IChatProps> {
  render = () => {
    return (
      <div>

      </div>
    )
  }
}

export default connect()(Chat);
