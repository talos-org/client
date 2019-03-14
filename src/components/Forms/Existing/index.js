// @flow
import * as React from 'react';
import { Layout, Button, Form, Input, Card, Row, Col } from 'antd';

const { Content } = Layout;

export default class ExistingNode extends React.Component<{}> {
  render() {
    const {
      chains,
      walletAddress,
      title,
      onconnectexisting,
      generateAddress,
      handleAdminAddressChange,
    } = this.props;
    return (
      <Form layout="horizontal" hAlignContent="right">
        <h1>Recently connected blockchains</h1>
        <div className="Demo" style={{ marginBottom: '2em' }}>
          <Row gutter={16}>
            {chains.map((chain, id) => (
              <Col
                className="gutter-row"
                span={4}
                style={{ paddingTop: '8px', paddingBottom: '8px' }}
              >
                <div className="gutter-box">
                  <Button
                    key={id}
                    onClick={() => onconnectexisting(chain)}
                    name={chain}
                    title={`Connect to ${chain}`}
                    type="primary"
                    style={{ width: '100%' }}
                  >
                    <div
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {chain}
                    </div>
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <h1>Connect to other blockchain</h1>
        <Form.Item hasFeedback label="Admin Node Address">
          <Input
            placeholder="Enter Admin Node Address"
            name="title"
            value={title}
            onChange={event => handleAdminAddressChange(event)}
          />
        </Form.Item>
        <Button
          name="connectToNew"
          type="primary"
          onClick={() => generateAddress(title)}
          hAlignContent="center"
        >
          Generate Wallet Address
        </Button>
        <h2>Wallet Address: {walletAddress}</h2>
      </Form>
    );
  }
}
