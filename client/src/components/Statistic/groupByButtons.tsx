import React, { Component } from 'react'
import './groupByButtons.css';
import { GroupBy } from '../../utils';
import { group } from 'console';

interface GroupByProps {
    groupBy: GroupBy;
    changeGroupBy(value: GroupBy): void
}

class GroupByButtons extends Component<GroupByProps, {}>{
    types = [{
        btnName: 'по дням',
        type: 'day'
    },
    {
        btnName: 'по неделям',
        type: 'week'
    },
    {
        btnName: 'по месяцам',
        type: 'month'
    }];
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        let btns = this.types.map(el => (<button disabled={this.props.groupBy === el.type} className={this.props.groupBy === el.type ? 'active switcher' : 'passive switcher'} onClick={() => { this.setGroupByWeek(el.type as GroupBy) }}>
            {el.btnName}</button>))
        return (
            <div className='groupByButtonContainer'>
                {btns}
            </div>
        )
    }

    setGroupByWeek = (groupBy: GroupBy) => {
        this.props.changeGroupBy(groupBy);
    }
}

export default GroupByButtons