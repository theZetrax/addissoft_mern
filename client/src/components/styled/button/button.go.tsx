import styled from 'styled-components'
import Button from './button'

const GoButton = styled(Button)`
    background-color: green;
    width: 100%;

    margin: 4px 8px;

    :hover {
        background-color: #029202;
    }

    :active {
        background-color: #026e02;
    }
`

export default GoButton
