import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import UIActionButton from '../button/UIActionButton';
import UISpacer from '../core/UISpacer';
import { EditIcon } from '../icon/UIIconAssets';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    > button {
        margin-top: 40px;
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    margin?: Array<number>;
    onClick?: () => void;
}

const ActionFieldBox: FC<IProps> = (props) => {
    const { id, onClick, children, margin } = props;

    return (
        <Wrapper id={id}>
            {children}
            <UISpacer width={10} />
            <UIActionButton margin={margin} onClick={onClick}>
                <EditIcon />
            </UIActionButton>
        </Wrapper>
    );
};

ActionFieldBox.defaultProps = {
    margin: [40, 0, 0, 0],
};

export default ActionFieldBox;
