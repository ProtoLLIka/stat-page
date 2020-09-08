import React, { Component } from 'react'
import { ChartInterval } from '../../dto/charInterval'
import Chart from './chart';
import Discription from './discription';
import Loader from './common/loader';
import './provider.css'
import GroupByButtons from './groupByButtons';
import axios from 'axios';
import { serverURL } from '../App';
import { TaskChartDisc } from '../../dto/taskChartDisc';

interface ProviderProps {
    params: URLSearchParams
}
interface ProviderState {
    groupBy: 'week' | 'month' | 'day';
    activeInterval: ChartInterval;
    isDownloading: boolean;
    chartDate: ChartInterval[];
    discDate: TaskChartDisc[];
}

class Provider extends Component<ProviderProps, ProviderState> {
    constructor(props: ProviderProps) {
        super(props)
        this.state = {
            groupBy: 'day',
            activeInterval: new ChartInterval(),
            isDownloading: false,
            chartDate: [],
            discDate: []
        }
    }

    render() {
        return (
            <div className='statisticContainer'>
                {this.state.isDownloading && <Loader />}
                <GroupByButtons changeGroupBy={this.setGroupByMod} groupBy={this.state.groupBy} />
                <Chart barClick={this.onChartClick} param={this.props.params} chartDate={this.state.chartDate} getChartData={this.getChartData} groupBy={this.state.groupBy} />
                <Discription tasksDisc={this.state.discDate} />
            </div>
        )
    }

    async componentDidMount() {
        await this.getChartData()
    }

    onChartClick = (interval: ChartInterval) => {
        this.getTasksDisc(interval.start, interval.end)
        this.setState({ activeInterval: interval, isDownloading: true })
    }

    setDowloadingStatus = (value: boolean) => {
        this.setState({ isDownloading: value })
    }

    setGroupByMod = (value: 'week' | 'month' | 'day') => {
        this.setState({ groupBy: value })
    }

    getChartData = async (): Promise<ChartInterval[]> => {
        const userId = this.props.params.get('id')
        const groupBy = this.state.groupBy
        const endDate = new Date('04.14.2016').getTime()
        let startDate = new Date('04.14.2016').getTime()
        switch (groupBy) {
            case 'day':
                startDate = new Date(endDate).setDate(new Date(endDate).getDate() - 10)
                break;
            case 'week':
                startDate = new Date(endDate).setDate(new Date(endDate).getDate() - 70)
                break;
            case 'month':
                startDate = new Date(endDate).setDate(new Date(endDate).getDate() - 300)
                break;
            default: {
                throw new Error(`Type ${groupBy} not found. Send it as 'week', 'month', or 'day'`);
            }
        }
        if (!userId || !groupBy) return;
        //1451595600000 - 01.01.16
        await axios.get(`${serverURL}/statictic/chartData?id=${userId}&start=${startDate}&end=${endDate}&groupBy=${groupBy}`).then(o => {
            const data = o.data
            this.setState({ chartDate: data as ChartInterval[] })
        })
    }

    getTasksDisc = async (start: number, end: number): Promise<TaskChartDisc[]> => {
        const userId = this.props.params.get('id')
        if (!userId || !start || !end) return;
        await axios.get(`${serverURL}/statictic/tasksDisc?id=${userId}&start=${start}&end=${end}`)
            .then(o => {
                this.setState({ discDate: o.data as TaskChartDisc[], isDownloading: false })
            })
    }
}
export default Provider