import React from 'react';
import { connect } from 'react-redux';
import {
  Empty,
  Card,
  Select,
  Input,
  Checkbox,
} from 'antd';

import actions from '../../actions';
import { IState, ISettings, ISettingItem } from '../../reducers';

interface IDashboardProps {
  settings: ISettings | false;
  loading: boolean;
}

interface IDashboardState {
  formEnabled: boolean;
}

export class Settings extends React.Component<IDashboardProps, IDashboardState> {
  state = { formEnabled: false };

  componentDidMount = () => {
    actions.getSettings({});
  };

  getFormItem = (setting: ISettingItem) => {
    const { formEnabled } = this.state;
    const {
      type,
      value,
      options,
    } = setting;

    switch (type) {
      case 'image': {
        return (
          <div>
            <Card>
              <img src={value} alt=""/>
            </Card>
            <Input
              defaultValue={value}
              disabled={!formEnabled}
            />
          </div>
        )
      }
      case 'select': {
        return (
          <Select
            defaultValue={value}
            disabled={!formEnabled}
          >
            {Object.values(options).map(v => (
              <Select.Option value={v} key={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
        )
      }
      case 'string':
      default: {
        return (
          <Input
            defaultValue={value}
            disabled={!formEnabled}
          />
        )
      }
    }
  };

  get content() {
    const { settings } = this.props;
    const { formEnabled } = this.state;

    return (
      <div>
        {Object.values(settings).map((value) => (
          <Card bordered={false}>
            {value.label}
            <br/>
            {this.getFormItem(value)}
          </Card>
        ))}
        <Card
          hoverable
          onClick={() => this.setState({ formEnabled: !formEnabled })}
        >
          Enable inputs {formEnabled && ' (they still can\'t be saved)'}
          <br/>
          <Checkbox checked={formEnabled}/>
        </Card>
      </div>
    )
  }

  render = () => {
    const { settings } = this.props;

    return (
      <Card>
        {settings
          ? (
            this.content
          ) : (
            <Empty/>
          )}
      </Card>
    )
  }
}

const mapStateToProps = (state: IState) => {
  const { settings, loading } = state;
  return { settings, loading };
};

export default connect(mapStateToProps)(Settings);
