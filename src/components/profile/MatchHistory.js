import styled from "styled-components";
import * as React from "react";
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from "react-bootstrap/Col";


const MatchHistoryWrapper = styled.div`
    margin: 0pt;
    // width: 100%;
    
    
    color: white;
    // display: flex;
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
    border-radius: 4pt;
    padding-top: 10pt;
    padding-bottom: 10pt;
    margin-top: 5pt;
    margin-left: 10pt;
    margin-right: 10pt;
    
    background: rgba(77, 77, 77, 0.9);
    // margin: 0pt;
    
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
                                    {matches.reverse().map(matchdata => {
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