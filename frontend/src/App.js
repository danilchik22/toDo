import React from 'react';
import logo from './logo.svg';
import './App.css';
import Head from './components/Head';
import Footer from './components/Footer';
import Users from './components/Users'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'year': new Date().getFullYear()
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      this.setState(
        {
          'users': response.data
        })
    }).catch(error => console.log(error)
    )

  }

  render() {
    return (
      <div>
        <Head />
        <Footer year={this.state.year} />
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default App;
