import { Backdrop } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

const SBackdrop = styled(Backdrop)<any>`
    &.MuiBackdrop-root {
        /* background-color: rgba(28, 109, 76, 0.5); */
        background-color: rgba(94, 198, 157, 0.5);
    }
`;

interface IProps {}

const UIBackdrop: FC<IProps> = (props) => {
    return <SBackdrop {...props} />;
};

UIBackdrop.defaultProps = {};

export default UIBackdrop;
