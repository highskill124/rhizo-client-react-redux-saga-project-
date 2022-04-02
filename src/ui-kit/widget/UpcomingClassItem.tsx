import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import UITruncateTag from '../core/UITruncateTag';
import UITruncateText from '../core/UITruncateText';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    margin: 0px 0px 15px 0px;
`;

const DateWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    width: 64px;
    background: ${ThemeColor.primary};
    border-radius: 13px 0px 0px 13px;
    padding: 15px;

    > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        display: flex;
        align-items: center;
        text-align: center;
        color: ${ThemeColor.white};
    }

    > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxxl};
        line-height: ${LineHeight.md};
        display: flex;
        align-items: center;
        text-align: center;
        color: ${ThemeColor.white};
    }
`;

const ContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 13px 12px 15px;
    background: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 0px 13px 13px 0px;
    /* flex: none; */
    flex: 1;
    align-items: stretch;
    /* flex-grow: 0; */
    /* width: auto; */
    /* max-width: calc(100% - 64px); */
    /* max-width: 100%; */
    > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-grow: 0;
        margin: 6px 0px;
        flex-wrap: wrap;
        h4 {
            font-style: normal;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
            margin: 0px 10px 0px 0px;
        }
    }

    > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0px;
        flex: none;
        align-self: stretch;
        flex-grow: 0;
        margin: 6px 0px;
        > div:nth-child(1) {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            font-family: Roboto;
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            align-self: stretch;
            margin-right: 40px;
            > div {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                align-self: stretch;
                flex-wrap: wrap;
                /* max-width: 70%; */
                > span {
                    width: 100%;
                }

                .content {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-start;
                    align-self: stretch;
                    flex-wrap: wrap;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: ${FontWeight.medium};
                    font-size: ${FontSize.sm};
                    line-height: ${LineHeight.md};
                    letter-spacing: ${LetterSpacing.md};
                    color: ${ThemeColor.grey104};
                }

                .anchor {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: ${FontWeight.medium};
                    font-size: ${FontSize.sm};
                    line-height: ${LineHeight.md};
                    letter-spacing: ${LetterSpacing.md};
                    color: ${ThemeColor.primary};
                    text-decoration: none;
                }
            }
        }
        > div:nth-child(2) {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            padding: 0px;
            flex: none;
            flex-grow: 0;
            font-style: normal;
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            text-align: right;
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey45};
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    title: string;
    desc: string;
    month: string;
    date: string;
    time: string;
    tags: Array<any>;
}

const UpcomingClassItem: FC<IProps> = (props) => {
    const { id, title, desc, month, date, time, tags } = props;
    return (
        <Wrapper id={id}>
            <DateWrapper>
                <div>{month}</div>
                <div>{date}</div>
            </DateWrapper>

            <ContentWrapper>
                <div>
                    <h4>{title}</h4>
                    <UITruncateTag list={tags}></UITruncateTag>
                </div>
                <div>
                    <UITruncateText>{desc}</UITruncateText>
                    <div>{time}</div>
                </div>
            </ContentWrapper>
        </Wrapper>
    );
};

UpcomingClassItem.defaultProps = {};

export default UpcomingClassItem;
