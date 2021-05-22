import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsersBegin } from '../redux/reducers/actionCreator'

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
    users: state.user.userCollection,
    loading: state.user.loading,
    error: state.user.error,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
    fetchUsers: (): void => {
        dispatch(fetchAllUsersBegin())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
