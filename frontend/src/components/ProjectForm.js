import React from 'react'
class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { projectName: '', projectUrl: 0, projectUsers: [] }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        console.log(this.state.projectName)
        console.log(this.state.projectUrl)
        console.log(this.state.projectUsers)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label>Project Name
                        <input type="text" className="form-control" name="projectName"
                            value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>URL Project
                        <input type="text" className="form-control" name="projectUrl"
                            value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>URL Project
                        <select className="form-control" name="projectUsers" multiple="multiple" size="4"
                            value={this.state.name} onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) => <option
                                value={item.id}>{item.name}</option>)}
                        </select>

                    </label>
                </div>

            </form >
        )
    }
}

export default ProjectForm