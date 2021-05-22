import React from 'react'

interface Props {
    user: User | null
    loading: boolean
    error: string | null
}

class AddUser extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        this.saveChanges = this.saveChanges.bind(this)
    }

    saveChanges(e: React.MouseEvent): void {
        e.preventDefault()
    }

    render(): JSX.Element {
        return <div>User</div>
    }
}

export default AddUser
