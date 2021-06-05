import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from './../redux/createReducer'

import { Form, TextInput, SelectInput, GoButton } from './styled'

// importing fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

interface Props {
    created: boolean
    loading: boolean
    error: string | null
    createUser: (user: User) => void
}

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const GenderIconsContainer = styled.div`
    display: inline-flex;
    align-content: center;
    justify-content: center;
`

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
            <Form onSubmit={this.saveChanges}>
                <div>
                    <label htmlFor="username">User Full Name</label>
                    <br />
                    <FlexContainer>
                        <FontAwesomeIcon icon="user" />
                        <TextInput
                            type="text"
                            name="username"
                            id="username"
                            required
                        />
                    </FlexContainer>
                </div>
                <div>
                    <label htmlFor="birthdate">User Birth Date</label>
                    <br />
                    <FlexContainer>
                        <FontAwesomeIcon icon="calendar-alt" />
                        <TextInput
                            type="date"
                            name="birthdate"
                            id="birthdate"
                            required
                        />
                    </FlexContainer>
                </div>
                <div>
                    <label htmlFor="gender">User Gender</label>
                    <br />
                    <FlexContainer>
                        <GenderIconsContainer>
                            <FontAwesomeIcon icon="male" />
                            <span style={{ margin: '0 4px' }}>|</span>
                            <FontAwesomeIcon icon="female" />
                        </GenderIconsContainer>
                        <SelectInput name="gender" id="gender" required>
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </SelectInput>
                    </FlexContainer>
                </div>
                <div>
                    <label htmlFor="salary">User Salary</label>
                    <br />
                    <FlexContainer>
                        <FontAwesomeIcon icon="money-bill" />
                        <TextInput
                            type="number"
                            name="salary"
                            id="salary"
                            min="0"
                            step="100"
                            required
                        />
                    </FlexContainer>
                </div>
                <FlexContainer>
                    <GoButton type="submit">
                        <FontAwesomeIcon icon="plus-circle" /> Create
                    </GoButton>
                    <GoButton onClick={this.clearForm}>
                        <FontAwesomeIcon
                            icon="exclamation-circle"
                            style={{ paddingRight: '3px' }}
                        />
                        Cancel
                    </GoButton>
                </FlexContainer>
            </Form>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    loading: state.create.loading,
    created: state.create.success,
    error: state.create.error,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
    createUser: (user: User): void =>
        dispatch(ActionCreators.createUserBegin(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
