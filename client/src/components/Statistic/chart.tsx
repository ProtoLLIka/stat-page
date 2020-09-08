import React, { Component } from 'react'
import './chart.css';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ChartInterval } from '../../dto/charInterval';
import NoData from './common/noData';
import { ChartData } from '../../dto/chartData';
import { GroupBy } from '../../utils';

interface ChartProps {
    barClick(interval: ChartInterval): void;
    getChartData(): Promise<ChartInterval[]>;
    param: URLSearchParams;
    chartDate: ChartInterval[];
    groupBy: GroupBy
}
interface ChartState {
    params: URLSearchParams;
    chartDate: ChartInterval[];
    groupBy: GroupBy
}

class Chart extends Component<ChartProps, ChartState> {
    constructor(props) {
        super(props)
        this.state = {
            params: new URLSearchParams(),
            chartDate: [],
            groupBy: 'week'
        }
    }

    render() {
        const data = this.props.chartDate as ChartInterval[]
        return (
            <div className={'chartConteiner'}>

                {!this.getBarData(data).some(el => el.y !== 0) && <NoData />}
                {this.getBarData(data).some(el => el.y !== 0) &&
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart
                            data={this.getBarData(data)}
                            margin={{
                                top: 10, right: 10, left: 0, bottom: 10,
                            }}>
                            <CartesianGrid strokeDasharray='5 1' />
                            <XAxis dataKey='x' angle={-10} dy={7} tick={{ fontSize: 12 }} interval={0} />
                            <YAxis type='number' tick={{ fontSize: 15 }} />
                            <Tooltip />
                            <Bar name='Баллы' dataKey='y' fill='#17939b' onClick={(data, index) => this.onBarClick(index)} />
                        </BarChart>
                    </ResponsiveContainer>}
            </div >
        )
    }

    componentDidUpdate() {
        if (this.props.groupBy === this.state.groupBy) return;
        this.setState({ groupBy: this.props.groupBy })
        this.props.getChartData()
    }
    onBarClick = (indexBar: number) => {
        const data = this.props.chartDate as ChartInterval[]
        let bar = data[indexBar] as ChartInterval
        this.props.barClick(bar)//this.onBarClick(data)}
    }

    getBarData(data: ChartInterval[]): ChartData[] {
        let chartData: ChartData[] = []
        data.map(el => {
            let chartBar = new ChartData();
            chartBar.x = this.getBarName(el.start || 0, el.end || 0);
            chartBar.y = parseInt((el.value || 0).toString());
            chartData.push(chartBar)
            return el;
        })
        return chartData
    }
    getBarName(start: number, end: number): string {
        let barName = ''
        if (new Date(end).getDate() - new Date(start).getDate() !== 0) {
            let optionsWeek = { month: 'short', day: 'numeric' };
            const startDate = new Date(start)
            const endDate = new Date(end - 1000)
            barName = `${startDate.toLocaleString('ru', optionsWeek)} - ${endDate.toLocaleString('ru', optionsWeek)}`
        } else {
            let optionsWeek = { month: 'short' };
            barName = `${new Date(start).toLocaleString('ru', optionsWeek)[0].toUpperCase() + new Date(start).toLocaleString('ru', optionsWeek).substring(1)}\n${new Date(start).getFullYear()}`
        }
        if (new Date(end).getDate() - new Date(start).getDate() === 1) {
            let optionsWeek = { month: 'short', day: 'numeric' };
            barName = `${new Date(start).toLocaleString('ru', optionsWeek)}`
        }
        return barName
    }
}

export default Chart