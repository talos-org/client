// @flow
import * as React from 'react';
import { Button as _Button, Card as _Card, Icon, Input as _Input } from 'antd';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const { TextArea } = _Input;
const _TextArea = TextArea;

const Box = styled(_Card)`
  margin: calc(10vh) auto;
`;

const Card = styled(_Card)`
  display: ${props => (props.visible ? null : 'none')};
  margin: 55px;
`;

const InfoLabel = styled.div`
  font-size: 9px;
  p {
    display: inline;
    margin: 0 0 0 3px;
  }
`;

const Input = styled(_Input)`
  margin: 11px 0;
`;

const Label = styled.p`
  font-size: 18px;
`;

const NextButton = styled(_Button)`
  {/* Switch to \`rem\` units when we finally
    setup a design-system
  */}
  margin-top: 25px;
  }
`;

const DescriptionBox = styled(_TextArea)`
  margin-top: 11px;
`;

// Not worried about validation right now
// eslint-disable-next-line
const validate = () => Promise.resolve(true);

export default class Form extends React.Component<
  { onUpdate: Function },
  {
    description: string,
    maxBlockSize: number,
    miningDiversity: number,
    miningTurnover: number,
    name: string,
    showAdvanced: boolean,
    targetBlockTime: number,
  },
> {
  focusRef = React.createRef();

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      description: '',
      maxBlockSize: 64000,
      // Is this too much?
      miningDiversity: 0.5,
      miningTurnover: 0.0,
      name: '',
      showAdvanced: false,
      // Is this too little?
      targetBlockTime: 360000,
      done: false /* used to indicate we are done onboarding, redirects user to main dashboard */,
    };
  }

  emitEmpty = () => {
    // React@16 and Flow docs need to get in-line with each other
    // already FFS
    // $FlowFixMe
    this.focusRef.current.focus();
    this.setState({ name: '' });
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleNext = (to: string) => {
    // $FlowFixMe
    // Validation is going to look something like this
    // validate()
    //   .then(_ => this.setState({ showAdvanced: true, }));
    this.props.onUpdate();
    this.setState({ showAdvanced: true });
  };

  handleFinish = () => {
    axios
      .post('http://localhost:5000/create_chain/', {
        name: this.state.name,
      })
      .then(response => console.log('Successfully created chain:', response))
      .then(() =>
        axios.post('http://localhost:5000/config_parameters/', {
          name: this.state.name,
          params: {
            description: this.state.description,
            max_block_size: this.state.maxBlockSize,
            target_block_time: this.state.targetBlockTime,
            mining_turnover: this.state.miningTurnover,
            mining_diversity: this.state.miningDiversity,
          },
        }),
      )
      .then(response => {
        console.log('Successfully configured chain:', response);
        localStorage.setItem('chainName', this.state.name);
        this.setState({ done: true });
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    const {
      description,
      maxBlockSize,
      miningDiversity,
      miningTurnover,
      name,
      showAdvanced,
      targetBlockTime,
      done,
    } = this.state;
    const suffix = name ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    if (done) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Box>
          <Card visible={!showAdvanced}>
            <h1>
              Hello{' '}
              <span role="img" aria-label="waving">
                👋🏽
              </span>
            </h1>
            <p>
              Give your blockchain a name. Giving it a description is
              recommended, but not required.
            </p>
            <Label>Name the blockchain</Label>
            <InfoLabel>
              <Icon type="exclamation-circle" />
              <p>This can’t be changed later</p>
            </InfoLabel>
            <Input
              name="name"
              onChange={this.handleChange}
              placeholder="Name of blockchain"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffix}
              value={name}
              ref={this.focusRef}
            />
            <Label>Description</Label>
            <InfoLabel>
              <Icon type="question-circle" />
              <p>
                A short description is highly <em>recommended</em> but not
                required
              </p>
            </InfoLabel>
            <DescriptionBox
              autosize={{ minRows: 2, maxRows: 6 }}
              name="description"
              onChange={this.handleChange}
              placeholder="Give your Blockchain a description"
              value={description}
            />
            <NextButton
              onClick={() => this.handleNext('advanced')}
              type="primary"
            >
              Next
            </NextButton>
          </Card>
          <Card visible={showAdvanced}>
            <h1>Advanced</h1>
            <p>
              These configuration settings are chosen for you by default.
              <br />
              <br />
              <b>NOTE</b>: These settings are meant for seasoned developers /
              blockchain experts. Don’t tweak these unless you know what you’re
              doing. You’ve been warned.
            </p>
            <Label>Max block size</Label>
            <InfoLabel>
              <Icon type="question-circle" />
              <p>
                Maximum number of bytes in each block, to prevent network
                flooding by a rogue block creator
              </p>
            </InfoLabel>
            <Input
              name="maxBlockSize"
              onChange={this.handleChange}
              placeholder="Max block size"
              value={maxBlockSize}
            />
            <Label>Mining Diversity</Label>
            <InfoLabel>
              <Icon type="question-circle" />
              <p>
                Minimum proportion of permitted “miners” required to participate
                in the round-robin scheme to render a valid blockchain, between
                0.0 (no constraint) and 1.0 (every address with mine permissions
                must participate)
              </p>
            </InfoLabel>
            <Input
              name="miningDiversity"
              onChange={this.handleChange}
              placeholder="Mining Diversity"
              value={miningDiversity}
            />
            <Label>Mining Turnover</Label>
            <InfoLabel>
              <Icon type="question-circle" />
              <p>
                A value of 0.0 prefers a pure round robin scheme between an
                automatically-discovered subset of the addresses with mine
                permissions, with others stepping in only if one fails. A value
                of 1.0 prefers pure random block creation between these
                addresses. Intermediate values set the balance between these two
                behaviors. Lower values reduce the number of forks, making the
                blockchain more efficient, but increase the level of validator
                concentration
              </p>
            </InfoLabel>
            <Input
              name="miningTurnover"
              onChange={this.handleChange}
              placeholder="Mining Turnover"
              value={miningTurnover}
            />
            <Label>Target block time</Label>
            <InfoLabel>
              <Icon type="question-circle" />
              <p>Target average number of seconds between blocks</p>
            </InfoLabel>
            <Input
              name="targetBlockTime"
              onChange={this.handleChange}
              placeholder="Target block time"
              value={targetBlockTime}
            />
            <NextButton onClick={this.handleFinish} type="primary">
              Finish
            </NextButton>
          </Card>
        </Box>
      </div>
    );
  }
}
