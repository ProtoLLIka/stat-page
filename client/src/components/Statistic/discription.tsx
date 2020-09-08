import React, { Component } from 'react'
import { TaskChartDisc } from '../../dto/taskChartDisc'
import './discription.css'

interface DiscriptionProps {
    tasksDisc: TaskChartDisc[]
}

class Discription extends Component<DiscriptionProps, {}> {

    render() {
        let tableTemplate: JSX.Element[];
        if (this.props.tasksDisc) {
            tableTemplate = this.props.tasksDisc.map((row, i) => {
                return (
                    <tr key={i}><td className='taskNameTd'><abbr title={row.name}><span className='taskName' data-title={row.name}>{row.name}</span></abbr></td>
                        <td className='score'>{row.score}</td>
                        <td className='date'> {new Date(parseInt(row.date.toString())).toLocaleString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
                    </tr>)
            })
        }
        return (
            <div className='discConteiner'>
                <table className='customers'>
                    <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Баллы</th>
                            <th>Дата</th>
                        </tr>
                        {tableTemplate}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Discription