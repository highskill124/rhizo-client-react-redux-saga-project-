import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../media/image/logo-white.svg';
import { Depth } from '../../settings/Depth';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import { Layout } from '../../settings/Layout';
import { ThemeColor } from '../../settings/ThemeColor';
import UIButton from '../../ui-kit/button/UIButton';
import { url } from 'inspector';
import PayoutHistoryTable from '../settings/payout/PayoutHistoryTable';

const Wrapper = styled.nav<any>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: ${Layout.header.height.laptop}px;

    left: 0px;
    top: 0px;
    right: 0px;
    z-index: ${Depth.appBar};
    transition: background-color ${Tween.duration}s ${Tween.ease}, box-shadow ${Tween.duration}s ${Tween.ease};

    ${(props) => {
        if (props.shadow) {
            return css`
                @media (max-width: ${Device.tablet}px) {
                    background-color: ${ThemeColor.white};
                    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
                }
            `;
        }
        return null;
    }}

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        height: ${Layout.header.height.tablet}px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        height: ${Layout.header.height.mobile}px;
    }
`;
const LeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 24px;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        padding-left: 20px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding-left: 15px;
    }
`;

const RightWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 5px;
    padding-right: 72px;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        padding-right: 20px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding-right: 15px;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
    margin-top: 40px;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        margin-left: 0px;
        margin-top: 0px;
        width: 80px;

        & > svg {
            fill: ${ThemeColor.primary};
            > path {
                fill: ${ThemeColor.primary};
            }
        }
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        margin-left: 0px;
        margin-top: 0px;
        width: 80px;
        & > svg {
            fill: ${ThemeColor.primary};
            > path {
                fill: ${ThemeColor.primary};
            }
        }
    }
`;

interface IProps {
    className?: string;
    page?: string;
}

const AuthHeader: FC<IProps> = ({ page }) => {
    const [shadow, setShadow] = useState(false);
    const history = useHistory();

    //   const history = useHistory();

    const handleScroll = () => {
        // const scroll = document.documentElement.scrollTop;
        const scroll = document.getElementById('content').scrollTop;

        if (scroll > 64) {
            setShadow(true);
        } else {
            setShadow(false);
        }
    };

    const register = () => {
        history.push('/registration');
    };

    const signIn = () => {
        history.push('sign-in');
    };

    useEffect(() => {
        // window.onscroll = () => handleScroll();
        document.getElementById('content').addEventListener('scroll', handleScroll);
    }, []);

    return (
        <Wrapper shadow={shadow}>
            <LeftWrapper>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
            </LeftWrapper>
            <RightWrapper>
                {page === 'login' && <UIButton onClick={register}>Register</UIButton>}
                {page === 'signup' && <UIButton onClick={signIn}>Sign in</UIButton>}
            </RightWrapper>
        </Wrapper>
    );
};

export default AuthHeader;
