import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FontSize, FontWeight, LineHeight, LetterSpacing } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UISpacer from './UISpacer';
import SessionRatings from '../../ui-kit/core/NewUIRating';

const Wrapper = styled.div<Partial<IProps>>`
    font-size: ${FontSize.xl};
    color: ${ThemeColor.title};
`;

const ProfileContainer = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 8px 0px 0px 0px;
    padding: 0px 0px 0px 40px;
    height: 38px;

    > div:nth-child(1) {
        width: 38px;
        height: 38px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        margin: 0px 12px 0px 12px;
        padding: 0;

        > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            > h4 {
                font-weight: ${FontWeight.medium};
                font-size: ${FontSize.md};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${ThemeColor.subtitle};
                margin: 0px;
                padding: 0px;
            }
        }
        > span {
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            margin: 3px 0px 0px 0px;
        }
    }
`;

const Gender = styled.div`
    padding: 2px 6px;
    font-size: ${FontSize.xs};
    color: ${ThemeColor.secondDark};
    background-color: ${ThemeColor.second};
    border-radius: 12px;
    white-space: nowrap;
    &:hover {
        background-color: ${ThemeColor.secondMiddle};
    }
`;

interface IProps {
    className?: string;
    avatar?: any;
    profileName: string;
    gender: string;
    ratings: number;
    subject: string;
}

const UIUserProfile: FC<IProps> = (props) => {
    const { avatar, profileName, gender, ratings, subject } = props;
    return (
        <ProfileContainer style={{ paddingLeft: 0 }}>
            <div>
                <img src={avatar ? `${avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQReHBiC0Gc-A_3XgGn3kb4h0qyolCbojb5qQ&usqp=CAU'} alt="" />
            </div>
            <div>
                <div>
                    <h4>{profileName}</h4>
                    <UISpacer width={5}></UISpacer>
                    <Gender>{gender}</Gender>
                </div>
                {ratings && <SessionRatings value={ratings} subject={subject} />}
            </div>
        </ProfileContainer>
    );
};

UIUserProfile.defaultProps = {};
export default UIUserProfile;
