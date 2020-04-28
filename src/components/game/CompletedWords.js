import styled from "styled-components";
import * as React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

const ScoreBoardEntryWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 100%;
    
    background: rgba(77, 77, 77, 0.7);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ScoreBoardWrapper = styled.div`
    margin: 0pt;
    padding: 1em;
    width: 100%;
    
    background: rgba(77, 77, 77, 0.7);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Score = styled.label`
    padding-bottom: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 10px;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Username = styled.label`
    padding-top: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 20px;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const UsernameHighlighted = styled.label`
    padding-top: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 20px;
    
    background: rgba(150, 150, 150, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ScoreHighlighted = styled.label`
    padding-bottom: 5pt;
    margin: 0pt;
    width: 100%;
    
    font-size: 10px;
    
    background: rgba(150, 150, 150, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// TODO: Pass words from GamePage (there it should have a method getting the game anyway)
class CompletedWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: null,
            gameId: this.props.gameId,
        };

    }

    async componentDidMount() {
        try {
            setInterval(async () => {
                this.fetchWords();
            }, 1000);
        } catch (e) {
            console.log(e);
        }

    }

    // TODO: Remove or Finish
    async fetchWords() {
        try {
            let response = await api.get("/games/" + this.state.gameId);
            console.log(response);
            let words = response.data;

            this.setState({
                words: ["Hello", "World" ]
            })

        }catch(error){
            console.log(error);
        }
    }

    render() {
        return (
            <Container>
                {!this.state.words ? (
                    <Spinner/>
                ) : (
                    <div>
                        {this.state.words.map(word => {
                            return (
                                    <div>
                                        <Row>
                                            <Username> {word}</Username>
                                        </Row>
                                    </div>
                                );

                        })}</div>
                )}
            </Container>
        );
    }

}

export default CompletedWords;