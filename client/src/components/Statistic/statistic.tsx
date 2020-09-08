import React, { Component } from 'react'
import './statistic.css'
import Provider from './provider';
import ReactDOM from 'react-dom';
import Page404 from '../Page404/index'
import { ChartInterval } from '../../dto/charInterval'

interface StatisticProbs {
    params: string;
}
interface StatisticState {
    pupilId: string,
    startUserDate: number,
    chartData: ChartInterval[],
}

class Statistic extends Component<StatisticProbs, StatisticState> {
    constructor(props: StatisticProbs) {
        super(props)
        this.state = {
            pupilId: '',
            startUserDate: 0,
            chartData: []
        }
    }

    render() {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('id') === null) {
            ReactDOM.render(<Page404 />, document.getElementById('root'));
        }
        return (
            <div>
                <Provider params={urlParams} />
            </div >
        )
    }

}

export default Statistic