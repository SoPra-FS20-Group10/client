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


const WordsWrapper = styled.div`
    border-radius: 4pt;
    margin: 0pt;
    width: 100%;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Word = styled.label`
    padding-top: 5pt;
    margin: 0pt;
    
    font-size: 20px;
    width: 70%; 
   
    
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
            words: this.props.words,
            // gameId: this.props.gameId,
        };

    }

    componentDidMount() {
        this.setState({
            words: this.props.words,
        })

        setInterval( () => {this.setState({
            words: this.props.words,
        })}, 500);
    }

    // async componentDidMount() {
    //     try {
    //         setInterval(async () => {
    //             this.fetchWords();
    //         }, 1000);
    //     } catch (e) {
    //         console.log(e);
    //     }
    //
    // }
    //
    // // TODO: Remove or Finish
    // async fetchWords() {
    //     try {
    //         let response = await api.get("/games/" + this.state.gameId);
    //         let words = response.data;
    //
    //         this.setState({
    //             words: ["Hello", "World", "Hello", "World", "Hello", "World","Hello", "World","Hello", "World","Hello",
    //                 "World","Hello", "World","Hello", "World","Hello", "World","Hello", "World","Hello", "World",]
    //         })
    //
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    render() {
        return (
            <WordsWrapper>
                {!this.state.words ? (
                    <Spinner/>
                ) : (
                    <div>
                        {this.state.words.map(word => {
                            return (
                                    <div>
                                        <Row>
                                            <Word> {word}</Word>
                                        </Row>
                                    </div>
                                );

                        })}</div>
                )}
            </WordsWrapper>
        );
    }

}

export default CompletedWords;