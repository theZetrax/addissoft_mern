import React from 'react'
import { connect } from 'react-redux'
import {} from '../redux/reducers/actionTypes'
import { StyledButton } from '../components-styled'

interface Props {
    user: User
    loading: boolean
    error: string | null
}

interface State {
    editing: boolean
}

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
        console.log('deleting')
    }

    handleEdit() {
        console.log('editing')
        this.setState({
            editing: !this.state.editing,
        })
    }

    handleSave() {
        console.log('handling save')
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
            <div>
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => console.log('Change')}
                        />
                        <br />
                        <input
                            type="date"
                            value={user.birth_date}
                            onChange={(e) => console.log(e)}
                        />
                        <br />
                        <select
                            name="gender"
                            id="gender"
                            value={user.gender === 'Female' ? '1' : '0'}
                            onChange={this.handleGenderSelect}>
                            <option value="">Select Gender</option>
                            <option value="1">Female</option>
                            <option value="0">Male</option>
                        </select>
                    </div>
                ) : (
                    <div>
                        <h4>{user.name}</h4>
                        <p>{user.birth_date}</p>
                        <p>{user.gender}</p>
                        <p>{user.salary}</p>
                    </div>
                )}
                <div>
                    {isEditing ? (
                        <StyledButton
                            style={{ margin: '2px 4px' }}
                            onClick={this.handleSave}>
                            Save
                        </StyledButton>
                    ) : (
                        <StyledButton
                            style={{ margin: '2px 4px' }}
                            onClick={this.handleEdit}>
                            Edit
                        </StyledButton>
                    )}
                    <StyledButton onClick={this.handleDelete}>
                        Delete
                    </StyledButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    loading: state.create.loading,
    error: state.create.error,
})

// const mapDispatchToProps = (dispatch: DispatchType) => {}

export default connect(mapStateToProps)(UserCard)
