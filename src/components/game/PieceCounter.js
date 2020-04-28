import styled from "styled-components";
import * as React from "react";
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

const Username = styled.label`
    border-radius: 4pt;
    padding-top: 5pt;
    margin: 0pt;
    margin-bottom:1em;
    width: 100%;
    font-size: 20px;
    background: rgba(77, 77, 77, 0.9);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

// TODO: Pass real piecesLeft count from GamePage (there it should have a method getting the game anyway)
class PieceCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piecesLeft: this.props.piecesLeft,
        };
    }

    render() {
        return (
            <Container>
                {!this.state.piecesLeft ? (
                    <Spinner/>
                ) : (
                    <div>
                        <div>
                            <Row>
                                <Username> {this.state.piecesLeft}</Username>
                            </Row>
                        </div>
                    </div>
                )}
            </Container>
        );
    }

}

export default PieceCounter;