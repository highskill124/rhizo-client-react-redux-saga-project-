import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import UIButtonBase from '../button/UIButtonBase';
import { CameraImage, DropboxImage, FirefoxImage, InstagramImage, StorageImage } from '../image/UIImageAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    margin-bottom: 15px;

    > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        align-self: stretch;
    }

    h4 {
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.md};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        flex: none;
        flex-grow: 0;
        margin: 0px 0px 10px 0px;
    }

    button {
        width: 40px;
        height: 40px;
        border-radius: 9px;
        background-color: ${ThemeColor.white};
        padding: 1px;
        margin-right: 10px;
        &:hover {
            background-color: ${ThemeColor.primary};
        }

        img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            overflow: hidden;
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const FileStorage: FC<IProps> = (props) => {
    const { id } = props;
    return (
        <Wrapper id={id}>
            <div>
                <UIButtonBase>
                    <img src={FirefoxImage} alt="Storage-1" />
                </UIButtonBase>
                <UIButtonBase>
                    <img src={InstagramImage} alt="Storage-1" />
                </UIButtonBase>
                <UIButtonBase>
                    <img src={DropboxImage} alt="Storage-1" />
                </UIButtonBase>
                <UIButtonBase>
                    <img src={CameraImage} alt="Storage-1" />
                </UIButtonBase>
                <UIButtonBase>
                    <img src={StorageImage} alt="Storage-1" />
                </UIButtonBase>
            </div>
        </Wrapper>
    );
};

FileStorage.defaultProps = {};

export default FileStorage;
