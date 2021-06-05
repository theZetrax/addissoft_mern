import styled from 'styled-components'

const TextInput = styled.input`
    /* display: */
    box-sizing: content-box;
    border: solid 3px;
    border-color: #cee9a6;
    border-radius: 3px;

    margin: 6px 8px;
    padding: 2px;

    background: #cee9a6;
    width: 100%;

    :focus {
        border-color: #bdc9ac;
        box-sizing: border-box;
    }
`

export default TextInput
