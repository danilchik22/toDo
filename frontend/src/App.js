import React from 'react';
import './App.css';
import Head from './components/Head';
import Footer from './components/Footer';
import Users from './components/Users'
import axios, { AxiosHeaders } from 'axios'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Main from './components/Main'
import Projects from './components/Projects';
import ToDoList from './components/ToDo';
import UserList from './components/Users';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import Cookies from 'universal-cookie';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'year': new Date().getFullYear(),
      'projects': [],
      'todos': [],
      'token': "",

    }
  }

  set_token(token) {
    let cookie = new Cookies();
    cookie.set('token', token);
    this.state.token = token;
  }

  logout() {
    this.set_token("");
    this.setState({
      'users': [],
      'year': new Date().getFullYear(),
      'projects': [],
      'todos': [],
      'token': "",
    }
    )
  }

  get_token_from_cookie() {
    const cookie = new Cookies();
    const token = cookie.get('token');
    this.setState({ "token": token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/',
      { username: username, password: password }).then(response => {
        this.set_token(response.data.token);
        this.setState({ "token": response.data.token })
      }).catch(error => alert("Неверный логин или пароль")
      )

  }

  is_authenticated() {
    return this.state.token != "";
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers["Authorization"] = 'Token' + ' ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', { headers }).then(response => {
      this.setState(
        {
          'users': response.data.results
        })
    }).catch(error => console.log(error)
    )
    axios.get('http://127.0.0.1:8000/api/projects/', { headers }).then(response => {
      this.setState(
        {
          'projects': response.data.results
        })
    }).catch(error => console.log(error)
    )
    axios.get('http://127.0.0.1:8000/api/TODOs/', { headers }).then(response => {
      this.setState(
        {
          'todos': response.data.results
        })
    }).catch(error => console.log(error)
    )
  }

  componentDidMount() {
    this.get_token_from_cookie()
  }

  render() {
    return (
      <div className='container'>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main year={this.state.year} auth={() => this.is_authenticated()} logout={() => this.logout()} />}>
              <Route path="projects" element={<Projects users={this.state.users} projects={this.state.projects} />}>
                <Route path="projects/:id" element={<ProjectDetail projects={this.state.projects} users={this.state.users} />} />
              </Route>
              <Route path="login" element={<Login get_token={(username, password) => this.get_token(username, password)} />} />
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
