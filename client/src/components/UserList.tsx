import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../redux/fetchAllReducer'

import UserCard from './UserCard'

interface Props {
    users: UserCollection
    fetchUsers: () => void
}

class UserList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render(): JSX.Element {
        const { users } = this.props

        return (
            <div>
                {users &&
                    users.map((user) => (
                        <UserCard key={user.userId} user={user} />
                    ))}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
    fetchUsers: (): void => {
        dispatch(ActionCreators.fetchAllBegin())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
