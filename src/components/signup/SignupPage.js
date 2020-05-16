import React from "react";
import styled from "styled-components";
import { BaseContainer} from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import { withRouter} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import subtleClick from "../../sounds/subtle_click.wav";

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
  width: 30em;
  // height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  // background: linear-gradient(rgb(255, 165, 0), rgb(238, 118, 0));
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
`;

class SignupPage extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        };
    }

    /**
     * HTTP POST request is sent to the backend. If the request is successful,
     * the user was added and it`s location is returned to the front-end.
     */
    async signup() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            const response = await api.post("/users", requestBody);

            //SignupPage successfully worked -> navigate to the route /login
            localStorage.setItem("fromSignup", "true");
            this.props.history.push(response.data);
        } catch (error) {
            alert(`Something went wrong during the sign up: \n${handleError(error)}`);        }
    }

    /**
     * Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying which field needs to be updated)
     * @param value (the value which will be assigned to the identified state)
     */
    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    componentDidMount() {
    }

    playSound(sfx) {
        sfx.play();
        sfx.onended = function () {
            sfx.remove() //Remove when played.
        };
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Title>Signup</Title>
                    <Form>
                        <Label>Username</Label> {' '}
                        <InputField
                            placeholder="Enter here..."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />

                        <Label>Password</Label>
                        <InputField
                            placeholder="Enter here..."
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password
                                || !!this.state.username.match(/^[\s]*$/i) || !!this.state.password.match(/^[\s]*$/i)}
                                onClick={() => {
                                    this.playSound(new Audio(subtleClick));
                                    this.signup();
                                }}
                            >
                                Sign up
                            </Button>

                            <view style={{margin: 10}}/>

                            <Button
                                onClick={() => {
                                    this.playSound(new Audio(subtleClick));
                                    this.props.history.push("/login")
                                }}
                            >
                                Back to login
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(SignupPage);