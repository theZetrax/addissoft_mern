import React from 'react'

interface Props {
    user: User
    loading: boolean
    error: string | null
}

class UserCard extends React.Component<Props> {}

export default UserCard
