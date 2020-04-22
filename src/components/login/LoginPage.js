import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'


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


const Title = styled.h2`
  color: white;
  text-align: left;
`;

const GameTitle = styled.h1`
  color: white;
  font-size: 100px;
  justify-content: left;
  text-align: left;
`;

const LoginWrapper = styled.div`
    justify-content: center;
    display: flex;
    vertical-align: top;
    text-align: center;
`;

const Container = styled(BaseContainer)`
  color: white;
  // text-align: left;
  
  justify-content: center;
  align: center;
  margin:10em;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ButtonContainer = styled.div`
  width: 10em;
  float:left;
`;


const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class LoginPage extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            password: null,
            username: null
        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async login() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            // send request to backend
            const response = await api.put('/login', requestBody);

            const user = response.data
            console.log(response);
            // Store the token into the local storage.
            localStorage.setItem('current', user.id);
            localStorage.setItem("name", user.username);
            localStorage.setItem("token", response.data.token);

            // LoginPage successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push("/game");
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async loginGuest() {
        // TODO: Do LoginPage as guest
    }

    async recoverPassword() {
        // TODO: Do Password Recorvery
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg> <GameTitle> SCRABBAR.IO </GameTitle> </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form>
                            <Form.Text>
                                No statistics will be saved when playing with guest account
                            </Form.Text>
                            <Form.Group controlId="formTemporaryUsername">
                                <Form.Control type="email" placeholder="Enter temporary username"/>
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg"
                                    onClick={() => {
                                        this.loginGuest();
                                    }}
                            >Login as Guest
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-end">
                    <Col lg={4}>

                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    onChange={e => {
                                        this.handleInputChange('username', e.target.value);
                                    }}
                                    type="email" placeholder="Enter username"/>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Control
                                    onChange={e => {
                                        this.handleInputChange('password', e.target.value);
                                    }}
                                    type="email" placeholder="Enter password"/>
                            </Form.Group>

                            <div>
                                <Button variant="primary" type="submit" size="lg"
                                        onClick={() => {
                                            this.login();
                                        }}
                                >Login
                                </Button>{' '}

                                <Button variant="primary" type="submit" size="lg"
                                        onClick={() => {
                                            this.props.history.push(
                                                {pathname: `/signUp`}
                                            );
                                        }}
                                >Register</Button>
                            </div>

                            <Form.Label
                                onClick={() => {
                                    this.recoverPassword();
                                }}
                            >Forgot your password?
                            </Form.Label>{' '}

                        </Form>
                    </Col>
                </Row>
            </Container>

        );
        // return (
        // <BaseContainer>
        //     <GameTitle> SCRABBAR.IO </GameTitle>
        //     <LoginWrapper>
        //     <FormContainer>
        //
        //       <Title>Guest LoginPage</Title>
        //       <Form>
        //         <Label>Username</Label>
        //             <InputField
        //                 placeholder="Enter here.."
        //                 onChange={e => {
        //                     this.handleInputChange('username', e.target.value);
        //                 }}
        //             />
        //             <ButtonContainer>
        //                 <Button
        //                     disabled={!this.state.username || !this.state.password}
        //                     onClick={() => {
        //                         this.login();
        //                     }}
        //                 >
        //                     LoginPage
        //                 </Button>
        //             </ButtonContainer>
        //         </Form>
        //     </FormContainer>
        //     <FormContainer>
        //
        //         <Title>LoginPage</Title>
        //         <Form>
        //             <Label>Username</Label>
        //             <InputField
        //                 placeholder="Enter here.."
        //                 onChange={e => {
        //                     this.handleInputChange('username', e.target.value);
        //                 }}
        //             />
        //             <Label>password</Label>
        //             <InputField
        //                 placeholder="Enter here.."
        //                 onChange={e => {
        //                     this.handleInputChange('password', e.target.value);
        //                 }}
        //             />
        //             <ButtonContainer>
        //                 <Button
        //                     disabled={!this.state.username || !this.state.password}
        //                     width="50%"
        //                     onClick={() => {
        //                         this.login();
        //                     }}
        //                 >
        //                     LoginPage
        //                 </Button>
        //
        //                 <view style={{margin: 10}}/>
        //
        //                 <Button
        //                     width="50%"
        //                     onClick={() => {
        //                         this.props.history.push("/signUp")
        //                     }}
        //                 >
        //                     Sign up
        //                 </Button>
        //             </ButtonContainer>
        //         </Form>
        //     </FormContainer>
        //     </LoginWrapper>
        // </BaseContainer>
        // );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(LoginPage);
