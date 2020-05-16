import styled from "styled-components";
import * as React from "react";
import Row from 'react-bootstrap/Row'
import {Spinner} from '../../views/design/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from "react-bootstrap/Col";


const WordsWrapper = styled.div`
    border-radius: 4pt;
    margin: 0pt;
    width: 100%;
    
    background: rgba(77, 77, 77, 0.9);
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    
    // These style attributes make text unselectable on most browsers & versions
    user-select: none;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none;
`;


const Word = styled.label`
    padding-top: 10pt;
    padding-bottom: 10pt;
    margin: 0pt;
    
    font-size: 20px;
    width: 70%; 
   
    
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CompletedWords = ({words}) => {
    return (
        <WordsWrapper>
            {!words ? (
                <Spinner/>
            ) : (
                <div>
                    {words.length == 0 ? (
                        <div>
                            <Row>
                                <Word>No words played yet</Word>
                            </Row>
                        </div>
                    ) : (
                        <div>
                            {words.map(worddata => {
                                return (
                                    <div>
                                        <Row>
                                            <Col>
                                                <Word> {worddata.word}</Word>
                                            </Col>
                                            <Col>
                                                <Word> {worddata.value}</Word>
                                            </Col>
                                        </Row>
                                    </div>
                                );

                            })}
                        </div>
                    )}
                </div>
            )}
        </WordsWrapper>
    )
};
export default CompletedWords


// // TODO: Pass words from GamePage (there it should have a method getting the game anyway)
// class CompletedWords extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             words: [],
//         };
//
//     }
//
//     // TODO: Fix?
//     componentDidMount() {
//         console.log(this.state.props)
//         this.getWords();
//
//         this.timerID = setInterval(() => {
//             this.getWords();
//         }, 500);
//     }
//
//     async getWords(){
//         let words = await api.get("/games/" + this.state.gameId + "/words");
//         console.log(words.data)
//         console.log(words.data.length==0)
//         this.setState({words: words.data});
//     }
//
//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }
//
//     // async componentDidMount() {
//     //     try {
//     //         setInterval(async () => {
//     //             this.fetchWords();
//     //         }, 1000);
//     //     } catch (e) {
//     //         console.log(e);
//     //     }
//     //
//     // }
//     //
//     // // TODO: Remove or Finish
//     // async fetchWords() {
//     //     try {
//     //         let response = await api.get("/games/" + this.state.gameId);
//     //
//     //         let words = response.data;
//     //
//     //         this.setState({
//     //             words: ["Hello", "World", "Hello", "World", "Hello", "World","Hello", "World","Hello", "World","Hello",
//     //                 "World","Hello", "World","Hello", "World","Hello", "World","Hello", "World","Hello", "World",]
//     //         })
//     //
//     //     }catch(error){
//     //         console.log(error);
//     //     }
//     // }
//
//     render() {
//         return (
//             <WordsWrapper>
//                 {this.state.words == [] ? (
//                     <Spinner/>
//                 ) : (
//                     <div>
//                         {!this.state.words ? (
//                             <div>
//                                 <Row>
//                                     <Word>Nothing</Word>
//                                 </Row>
//                             </div>
//                         ) : (
//                             <div>
//                                 {this.state.words.map(word => {
//                                     return (
//                                         <div>
//                                             <Row>
//                                                 <Word> {word}</Word>
//                                             </Row>
//                                         </div>
//                                     );
//
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </WordsWrapper>
//         );
//     }
//
// }
//
// export default CompletedWords;

