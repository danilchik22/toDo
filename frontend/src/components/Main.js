import Head from './Head';
import Footer from './Footer';
import Users from './Users'
import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = ({ year }) => {
    return (
        <div>
            <Head />
            <Footer year={year} />
        </div>
    )

}

export default Main;