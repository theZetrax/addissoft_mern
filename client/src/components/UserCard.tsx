import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Custom library
import * as deleteReducer from '../redux/deleteReducer'
import * as updateReducer from '../redux/updateReducer'
import { GoButton, TextInput, SelectInput } from './styled'

interface Props {
    user: User
    loading: boolean
    error: string | null
    updateState: UserActionState
    deleteUser: (user: User) => void
    updateUser: (user: User) => void
}

interface State {
    editing: boolean
}

const CardDiv = styled.div`
    width: 300px;
`

class UserCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            editing: false,
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleGenderSelect = this.handleGenderSelect.bind(this)
    }

    handleDelete() {
        this.props.deleteUser(this.props.user)
        console.log('deleting')
    }

    handleEdit() {
        this.setState({
            editing: !this.state.editing,
        })
    }

    handleSave(e: React.SyntheticEvent) {
        e.preventDefault()

        const editForm = e.target as HTMLFormElement
        const updateUserData = {
            userId: (editForm['user-id'] as unknown as HTMLInputElement).value,
            name: (editForm.name as unknown as HTMLInputElement).value,
            birth_date: (editForm['birth-date'] as unknown as HTMLDataElement)
                .value,
            gender: (editForm.gender as unknown as HTMLSelectElement).value,
            salary: (editForm.salary as unknown as HTMLInputElement).value,
        } as User

        console.log('handleSave', updateUserData)
        this.props.updateUser(updateUserData)

        this.setState({
            editing: !this.state.editing,
        })
    }
    handleGenderSelect() {
        console.log('handling gender select')
    }

    render(): JSX.Element {
        const { user } = this.props
        const isEditing = this.state.editing

        return (
            <CardDiv>
                {isEditing ? (
                    <form onSubmit={this.handleSave}>
                        <h4>Editing User: {user.name}</h4>
                        <input
                            type="hidden"
                            name="user-id"
                            id="user-id"
                            value={user.userId as unknown as string}
                        />
                        <TextInput
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user.name}
                            onChange={() => console.log('Change')}
                        />
                        <br />
                        <TextInput
                            type="date"
                            name="birth-date"
                            id="birth-date"
                            defaultValue={user.birth_date}
                            onChange={(e) => console.log(e)}
                        />
                        <br />
                        <SelectInput
                            name="gender"
                            id="gender"
                            defaultValue={user.gender.toLowerCase()}
                            onChange={this.handleGenderSelect}>
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </SelectInput>
                        <br />
                        <TextInput defaultValue={user.salary} name="salary" />
                        <div>
                            <GoButton type="submit">Save</GoButton>
                            <GoButton onClick={this.handleDelete}>
                                Delete
                            </GoButton>
                        </div>
                    </form>
                ) : (
                    <div>
                        <h4>{user.name}</h4>
                        <p>{user.birth_date}</p>
                        <p>{user.gender}</p>
                        <p>{user.salary}</p>
                        <div>
                            <GoButton onClick={this.handleEdit}>Edit</GoButton>
                            <GoButton onClick={this.handleDelete}>
                                Delete
                            </GoButton>
                        </div>
                    </div>
                )}
            </CardDiv>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    loading: state.create.loading,
    error: state.create.error,
    updateState: state.update,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
    deleteUser: (user: User): void =>
        dispatch(deleteReducer.ActionCreator.deleteBegin(user)),
    updateUser: (user: User): void =>
        dispatch(updateReducer.ActionCreator.updateBegin(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)
