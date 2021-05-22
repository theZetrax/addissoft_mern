import styled from 'styled-components'

const Button = styled.button`
    /* Color */
    color: white;
    background-color: green;

    /* Border */
    border-radius: 3px;
    border-style: none;

    /* Spacing */
    padding: 6px 12px;

    /* Font */
    font-size: medium;

    /* Events */
    :hover {
        background-color: #029202;
        cursor: pointer;
    }

    :active {
        background-color: #026e02;
    }
`

export default Button
