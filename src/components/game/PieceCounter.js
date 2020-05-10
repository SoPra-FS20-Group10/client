import styled from "styled-components";
import * as React from "react";
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

const Username = styled.label`
    border-radius: 4pt;
    padding-top: 5pt;
    padding-bottom: 5pt;
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

    componentDidMount() {
        this.setState({
            piecesLeft: this.props.piecesLeft,
        })

        setInterval(() => {
            this.setState({
                piecesLeft: this.props.piecesLeft,
            })
        }, 500);
    }

    render() {
        return (
            <Container style={{
                // These style attributes make text unselectable on most browsers & versions
                userSelect: 'none',
                webkitTouchCallout: 'none',
                webkitUserSelect: 'none',
                khtmlUserSelect: 'none',
                mozUserSelect: 'none',
                msUserSelect: 'none'
            }}>
                {!this.state.piecesLeft ? (
                    <div>
                        <Row>
                            <Username>
                                <Spinner/>
                            </Username>
                        </Row>
                    </div>
                ) : (
                    <div>
                        <Row>
                            <Username> {this.state.piecesLeft.length}</Username>
                        </Row>
                    </div>
                )}
            </Container>
        );
    }

}

export default PieceCounter;