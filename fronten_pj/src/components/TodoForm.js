import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props.users[0])
        // console.log(props.users[0].id)
        this.state = {text: '', todo: props.todoes[0].id, user: props.users[0].id, project: props.projects[0].id}
        // this.state = {text: '', user: props.users[0].id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        // console.log(this.state.text)
        // console.log(this.state.user)
        // console.log(this.state.project)
        // console.log(this.state.todo)
        this.props.createTodo(this.state.text, this.state.todo, this.state.user, this.state.project)
        event.preventDefault()
    }

    render() {

        return (

            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>


                <div className="form-group">
                    <label for="user">user</label>

                    <select name="user" className='form-control' onChange={(event) =>
                        this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>

                </div>

                <div className="form-group">
                    <label for="project">project</label>

                    <select name="project" className='form-control' onChange={(event) =>
                        this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>

                </div>

                <div className="form-group">
                    <label for="todo">ToDo</label>

                    <select name="todo" className='form-control' onChange={(event) =>
                        this.handleChange(event)}>
                        {this.props.todoes.map((item) => <option value={item.id}>{item.text}</option>)}
                    </select>

                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}


//         return (
//             <form onSubmit={(event) => this.handleSubmit(event)}>
//                 <div className="form-group">
//                     <label for="login">text</label>
//                     <input type="text" className="form-control" name="text" value={this.state.text}
//                            onChange={(event) => this.handleChange(event)}/>
//                 </div>
//
//                 <div className="form-group">
//                     <label for="user">user</label>
//
//                     <input type="number" className="form-control" name="user" value={this.state.user}
//                            onChange={(event) => this.handleChange(event)}/>
//
//
//                 </div>
//                 <input type="submit" className="btn btn-primary" value="Save"/>
//             </form>
//         );
//     }
// }

export default TodoForm