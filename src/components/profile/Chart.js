import React, {Component} from 'react';
import {Line} from "react-chartjs-2";
import styled from "styled-components";

const GraphWrapper = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    padding: 5%;
    width: 100%;
    background: grey;
    float:left;
    color: white;
     
`;
//
// class Chart extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             matches: this.props.matches,
//             data: {
//                 labels: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
//                 datasets: [
//                     {
//                         // label: 'My First dataset',
//                         // fill: false,
//                         lineTension: 0.1,
//                         backgroundColor: 'rgba(75,192,192,0.4)',
//                         borderColor: 'rgba(75,192,192,1)',
//                         borderCapStyle: 'butt',
//                         borderDash: [],
//                         borderDashOffset: 0.0,
//                         borderJoinStyle: 'miter',
//                         pointBorderColor: 'rgba(75,192,192,1)',
//                         pointBackgroundColor: '#fff',
//                         pointBorderWidth: 1,
//                         pointHoverRadius: 5,
//                         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//                         pointHoverBorderColor: 'rgba(220,220,220,1)',
//                         pointHoverBorderWidth: 2,
//                         pointRadius: 1,
//                         pointHitRadius: 10,
//                         labelColor: 'white',
//
//                         // data: [65, 59, 80, 81, 56, 55, 40]
//                         data: this.props.matches
//                     }
//                 ]
//             }
//         }
//
//         this.setState({matches: this.props})
//         console.log(this)
//     }

// render() {
const Chart = ({matches}) => {
    let data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                // label: 'My First dataset',
                // fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                labelColor: 'white',

                // data: [65, 59, 80, 81, 56, 55, 40]
                data: matches
            }
        ]
    }
    return (
        <Line
            options={{
                legend: {
                    display: false,
                    labels: {
                        fontColor: "rgba(0, 0, 0, 0.87)",
                        fontSize: 18
                    }
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Past 10 Games',
                            fontColor: 'rgba(0, 0, 0, 0.87)',
                            fontSize: 10
                        },
                        ticks: {
                            reverse: true,
                            fontColor: "rgba(0, 0, 0, 0.87)",
                            fontSize: 14
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.87)',
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Score',
                            fontColor: 'rgba(0, 0, 0, 0.87)',
                            fontSize: 10
                        },
                        ticks: {
                            beginAtZero: true,
                            fontColor: "rgba(0, 0, 0, 0.87)",
                            fontSize: 14
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.87)',
                            drawOnChartArea: false
                        }
                    }]
                }

            }}
            data={data}
        />
    )
    // }
}

export default Chart;