import React, { FC, ReactNode } from 'react';
import { Formik, FormikHelpers, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import UIBox, { IUIBoxProps } from '../core/UIBox';

const SForm = styled.form`
    display: flex;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
`;

interface IProps extends IUIBoxProps {
    initialValues?: any;
    validationSchema?: any;
    onSubmit?: (x) => void;
    children: ReactNode;
}

const UIFormikBox: FC<IProps> = (props) => {
    const { initialValues, validationSchema, onSubmit, children, ...rest } = props;

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: any, { setSubmitting }: FormikHelpers<any>) => {
            onSubmit({
                ...values,
            });

            // setTimeout(() => {
            //     setSubmitting(false);
            // }, 10);
        },
    });

    return (
        <UIBox {...rest}>
            <FormikProvider value={formik}>
                <SForm
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}
                >
                    {children}
                </SForm>
            </FormikProvider>
        </UIBox>
    );
};

UIFormikBox.defaultProps = {
    initialValues: {},
    validationSchema: Yup.object(),
    onSubmit: (x) => {},
};

export default UIFormikBox;
