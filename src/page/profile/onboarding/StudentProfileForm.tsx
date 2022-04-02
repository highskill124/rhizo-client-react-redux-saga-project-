import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormikHelpers, useFormik } from 'formik';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ThemeColor } from '../../../settings/ThemeColor';
import UIButton from '../../../ui-kit/button/UIButton';
import UISpacer from '../../../ui-kit/core/UISpacer';
import UIForm from '../../../ui-kit/form/UIForm';
import UIProfileSelect from '../../../ui-kit/form/UIProfileSelect';
import UISelectField from '../../../ui-kit/form/UISelectField';
import UIBox from '../../../ui-kit/layout/UIBox';
import UIAutoComplete from '../../../ui-kit/form/UIAutoComplete';
import { UILabel } from '../../../ui-kit/form/UILabel';
import UIAutoManualInput from '../../../ui-kit/form/UIAutoManualInput';
import UIDevider from '../../../ui-kit/core/UIDevider';
import { FontSize } from '../../../settings/Font';
import { CloseIcon } from '../../../ui-kit/icon/UIIconAssets';
import UIAsyncAutoCompleteBox from '../../../ui-kit/form/autocomplete/UIAsyncAutoCompleteBox';
import StudentCourseModal from './StudentCourseModal';
import { RootState } from '../../../store/state/RootReducer';
import { ProfileState } from '../../../store/state/ProfileState';

const Head = styled.p`
    color: ${ThemeColor.title};
    font-size: 22px;
`;

const Desc = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin-top: 0;
`;

const Or = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    padding: 10px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto auto;
    background-color: ${ThemeColor.white};
    width: 30px;
`;

const CourseContainer = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid ${ThemeColor.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        color: ${ThemeColor.messages};
        font-size: ${FontSize.xl};
        margin-bottom: 0;
    }
    svg {
        background-color: ${ThemeColor.second};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
    }
`;

const NextBack = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 15px;
    > div:nth-child(1) {
        width: 50%;
        flex-shrink: 1;
    }
    > div:nth-child(2) {
        width: 50%;
        flex-shrink: 1;
    }
`;

interface IPayload {
    profileType: string;
    institution: string;
}

const FormSchema = Yup.object().shape({
    institution: Yup.string().required('Institution is Required'),
});

interface IProps {
    id?: string;
    initialValues: any;
    onSubmit?: (x) => void;
}

const StudentProfileForm: FC<IProps> = (props) => {
    const { id, initialValues, onSubmit } = props;

    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);

    const [openCourseCreateModal, setOpenCourseCreateModal] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [courseInput, setCourseInput] = useState([]);

    const formik = useFormik({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: (values: IPayload, { setSubmitting }: FormikHelpers<IPayload>) => {
            console.log('=== SUBMIT ====');
            console.log(values);
            console.log(courseList);
            const courses = courseList.map((x) =>
                x.id
                    ? { course: x.id, tags: [] }
                    : {
                          course: x,
                          tags: [],
                      },
            );

            const payload = {
                profileType: values.profileType,
                student: {
                    institutions: [values.institution],
                    courses,
                },
            };

            console.log(payload);

            onSubmit({
                ...payload,
            });

            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        },
    });

    const handleCourseChange = (x, create, item) => {
        if (create) setOpenCourseCreateModal(true);
        else {
            formik.setFieldValue('course', '', false);
            setCourseInput([]);
            x && addCourse(x, false, item);
        }
    };

    const addCourse = (x, create, item) => {
        let courseItem = null;
        if (create) {
            courseItem = {
                subject: item ? item.title : x.majorName,
                courseNumber: x.courseCode,
                abbreviation: item ? item.abbreviation : `${x.majorName.substring(0, 3)} ${x.courseCode}`,
                institution: formik.values.institution,
            };
        } else {
            courseItem = {
                id: item.id,
                subject: item.subject,
                courseNumber: item.courseNumber,
                abbreviation: item.abbreviation,
                institution: item.institution,
            };
        }

        setCourseList([...courseList, courseItem]);
    };

    const removeCourse = (x) => {
        setCourseList(courseList.slice(0, x).concat(courseList.slice(x + 1, courseList.length)));
    };

    const handleConfirm = (x, major) => {
        setOpenCourseCreateModal(false);
        formik.setFieldValue('course', '', false);
        setCourseInput([]);
        x && addCourse(x, true, major);
    };

    return (
        <>
            <UIForm formik={formik}>
                {/* <UIBox direction="column"> */}
                <Head>Now, let’s setup your student profile</Head>
                <UILabel>Current Institution</UILabel>
                <UIAsyncAutoCompleteBox id="institution" name="institution" placeholder="Select your insitution" target={0} boxProps={{ mb: 3 }} />
                {formik && formik.values.institution && (
                    <>
                        <UILabel>Select your major(s) (Optional)</UILabel>
                        <UIAsyncAutoCompleteBox id="major" name="major" creatable multiple groupType="tag-inside" target={1} params={formik.values} boxProps={{ mb: 3 }} />
                        <UILabel>Your current courses</UILabel>
                        <Desc>Search for courses to add to your profile</Desc>
                        <UIAsyncAutoCompleteBox id="course" name="course" creatable target={2} params={formik.values} selection={courseInput} boxProps={{ mb: 3 }} onChange={handleCourseChange} />
                        <UISpacer height={20}></UISpacer>
                        {courseList && courseList.length > 0 && <UIDevider />}
                        {courseList &&
                            courseList.map((x, i) => (
                                <CourseContainer key={`course-list-${i}`}>
                                    <Desc>{x.abbreviation}</Desc>
                                    <CloseIcon onClick={() => removeCourse(i)}></CloseIcon>
                                </CourseContainer>
                            ))}
                    </>
                )}

                {/* </UIBox> */}
                <UISpacer height={20}></UISpacer>
                <NextBack>
                    <UIButton type="button" color="basicline" onClick={() => {}}>
                        Back
                    </UIButton>
                    <UIButton type="submit" color="second" disabled={profile.student.loading} activity={profile.student.loading}>
                        {profile.student.loading ? 'Updating...' : 'Continue'}
                    </UIButton>
                </NextBack>
            </UIForm>
            <StudentCourseModal open={openCourseCreateModal} initialValues={{ majorName: formik.values.course }} institution={formik.values.institution} onConfirm={handleConfirm} />
        </>
    );
};

StudentProfileForm.defaultProps = {
    onSubmit: () => {},
};

export default StudentProfileForm;
