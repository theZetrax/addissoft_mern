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
                    <StyledButton
                        style={{ margin: '2px 4px' }}
                        onClick={this.handleEdit}>
                        Edit
                    </StyledButton>
                    <StyledButton onClick={this.handleDelete}>
                        Delete
                    </StyledButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    loading: state.user.loading,
    error: state.user.error,
})

// const mapDispatchToProps = (dispatch: DispatchType) => {}

export default connect(mapStateToProps)(UserCard)
