import React, { Component } from 'react';
import  {Line} from "react-chartjs-2";
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
class Chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
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

                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        }
    }

    render() {
        return(
                <Line
                    options={{
                        legend: {
                            labels: {
                                fontColor: "white",
                                fontSize: 18
                            }
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'X axe name',
                                    fontColor:'white',
                                    fontSize:10
                                },
                                ticks: {
                                    fontColor: "white",
                                    fontSize: 14
                                },
                                gridLines: {
                                    color: "white"
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Y axe name',
                                    fontColor: 'white',
                                    fontSize:10
                                },
                                ticks: {
                                    fontColor: "white",
                                    fontSize: 14
                                },
                                gridLines: {
                                    color: "white"
                                }
                            }]
                        }

                    }}
                    data={this.state.data}
                />
        )
    }
}

export default Chart;