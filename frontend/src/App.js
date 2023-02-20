import React from 'react';
import './App.css';
import Head from './components/Head';
import Footer from './components/Footer';
import Users from './components/Users'
import axios from 'axios'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Main from './components/Main'
import Projects from './components/Projects';
import ToDoList from './components/ToDo';
import UserList from './components/Users';
import ProjectDetail from './components/ProjectDetail';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'year': new Date().getFullYear(),
      'projects': [],
      'todos': []
    }
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      this.setState(
        {
          'users': response.data.results
        })
    }).catch(error => console.log(error)
    )
    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
      this.setState(
        {
          'projects': response.data.results
        })
    }).catch(error => console.log(error)
    )
    axios.get('http://127.0.0.1:8000/api/TODOs/').then(response => {
      this.setState(
        {
          'todos': response.data.results
        })
    }).catch(error => console.log(error)
    )
  }


  render() {
    return (
      <div className='container'>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main year={this.state.year} />}>
              <Route path="projects" element={<Projects users={this.state.users} projects={this.state.projects} />} />
              <Route path="projects/:id" element={<ProjectDetail projects={this.state.projects} users={this.state.users} />} />
              <Route path="users" element={<UserList users={this.state.users} />} />
              <Route path="todos" element={<ToDoList users={this.state.users} todos={this.state.todos} projects={this.state.projects} />} />
            </Route>

          </Routes>

        </BrowserRouter>

      </div>
    );
  }
}

export default App;
