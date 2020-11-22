import styled from 'styled-components'

export const theme = {
    colors: {
        white: 'ghostwhite',
        green: 'springgreen',
        purple: '#9b58b6',
        gray: 'dimgray',
        lightYellow: 'khaki',
        yellow: 'yellow',
        golden: 'goldenrod',
        blue: '#3497db',
    },
}

const {
    white,
    green,
    purple,
    gray,
    lightYellow,
    yellow,
    golden,
    blue,
} = theme.colors

export const L3ctfBtn = styled.button`
    border: none;
    box-shadow: 0 0 0 1px ${white};
    background-color: transparent;
    font-family: 'Lato';
    color: ghostwhite;
    padding: 0.5rem 2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
    }

    &:hover {
        box-shadow: 0 0 0 3px ${green};
        color: ${green};
    }
`

export const L3ctfActions = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0 0 0;
`

export const L3ctfLoginBox = styled.div`
    border: 10px solid;
    border-image-slice: 1;
    border-width: 3px;
    border-image-source: linear-gradient(to left, ${purple}, ${green});
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.25rem;
`

export const L3ctfLink = styled.a`
    color: ${green};
    transition: all 0.2s ease;

    &:hover {
        color: ${purple};
    }
`

export const L3ctfLabel = styled.label`
    display: flex;
    flex-direction: column;
    color: ghostwhite;

    input {
        margin-top: 0.5rem;
        height: 35px;
        font-size: 1.2rem;
        padding: 0 0.5rem;
        color: rgba(0, 0, 0, 0.9);
    }
`

export const L3ctfSignin = styled.div`
    margin-top: 0.5rem;
    font-size: 0.8rem;
`
