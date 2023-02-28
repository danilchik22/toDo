import Head from './Head';
import Footer from './Footer';
import Users from './Users'
import React from 'react';
import { Outlet } from 'react-router-dom';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Head auth={() => this.props.auth()} logout={() => this.props.logout()} />
                <Footer year />
            </div>
        )
    }


}

export default Main;