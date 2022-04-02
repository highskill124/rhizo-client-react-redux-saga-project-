import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { Tween } from '../../settings/Tween';
import UIButtonBase from '../button/UIButtonBase';
import UIBadge from '../core/UIBadge';
import { EditIcon } from '../icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    padding: 8px;

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin: 0px 8px 8px 0px;
    }

    @media (max-width: ${Device.tablet}px) {
        display: none;
    }
`;

const ProfilePic = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    margin: 0px 0px 10px 0px;
    padding: 0px 0px 0px 0px;
    position: relative;

    width: 100px;
    height: 100px;

    img {
        width: 100%;
        height: auto;
    }

    > div {
        position: absolute;
        /* width: 20px;
        height: 20px; */
        left: 78px;
        top: 70px;
        border: 2px solid ${ThemeColor.white};
        border-radius: 50%;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        > button {
            position: relative;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: ${ThemeColor.primary};
            margin: 0px;

            &:hover {
                background-color: ${ThemeColor.primaryLight};
                svg {
                    * {
                        fill: ${ThemeColor.white};
                    }
                }
            }

            svg {
                width: 8px;
                height: 8px;
                * {
                    transition: fill ${Tween.duration}s ${Tween.ease};
                    fill: ${ThemeColor.white};
                }
            }
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    profileType: string;
    profilePic: string;
    profileName: string;
}

const ProfileDetails: FC<IProps> = (props) => {
    const { id, profileType, profilePic, profileName } = props;
    return (
        <Wrapper id={id}>
            <ProfilePic>
                <img src={`./assets/image/${profilePic}`} alt={profileType} />
                <div>
                    <UIButtonBase>
                        <EditIcon />
                    </UIButtonBase>
                </div>
            </ProfilePic>
            <h4>{profileName}</h4>
            <UIBadge label="Major" />
        </Wrapper>
    );
};

ProfileDetails.defaultProps = {};

export default ProfileDetails;
