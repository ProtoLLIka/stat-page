import React, { Component } from 'react';
import './noData.css';

class NoData extends Component<{}, {}> {
    render() {
        return (
            <div className={'noDataConteiner'} >
                <span className={'noDataText'} >За этот период данных нет</span>
            </div>
        )
    }
}

export default NoData