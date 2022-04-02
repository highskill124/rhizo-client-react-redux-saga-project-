import DialogActions from '@mui/material/DialogActions';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { FontSize, FontWeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import UIButton from '../../../ui-kit/button/UIButton';
import UIBox from '../../../ui-kit/core/UIBox';
import UICustomModal from '../../../ui-kit/core/UICustomModal';
import UISpacer from '../../../ui-kit/core/UISpacer';
import UIAsyncAutoCompleteBox from '../../../ui-kit/form/autocomplete/UIAsyncAutoCompleteBox';
import UIFormikBox from '../../../ui-kit/form/UIFormikBox';
import UITextField from '../../../ui-kit/form/UITextField';

const Label = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
`;

const SubLabel = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
`;

const Div = styled.div`
    /* display: flex; */
    position: relative;
    width: 50%;
    padding: 0;
    overflow: visible;
`;

const Li = styled.li`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
`;

interface ICourseProps {
    majorName?: string;
    majorCode?: string;
    courseCode?: number;
}

interface IProps {
    open: boolean;
    institution: string;
    onConfirm: (x: any, major?: any) => void;
    initialValues: ICourseProps;
}

const validationSchema = Yup.object().shape({
    majorName: Yup.string().required('Major is Required').min(4, 'Subject must be min 4 letter long. Enter the full name of your Subject.'),
    courseCode: Yup.string().required('Course number is Required'),
});

const StudentCourseModal: FC<IProps> = (props) => {
    const { onConfirm, open, initialValues, institution } = props;

    const [major, setMajor] = useState(null);

    useEffect(() => {
        open && setMajor(null);
    }, [open]);

    const handleClose = () => {
        onConfirm(null);
    };

    const handleChange = (v, c, x) => {
        console.log(v, c, x);
        setMajor(x);
    };

    return (
        <UICustomModal open={open} onClose={handleClose} title="Add a new Course" subTitle="Add a new course to your profile" hideBack>
            <UIFormikBox
                onSubmit={(x) => {
                    console.log('--- submit ---');
                    onConfirm(x, major);
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}
                display="flex"
                flexDirection="column"
                alignSelf="stretch"
            >
                <UIBox width="100%">
                    <UISpacer height={25}></UISpacer>
                    <UIBox width="100%">
                        <UIBox flexDirection="column" alignSelf="stretch" width="100%">
                            <Label>Major</Label>
                            <SubLabel>The major of your courses. e.g (Math)</SubLabel>
                            <UIAsyncAutoCompleteBox id="majorName" name="majorName" creatable target={5} params={{ institution }} onChange={handleChange} />
                        </UIBox>
                        <UIBox mx="8px" backgroundColor="#003399" />
                        <UIBox flexDirection="column" alignSelf="stretch" width="100%">
                            <Label>Course Number</Label>
                            <SubLabel>The course number. e.g (101)</SubLabel>
                            <UITextField id="courseCode" name="courseCode" />
                        </UIBox>
                    </UIBox>
                </UIBox>
                <DialogActions style={{ padding: '20px 0px', width: '100%' }}>
                    <UIButton color="basicline" onClick={handleClose}>
                        Cancel
                    </UIButton>
                    <UIButton color="second" type="submit">
                        Confirm
                    </UIButton>
                </DialogActions>
            </UIFormikBox>
        </UICustomModal>
    );
};

StudentCourseModal.defaultProps = {};

export default StudentCourseModal;
