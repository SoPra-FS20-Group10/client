import styled from "styled-components";
import * as React from "react";
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from "react-bootstrap/Col";


const MatchHistoryWrapper = styled.div`
    border-radius: 4pt;
    margin: 0pt;
    margin-top: 10pt;
    // width: 100%;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    // These style attributes make text unselectable on most browsers & versions
    user-select: none;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
`;


const Match = styled.label`
    padding-top: 10pt;
    padding-bottom: 10pt;
    margin: 0pt;
    
    font-size: 20px;
    // width: 70%; 
   
    
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const MatchHistory = ({matches}) => {
    return (
        <div>
            Match History
            <MatchHistoryWrapper>
                <div>
                    {!matches ? (
                        <Spinner/>
                    ) : (
                        <div>
                            {matches.length == 0 ? (
                                <div>
                                    <Row>
                                        <Match>No game played yet</Match>
                                    </Row>
                                </div>
                            ) : (
                                <div>
                                    {matches.map(matchdata => {
                                        return (
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <Match> {matchdata}</Match>
                                                    </Col>
                                                </Row>
                                            </div>
                                        );

                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </MatchHistoryWrapper>
        </div>
    )
};
export default MatchHistory