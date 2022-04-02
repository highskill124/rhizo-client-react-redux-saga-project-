/* eslint-disable no-unused-vars */
import React, { FC, ReactNode } from 'react';
import { FormikProvider } from 'formik';
import styled from 'styled-components';
import { Device } from '../../settings/Device';

const SForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 0px;
    box-sizing: border-box;
    margin-bottom: 0px;
    /* overflow: hidden; */
    position: relative;

    @media (max-width: ${Device.tablet}px) and (min-width: ${Device.mobileMedium + 1}px) {
        width: 100%;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        width: 100%;
    }

    & > button {
        width: 100%;
        height: 40px;
        margin: 20px 0px 0px 0px;
    }
`;

interface IProps {
    className?: string;
    children: ReactNode;
    formik: any;
    style?: any;
}

const UIForm: FC<IProps> = ({ children, formik, ...other }) => {
    return (
        <FormikProvider value={formik}>
            <SForm noValidate onSubmit={formik.handleSubmit} {...other}>
                {children}
            </SForm>
        </FormikProvider>
    );
};

export default UIForm;
