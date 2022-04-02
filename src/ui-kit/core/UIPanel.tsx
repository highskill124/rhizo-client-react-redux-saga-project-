import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { Padding } from '../../settings/Padding';
import { Radius } from '../../settings/Radius';
import UIButtonBase from '../button/UIButtonBase';
import { ExpandIcon, ShrinkIcon } from '../icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UITitle from '../typography/UITitle';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    background: ${ThemeColor.white};
    border: ${({ border }) => (border ? `1px solid ${ThemeColor.grey229};` : 'none')};
    box-sizing: border-box;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding: ${Padding.sm}px;
        border-radius: ${Radius.sm}px;
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        padding: ${Padding.sm}px;
        border-radius: ${Radius.sm}px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        padding: ${Padding.md}px;
        border-radius: ${Radius.md}px;
    }
    @media (min-width: ${Device.laptop}px) and (max-width: ${Device.laptopLarge - 1}px) {
        padding: ${Padding.md}px;
        border-radius: ${Radius.md}px;
    }
    @media (min-width: ${Device.laptopLarge}px) and (max-width: ${Device.desktop - 1}px) {
        padding: ${Padding.lg}px;
        border-radius: ${Radius.lg}px;
    }
    @media (min-width: ${Device.desktop}px) {
        padding: ${Padding.xl}px;
        border-radius: ${Radius.xl}px;
    }
`;

const Header = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;

    /* > h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.lg};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin: 0px 10px 0px 0px;

        @media (max-width: ${Device.mobileMedium - 1}px) {
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            margin: 0px 0px 0px 0px;
        }
        @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            margin: 0px 0px 0px 0px;
        }
        @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            margin: 0px 0px 0px 0px;
        }
    } */

    > button {
        width: 22px;
        height: 22px;
        border-radius: 8px;
        background-color: ${ThemeColor.white};
        color: ${ThemeColor.grey104};
        padding: 0px 4px;
        margin: 0px;
        svg {
            * {
                fill: ${ThemeColor.grey104};
            }
        }
        &:hover {
            background-color: ${ThemeColor.white};
            color: ${ThemeColor.primary};
            * {
                fill: ${ThemeColor.primary};
            }
        }
    }
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
`;

interface IProps {
    className?: string;
    id?: string;
    title: string;
    collapsible?: boolean;
    border?: boolean;
    children?: ReactNode;
}

const UIPanel: FC<IProps> = (props) => {
    const { id, title, children, collapsible, border } = props;
    const [open, setOpen] = useState(true);

    return (
        <Wrapper id={id} border={border}>
            <Header>
                <UITitle variant="title2">{title}</UITitle>
                {collapsible && <UIButtonBase onClick={(e) => setOpen(!open)}>{open ? <ExpandIcon /> : <ShrinkIcon />}</UIButtonBase>}
            </Header>
            {open && <ContentWrapper>{children}</ContentWrapper>}
        </Wrapper>
    );
};

UIPanel.defaultProps = {
    collapsible: true,
    border: false,
};

export default UIPanel;
