import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Statistic from './Statistic/statistic.tsx'
import AdminAuthPage from './AdminAuthPage/'
import Page404 from './Page404/index.tsx'
export const serverURL = 'http://localhost:4000'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutPupil: '',
            dataY: []
        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/admin" component={AdminAuthPage} />
                    <Route path="/statistics" component={Statistic} />
                    <Route path="*" component={Page404} />
                </Switch>
            </Router>
        )
    }
    updateAboutPupil = (value) => {
        this.setState({ aboutPupil: value })
    }



}
export default App;
