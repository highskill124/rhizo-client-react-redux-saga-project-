import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormikHelpers, useFormik } from 'formik';
import moment from 'moment';
import { ThemeColor } from '../../../settings/ThemeColor';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import UIDatePicker from '../../../ui-kit/form/UIDatePicker';
import UIForm from '../../../ui-kit/form/UIForm';
import UIProfileSelect from '../../../ui-kit/form/UIProfileSelect';
import UISelectField from '../../../ui-kit/form/UISelectField';
import UIBox from '../../../ui-kit/layout/UIBox';

const Head = styled.p`
    color: ${ThemeColor.title};
    font-size: 22px;
`;

interface IPayload {
    dateOfBirth: Date;
    educationLevel: string;
    genderPronoun: string;
    profileType: string;
}

const FormSchema = Yup.object().shape({
    dateOfBirth: Yup.date().required('Required'),
    educationLevel: Yup.string().required('Required'),
    genderPronoun: Yup.string().required('Required'),
    profileType: Yup.string().required('Required'),
});

interface IProps {
    id?: string;
    genderPronounsList: Array<any>;
    educationLevelList: Array<any>;
    initialValues: any;
    onSubmit?: (x) => void;
}

const UserProfileForm: FC<IProps> = (props) => {
    const { id, initialValues, genderPronounsList, educationLevelList, onSubmit } = props;

    const formik = useFormik({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            onSubmit({
                ...values,
                dateOfBirth: moment(values.dateOfBirth).format('yyyy-MM-DD'),
            });

            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <UIForm formik={formik}>
            <UIBox direction="column">
                <Head>First Things First</Head>
                <UIProfileSelect label="Select user type" name="profileType"></UIProfileSelect>
                <UISelectField id="genderPronoun" name="genderPronoun" label="Gender Pronouns" placeholder="" options={genderPronounsList}></UISelectField>
                <UISelectField id="educationLevel" name="educationLevel" label="Education Level" placeholder="Education Level" options={educationLevelList}></UISelectField>
                <UIDatePicker id="dateOfBirth" name="dateOfBirth" label="Date of birth" />
            </UIBox>
            <UISpacer height={20}></UISpacer>
            <div style={{ width: '100%' }}>
                <UIButton type="submit" color="second">
                    Continue
                </UIButton>
            </div>
        </UIForm>
    );
};

UserProfileForm.defaultProps = {
    onSubmit: () => {},
};

export default UserProfileForm;
