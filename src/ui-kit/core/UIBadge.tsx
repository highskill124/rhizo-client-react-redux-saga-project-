import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const ColorMap = {
    warn: ThemeColor.warn,
    info: ThemeColor.info,
    danger: ThemeColor.danger,
    success: ThemeColor.primary,
    second: ThemeColor.second,
};

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: ${(props) => ColorMap[props.color]};

    flex: none;
    flex-grow: 0;
    border-radius: 7px;
    align-self: auto;

    > span {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.white};
        flex: none;
        flex-grow: 0;
        margin: 0px 0px 0px 5px;
    }

    ${(props) => {
        if (props.size === 'small') {
            return css`
                height: 12px;
                margin: 0px 5px;
                span {
                    font-size: 8px;
                    line-height: ${LineHeight.md};
                }
            `;
        } else if (props.size === 'medium' && props.color === 'second') {
            return css`
                height: 18px;
                margin: 0px 5px;
                span {
                    font-size: ${FontSize.xs};
                    line-height: ${LineHeight.md};
                    color: ${ThemeColor.secondDark};
                }
            `;
        } else if (props.size === 'large') {
            return css`
                height: 24px;
                margin: 0px 5px;
                span {
                    font-size: ${FontSize.sm};
                    line-height: ${LineHeight.md};
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
    label: string;
    style?: any;
    size?: 'small' | 'medium' | 'large';
    color?: 'warn' | 'info' | 'danger' | 'success' | 'second';
}

const UIBadge: FC<IProps> = (props) => {
    const { id, label, style, size, color } = props;
    return (
        <Wrapper id={id} style={style} size={size} color={color}>
            <span>{label}</span>
        </Wrapper>
    );
};

UIBadge.defaultProps = {
    size: 'medium',
    color: 'danger',
};

export default UIBadge;
