import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { Button } from '../../../views/design/Button';
import { withRouter } from 'react-router-dom';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 600px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Text = styled.p`
  color: white;
  font-size: 12px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
`;

class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            id: localStorage.getItem("key"),
            username: null,
            password: null,
            birthday: null,
            cakeday: null,
            name: null
        };
    }

    async updateUser() {
        try {
            // requestBody
            const requestBody = JSON.stringify({
                id: localStorage.getItem("current"),
                username: this.state.username,
                password: this.state.password,
                birthday: this.state.birthday
            });

            // send the request to the backend
            await api.put('/users/' + this.state.id, requestBody);

            // rerender page
            this.props.history.push('/home')
        } catch(error) {
            alert(`Something went wrong while updating the user: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try {
            // fetch the users data
            const response = await api.get('/users/' + this.state.id);

            // read the users data into the pages state
            this.setState({username: response.data.username});
            this.setState({birthday: response.data.birthday});
            this.setState({cakeday: response.data.cakeday});
            this.setState({name: response.data.name});

        } catch(error) {
            alert(`Something went wrong while fetching the user: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }


    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Title>User page</Title>
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            placeholder={this.state.username}
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Label>password</Label>
                        <InputField
                            placeholder="Enter new password"
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />

                        <Label>birthday</Label>
                        <InputField
                            placeholder={this.state.birthday}
                            onChange={e => {
                                this.handleInputChange('birthday', e.target.value);
                            }}
                        />

                        <Label>Name</Label>
                        <Text>{ this.state.name }</Text>

                        <Label>Cakeday</Label>
                        <Text>{ this.state.cakeday }</Text>

                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.updateUser();
                                }}
                            >
                                Update
                            </Button>

                            <view style={{margin: 10}}/>

                            <Button
                                width="50%"
                                onClick={() => {
                                    localStorage.removeItem("key")
                                    this.props.history.push("/game")
                                }}
                            >
                                Back to overview
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(UserPage);