import Button from './button'
import styled from 'styled-components'

const AngryButton = styled(Button)`
    background-color: red;
    color: white;

    :hover {
        background-color: #e61515;
    }

    :active {
        background-color: #f53535;
    }
`
export default AngryButton
