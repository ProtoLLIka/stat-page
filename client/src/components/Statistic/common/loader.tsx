import React, { Component } from 'react';
import './loader.css';
import { Sugar } from 'react-preloaders';

class Loader extends Component<{}, {}> {
    render() {
        return (
            <div className={'loaderContainer'} >
                <Sugar color={'#17939b'} background='#ffffff90' time={1000000} />
            </div>
        )
    }
}

export default Loader