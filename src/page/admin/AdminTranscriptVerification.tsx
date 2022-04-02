import { useFormik } from 'formik';
import React, { FC, ReactNode, useState, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIForm from '../../ui-kit/form/UIForm';
import UITextField from '../../ui-kit/form/UITextField';
import { UniversityIcon, TranscriptImage, FilterListIcon } from '../../ui-kit/icon/UIIconAssets';
import usePagination from '../../ui-kit/core/UIPagination';
import UIBox from '../../ui-kit/layout/UIBox';
import Content from '../common/Content';
import UIButton from '../../ui-kit/button/UIButton';
import UINavigation from '../common/UINavigation';
import UIPaginations from '../../ui-kit/core/UIPaginations';
import UISelectField from '../../ui-kit/form/UISelectField';
import UISimpleCheckBox from '../../ui-kit/form/UISimpleCheckBox';
import UIAdminCard from '../../ui-kit/core/UIAdminCard';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight } from '../../settings/Font';
import { PageContentWrapper } from '../landing/TutorLandingPage';

const RightContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    height: calc(100vh - 152px);
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Container = styled.div``;

const Right = styled.div`
    border: 1px solid ${ThemeColor.border};
`;

const Left = styled.div`
    height: calc(100vh - 152px);
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const DetailHeading = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    gap: 20px;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const DetailHeader = styled.div`
    color: ${ThemeColor.title};
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.bold};
`;

const DetailContent = styled.div`
    width: 100%;
`;

const Detail = styled.div`
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const Div = styled.div`
    padding: 20px;
    width: 100%;
    padding-bottom: 0;
`;

const Course = styled.div`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const CourseContainer = styled.div`
    width: 100%;
    padding: 25px 20px;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const ButtonsContainer = styled.div`
    widht: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    padding: 20px;
`;

const CourseParent = styled.div`
    width: 100%;
    padding: 20px;
    padding-top: 0px;
`;

const useStyles = makeStyles((theme) => ({
    drawerFilter: {
        marginTop: '0 !important',
        paddingTop: '0 !important',
        paddingLeft: '0 !important',
    },
    adminContent: {
        maxWidth: 1440,
        marginTop: '0 !important',
        height: '100vh !important',
        display: 'block !important',
    },
    mainPage: {
        padding: 20,
        gap: 20,
    },
    cardContainer: {
        cursor: 'pointer',
    },
    inputContainer: {
        '&>div:nth-child(2)': {
            width: 100,
        },
    },
    decision: {
        height: '200px !important',
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const AdminTranscriptVerification: FC<IProps> = (props) => {
    const SessionData = [
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
        {
            date: '2021/11/03',
            hours: 10,
            profileName: 'Mark Otto',
            avatar: '',
            gender: 'He/Him/His',
            ratings: 4.5,
            subject: 'ECON 101',
            header: 'Request #12345',
            number: 6,
            content: '',
        },
    ];

    const SUBJECTS = [
        { id: 1, item: 'ECON 101' },
        { id: 2, item: 'CS 10' },
        { id: 3, item: 'Biology 8' },
        { id: 4, item: 'CHEM 5' },
    ];

    const Kinds = [
        { value: 'Some', label: 'Some' },
        { value: 'Some', label: 'Some' },
        { value: 'Some', label: 'Some' },
    ];
    const { id } = props;
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const [page, setPage] = useState(5);
    const [openFilter, setOpenFilter] = useState(false);
    const [showDetail, setShowDetail] = useState(true);
    const [detailNumber, setDetailNumber] = useState(0);
    const [ids, setIds] = useState<Array<number>>([]);
    const PER_PAGE = 5;
    const count = Math.ceil(SessionData.length / PER_PAGE);
    const DATA = usePagination(SessionData, PER_PAGE);
    const myRef = useRef(null);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
        myRef.current.scrollIntoView();
    };

    const onShowDetail = (x) => {
        setShowDetail(true);
        setDetailNumber(x);
    };

    const selectSubject = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        if (ids.includes(selectedId)) {
            const newIds = ids.filter((i) => i !== selectedId);
            setIds(newIds);
        } else {
            const newIds = [...ids];
            newIds.push(selectedId);
            setIds(newIds);
        }
    };

    return (
        <Container>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UINavigation admin={true} />
                <Content className={classes.adminContent}>
                    <Div>
                        <UIBox style={{ width: '500px' }} gap={10} className={classes.inputContainer}>
                            <UITextField name="disputeId"></UITextField>
                            <UISelectField name="kind" options={Kinds} style={{ width: '100px' }}></UISelectField>
                            <UIButton color="basicline">
                                <FilterListIcon />
                            </UIButton>
                        </UIBox>
                    </Div>
                    <PageContentWrapper id={id} className={classes.mainPage}>
                        <Left ref={myRef}>
                            {SessionData &&
                                SessionData.length > 0 &&
                                DATA.currentData().map((item: any, index: any) => (
                                    <div onClick={() => onShowDetail(index)} className={classes.cardContainer}>
                                        <UIAdminCard key={index} transcript header={item.header} date={item.date} hours={item.hours} studentAvatar={item.studentAvatar} studentProfileName={item.profileName} studentGender={item.gender} studentRatings={item.ratings} studentSubject={item.subject} />
                                    </div>
                                ))}
                            <UISpacer height={10}></UISpacer>
                            {count > 1 && <UIPaginations count={count} size="large" page={page} onChange={handleChange}></UIPaginations>}
                            <UISpacer height={50}></UISpacer>
                        </Left>
                        <RightContainer>
                            <Right>
                                <DetailHeading>
                                    <DetailHeader>{SessionData[detailNumber].header}</DetailHeader>
                                    <UIButton color="second">
                                        <UniversityIcon />
                                        Harvard University
                                    </UIButton>
                                </DetailHeading>
                                <DetailContent>
                                    <Detail>{SessionData[detailNumber].content || <TranscriptImage />}</Detail>
                                </DetailContent>
                                <CourseParent>
                                    <UISpacer height={50}></UISpacer>
                                    <DetailHeader>Course to approve</DetailHeader>
                                    {SUBJECTS.map((subject, index) => (
                                        <CourseContainer>
                                            <UIBox justifyContent="space-between" alignItems="center" key={index}>
                                                <Course>{subject.item}</Course>
                                                <UISimpleCheckBox value={subject.id} checked={!!ids.includes(subject.id)} onChange={selectSubject}></UISimpleCheckBox>
                                            </UIBox>
                                        </CourseContainer>
                                    ))}
                                </CourseParent>
                                <ButtonsContainer>
                                    <UIButton color="basicline">Reject</UIButton>
                                    <UIButton color="basicline">Approve</UIButton>
                                </ButtonsContainer>
                                <UISpacer height={50}></UISpacer>
                            </Right>
                        </RightContainer>
                    </PageContentWrapper>
                    <UISpacer height={50}></UISpacer>
                </Content>
            </UIForm>
        </Container>
    );
};

AdminTranscriptVerification.defaultProps = {};

export default AdminTranscriptVerification;
