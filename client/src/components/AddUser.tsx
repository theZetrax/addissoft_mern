import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from './../redux/createReducer'

interface Props {
    created: boolean
    loading: boolean
    error: string | null
    createUser: (user: User) => void
}

class AddUser extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        this.saveChanges = this.saveChanges.bind(this)
        this.clearForm = this.clearForm.bind(this)
    }

    saveChanges(e: React.SyntheticEvent): void {
        e.preventDefault()
        const createForm = e.target as HTMLFormElement
        
        const user: User = {
            name: createForm.username.value,
            birth_date: createForm.birthdate.value,
            gender: createForm.gender.value,
            salary: createForm.salary.value,
        } as User

        console.log('creating', user)

        this.props.createUser(user)
    }

    clearForm(e: React.SyntheticEvent): void {
        e.preventDefault()

        const cancelBtn: HTMLButtonElement = e.target as HTMLButtonElement
        const formElement: HTMLFormElement = cancelBtn.parentElement
            ?.parentElement as HTMLFormElement

        if (formElement) {
            formElement.reset()
        }
    }

    render(): JSX.Element {
        return (
            <form onSubmit={this.saveChanges}>
                <div>
                    <label htmlFor="username">User Full Name</label>
                    <br />
                    <input type="text" name="username" id="username"  required/>
                </div>
                <div>
                    <label htmlFor="birthdate">User Birth Date</label>
                    <br />
                    <input type="date" name="birthdate" id="birthdate" required/>
                </div>
                <div>
                    <label htmlFor="gender">User Gender</label>
                    <br />
                    <select name="gender" id="gender" required>
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="salary">User Salary</label>
                    <br />
                    <input
                        type="number"
                        name="salary"
                        id="salary"
                        min="0"
                        step="100"
                        required
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                    <button onClick={this.clearForm}>Cancel</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    loading: state.create.loading,
    created: state.create.created,
    error: state.create.error,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
    createUser: (user: User): void =>
        dispatch(ActionCreators.createUserBegin(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
