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
import ProjectForm from './components/ProjectForm';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'year': new Date().getFullYear(),
      'projects': [],
      'todos': [],
      'nameuser': "",
      'token': "",


    }
  }

  setToken(token) {
    let cookie = new Cookies();
    cookie.set('token', token);
    this.state.token = token;
  }

  logout() {
    this.setToken("");
    this.setState({
      'users': [],
      'year': new Date().getFullYear(),
      'projects': [],
      'todos': [],
      'token': "",
      'nameuser': "",
    }
    )
  }

  getTokenFromCookie() {
    const cookie = new Cookies();
    const token = cookie.get('token');
    this.setState({ "token": token }, () => this.loadData())
  }

  getToken(nameuser, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/',
      { username: nameuser, password: password }).then(response => {
        this.setToken(response.data.token);
        this.setState({ "token": `${response.data.token}`, "nameuser": `${nameuser}` })
        console.log(nameuser)
      }).catch(error => alert("Неверный логин или пароль")
      )

  }

  isAuthenticated() {
    return !!this.state.token;
  }

  getHeaders() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.isAuthenticated()) {
      headers["Authorization"] = 'Token' + ' ' + this.state.token
    }
    return headers
  }

  loadData() {
    const headers = this.getHeaders()
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

  deleteProject(id) {
    const headers = this.getHeaders()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
      .then(response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      })
  }

  createProject(projectName, projectUrl, user_proj) {
    const headers = this.getHeaders()
    const data = { name: projectName, url: projectUrl, users: user_proj }
    axios.post("http://127.0.0.1:8000/api/projects/", data, { headers })
      .then(response => {
        let new_project = response.data
        let users = this.state.users.filter((item) => new_project.users.includes(item.id))
        new_project.users = users
        this.setState({ projects: [...this.state.books, new_project] })
      })
  }

  componentDidMount() {
    this.getTokenFromCookie()
  }


  render() {
    return (
      <div className='container'>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main nameuser={this.state.nameuser} year={this.state.year} auth={() => this.isAuthenticated()} logout={() => this.logout()} />}>
              <Route path="projects" element={<Projects users={this.state.users} projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />}>
                <Route path=":id/" element={<ProjectDetail projects={this.state.projects} users={this.state.users} />} />
              </Route>
              <Route path="createproject/" element={<ProjectForm users={this.state.users} createProject={(projectName, projecturl, users) => this.createProject(projectName, projecturl, users)} />} />
              <Route path="login" element={<Login auth={() => this.isAuthenticated()} get_token={(username, password) => this.getToken(username, password)} />} />
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
