// @flow
import * as React from 'react';
import {
  Modal,
  Table,
  Checkbox,
  Form,
  Input,
  Icon,
  Button,
  List,
  Card,
} from 'antd';

export default class EditStreamPermissionsModal extends React.Component<
  {
    name: String,
    permissions: Array,
    visible: boolean,
    confirmLoading: boolean,
    onOk: Function,
    onCancel: Function,
  },
  {
    permissions: Array,
  },
> {
  state = {
    permissions: [],
  };

  UNSAFE_componentWillReceiveProps(props) {
    /* initialize state permissions with deep copy of props permissions */
    this.setState({
      permissions: JSON.parse(JSON.stringify(props.permissions)),
    });
  }

  onOk = () => {
    const oldPermissions = this.props.permissions;
    const { name, permissions } = this.state;
    let grantPermissions = [];
    let revokePermissions = [];

    console.log(oldPermissions);
    console.log(permissions);

    permissions.forEach((p, i) => {
      const a = p.address;
      const pn = p.permissions;
      const po =
        i < oldPermissions.length
          ? oldPermissions[i].permissions
          : { write: false, activate: false, admin: false };

      Object.keys(pn).forEach(k => {
        const p_id = { address: a, permission: k };
        if (pn[k] && !po[k]) {
          grantPermissions.push(p_id);
        } else if (!pn[k] && po[k]) {
          revokePermissions.push(p_id);
        }
      });
    });

    this.props.onOk(name, grantPermissions, revokePermissions);
  };

  handleAdd = e => {
    e.preventDefault();
    const { permissions } = this.state;
    const address = document.getElementById('newWalletAddress').value;
    const newPermissions = {
      address,
      permissions: {
        write: false,
        activate: false,
        admin: false,
      },
    };

    /* only add new row if that address isn't already in the table */
    if (-1 === permissions.findIndex(p => p.address === address)) {
      this.setState({ permissions: [...permissions, newPermissions] });
    }
  };

  handleCheckbox = (address, permission, checked) => {
    const { permissions } = this.state;
    const targetRow = permissions.findIndex(p => p.address === address);
    permissions[targetRow]['permissions'][permission] = checked;

    this.setState({ permissions });
  };

  render() {
    const { name, visible, confirmLoading, onCancel } = this.props;
    const { permissions } = this.state;

    const permissionsLegend = [
      {
        title: 'Write',
        description: 'write to stream',
      },
      {
        title: 'Activate',
        description: 'grant/revoke write permissions',
      },
      {
        title: 'Admin',
        description: 'grant/revoke write and activate permissions',
      },
    ];

    const columns = [
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Permissions',
        children: [
          {
            title: 'Write',
            dataIndex: 'permissions.write',
            key: 'write',
            render: (bool, record) => (
              <Checkbox
                onChange={e =>
                  this.handleCheckbox(record.address, 'write', e.target.checked)
                }
                checked={bool}
              />
            ),
          },
          {
            title: 'Activate',
            dataIndex: 'permissions.activate',
            key: 'activate',
            render: (bool, record) => (
              <Checkbox
                onChange={e =>
                  this.handleCheckbox(
                    record.address,
                    'activate',
                    e.target.checked,
                  )
                }
                checked={bool}
              />
            ),
          },
          {
            title: 'Admin',
            dataIndex: 'permissions.admin',
            key: 'admin',
            render: (bool, record) => (
              <Checkbox
                onChange={e =>
                  this.handleCheckbox(record.address, 'admin', e.target.checked)
                }
                checked={bool}
              />
            ),
          },
        ],
      },
    ];

    return (
      <Modal
        title={`Edit stream permissions for ${name}`}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.onOk}
        okText="Save"
        onCancel={onCancel}
        width={780}
      >
        <Form
          id="newWalletAddressForm"
          layout="inline"
          onSubmit={this.handleAdd}
        >
          <Form.Item validateStatus="success">
            <Input
              id="newWalletAddress"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Address"
              style={{ width: '32em' }}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Add address</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={permissions}
          bordered={true}
          size="small"
        />
        <h3>Permissions legend</h3>
        <List
          grid={{ gutter: 8, column: 3 }}
          dataSource={permissionsLegend}
          renderItem={item => (
            <List.Item>
              <Card title={item.title} size="small">
                {item.description}
              </Card>
            </List.Item>
          )}
        />
      </Modal>
    );
  }
}
