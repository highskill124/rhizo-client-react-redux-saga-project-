import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import UIButton from '../button/UIButton';
import UIPanel from '../core/UIPanel';
import UISpacer from '../core/UISpacer';
import { PlusIcon } from '../icon/UIIconAssets';
import UIBox from '../layout/UIBox';
import CurrentClassItem from './CurrentClassItem';

const Wrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin-top: 0px;

        .tablet-column {
            flex-direction: column;
        }

        .tablet-hidden {
            display: none;
        }

        .add-button-wrapper {
            button {
                margin-top: 10px;
            }
        }
    }

    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin-top: 0px;

        .tablet-column {
            flex-direction: column;
        }

        .tablet-hidden {
            display: none;
        }

        .add-button-wrapper {
            button {
                margin-top: 10px;
            }
        }
    }
`;

const data = {
    major: 'Economics',
    course: '101',
};

interface IProps {
    id?: string;
    children?: ReactNode;
    title: string;
    border?: boolean;
}

const CurrentClassListing: FC<IProps> = (props) => {
    const { id, title, border } = props;

    return (
        <UIPanel id={id} title={title} border={border}>
            <Wrapper>
                <CurrentClassItem major={data.major} course={data.course} />
                <CurrentClassItem major={data.major} course={data.course} />
                <CurrentClassItem major={data.major} course={data.course} />
                <UISpacer className="tablet-hidden" height={15} />
                <UIBox className="add-button-wrapper" direction="row">
                    <UIButton block onClick={() => {}}>
                        <PlusIcon />
                    </UIButton>
                </UIBox>
                <UISpacer height={5} />
            </Wrapper>
        </UIPanel>
    );
};

CurrentClassListing.defaultProps = {
    border: false,
};

export default CurrentClassListing;
