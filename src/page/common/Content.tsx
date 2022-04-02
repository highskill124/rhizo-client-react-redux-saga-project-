import React, { FC, ReactNode, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { RootState } from '../../store/state/RootReducer';
import { ThemeColor } from '../../settings/ThemeColor';
import { createCloseDrawerAction, createOpenDrawerAction } from '../../store/state/PageState';

const Wrapper = styled.div<any>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    background-color: ${ThemeColor.white};
    height: calc(100vh - 60px);
    overflow: hidden;
    margin-top: 60px;
    transition: width ${Tween.duration}s ${Tween.ease}, margin-left ${Tween.duration}s ${Tween.ease}, border-radius ${Tween.duration}s ${Tween.ease};

    ${(props) => {
        if (props.isOpen) {
            return css`
                border-radius: 15px 0px 0px 0px;
                margin-left: 208px;
                width: calc(100vw - 208px);
                @media (max-width: ${Device.mobileLarge}px) {
                    margin-left: 0px;
                    border-radius: 0px 0px 0px 0px;
                    width: 100vw;
                }

                @media (min-width: ${Device.mobileLarge + 1}px) and (max-width: ${Device.tablet - 1}px) {
                    margin-left: 64px;
                    border-radius: 0px 0px 0px 0px;
                    width: calc(100vw - 64px);
                }
            `;
        } else {
            return css`
                border-radius: 15px 0px 0px 0px;
                margin-left: 64px;
                width: calc(100vw - 64px);

                @media (max-width: ${Device.mobileLarge}px) {
                    margin-left: 0px;
                    border-radius: 0px 0px 0px 0px;
                    width: 100vw;
                }
            `;
        }
        return null;
    }}
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    style?: any;
}

const Content: FC<IProps> = (props) => {
    const dispatch = useDispatch();
    const closeNavbar = () => {
        const width = document.body.clientWidth;
        if (width < Device.tablet) {
            const action = createCloseDrawerAction();
            dispatch(action);
        }
    };
    const { id, children, style, className } = props;
    const isOpen = useSelector<RootState, boolean>((s) => s.pageState.isOpen);
    const drawerWidth = useSelector<RootState, number>((s) => s.pageState.drawerWidth);

    useEffect(() => {}, [isOpen, drawerWidth]);

    return (
        <Wrapper id={id} isOpen={isOpen} drawerWidth={drawerWidth} onClick={closeNavbar} style={style} className={className}>
            {children}
        </Wrapper>
    );
};

Content.defaultProps = {};

export default Content;
