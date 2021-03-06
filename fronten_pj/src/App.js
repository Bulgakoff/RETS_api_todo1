import React from 'react'
import UserList from './components/User.js'
import TodoList from './components/Todo.js'
import ProjectList from './components/Project.js'
import PtuList from './components/Ptu.js'
import UserTodoList from './components/UserTodo.js'
import ProjectUserList from './components/ProjectUser.js'
import TodoIdProjectList from './components/TodoPjUsers.js'
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import TodoForm from "./components/TodoForm";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {

    constructor(props) {
        super(props)
        // const user1 = {id: 1, username: 'admin123', date_joined: '2022-01-02'}
        // const user2 = {id: 2, username: 'Alesha', date_joined: '2022-01-04'}
        // const users = [user1, user2]
        //
        // const todo1 = {id: 1, text: 'отжатся отт стенки 10 раз', created_at: '2022-01-02'}
        // const todo2 = {id: 2, text: 'убрать в багажнике', created_at: '2022-01-05'}
        // const todo3 = {id: 3, text: 'участие в соревнованиях', created_at: '2022-01-06'}
        // const todo4 = {id: 4, text: 'ВНЕСТИ МУСОР', created_at: '2022-01-07'}
        // const todoes = [todo1, todo2, todo3, todo4]
        //
        // const project1 = {id: 1, name: 'спорт'}
        // const project2 = {id: 2, name: 'семья'}
        // const project3 = {id: 3, name: 'авто'}
        // const projects = [project1, project2, project3]
        //
        // const ptu1 = {id: 1, project_id: project1, todo_id: todo1, user_id: user1}
        // const ptu2 = {id: 2, project_id: project2, todo_id: todo4, user_id: user2}
        // const ptu3 = {id: 3, project_id: project3, todo_id: todo2, user_id: user1}
        // const ptu4 = {id: 4, project_id: project1, todo_id: todo3, user_id: user1}
        // const ptus = [ptu1, ptu2, ptu3, ptu4]

        this.state = {
            // 'users': users,
            // 'todoes': todoes,
            // 'projects': projects,
            // 'ptus': ptus
            'users': [],
            'todoes': [],
            'projects': [],
            'ptus': []
        }
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/viewsets/todo_base/${id}`, {headers})
            .then(response => {
                this.setState({todoes: this.state.todoes.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    // ====================# создание новой книги  из формы ...
    createTodo(text, todo, user, project) { // сюда прилетит из формы  в итоге text= текст и user= id выбранного user
        const headers = this.get_headers()
        const data = {todo_id: todo, user_id: user, project_id: project}
        axios.post(`http://127.0.0.1:8000/viewsets/pj_to_users_base/`, data, {headers})
            .then(response => {
                console.log(response.data)
                let new_ptu = response.data
                const user = this.state.users.filter((item) => item.id === new_ptu.user_id)[0]
                const project = this.state.projects.filter((item) => item.id === new_ptu.project_id)[0]
                const todo = this.state.todoes.filter((item) => item.id > 0)[0]
                new_ptu.user_id = user
                new_ptu.project_id = project
                todo.text = text
                new_ptu.todo_id = todo
                console.log(new_ptu)

                this.setState({ptus: [...this.state.ptus, new_ptu]})
            }).catch(error => console.log(error))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/viewsets/user_base', {headers})
            .then(response => {
                console.log(response.data)
                this.setState({users: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/viewsets/todo_base/', {headers})
            .then(response => {
                console.log(response.data)
                this.setState({todoes: response.data})
            }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/viewsets/pj_base/', {headers})
            .then(response => {
                console.log(response.data)
                this.setState({projects: response.data})
            }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/viewsets/pj_to_users_base/', {headers})
            .then(response => {
                console.log(response.data)
                this.setState({ptus: response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data()
    }

    render() {
        return (
            <div className="App">
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/todoes'>todoes</Link>
                            </li>
                            <li>
                                <Link to='/projects'>projects</Link>
                            </li>
                            <li>
                                <Link to='/ptu_info'>Ptus</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList items={this.state.users}/>}/>
                        <Route exact path='/todoes' component={() => <TodoList items={this.state.todoes}
                                                                               deleteTodo={(id) => this.deleteTodo(id)}/>}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>}/>
                        <Route exact path='/ptu_info' component={() => <PtuList items={this.state.ptus}/>}/>

                        <Route exact path='/todoes/create' component={() =>
                            <TodoForm users={this.state.users}
                                      projects={this.state.projects}
                                      todoes={this.state.todoes}
                                      createTodo={(text, todo, user, project) =>
                                          this.createTodo(text, todo, user, project)}/>}/>

                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route path="/project/:id">
                            <ProjectUserList items={this.state.ptus}/>
                        </Route>
                        <Route path="/user/:id">
                            <UserTodoList items={this.state.ptus}/>
                        </Route>
                        <Route path="/todo/:id">
                            <TodoIdProjectList items={this.state.ptus}/>
                        </Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App;