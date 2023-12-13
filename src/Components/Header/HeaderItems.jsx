import { motion } from 'framer-motion';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { menuState } from '../../atom';

const Items = styled(motion.div)`
    display: flex;
    align-items: center;
    @media only screen and (min-width: 320px) and (max-width: 820px) {
        display: ${(props) => (props.active === true ? 'flex' : 'none')};
    }
`;

const Item = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.white.lighter};
    position: relative;
    font-size: var(--font-size-micro);
    margin-right: var(--margin-medium-large);
`;

const IsHere = styled(motion.div)`
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.red};
`;

export default function HeaderItems() {
    // 빨간 원 (isHere) 위치 조작을 위한 라우트 매칭
    const homeMatch = useMatch('/');
    const movieMatch = useMatch('/movie');
    const tvMatch = useMatch('/tv');
    const menu = useRecoilValue(menuState);

    return (
        <Items active={menu}>
            <Item to="/">
                Home
                {homeMatch && <IsHere layoutId="isHere" />}
            </Item>
            <Item to="/movie">
                Movies
                {movieMatch && <IsHere layoutId="isHere" />}
            </Item>
            <Item to="tv">
                Tv Shows
                {tvMatch && <IsHere layoutId="isHere" />}
            </Item>
        </Items>
    );
}