import { useFormik } from 'formik';
import React, { FC, ReactNode, useState, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import 'react-multi-carousel/lib/styles.css';
import HList from '../../ui-kit/core/HList';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIForm from '../../ui-kit/form/UIForm';
import usePagination from '../../ui-kit/core/UIPagination';
import UIBox from '../../ui-kit/layout/UIBox';
import Content from '../common/Content';
import UIButton from '../../ui-kit/button/UIButton';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UISelectField from '../../ui-kit/form/UISelectField';
import Header from '../common/Header';
import UIDoRate from '../../ui-kit/core/UIDoRate';
import UINavigation from '../common/UINavigation';
import UITextAreaField from '../../ui-kit/form/UITextAreaField';
import { FontSize } from '../../settings/Font';
import UIUserProfile from '../../ui-kit/core/UIUserProfile';
import FileUploader from '../../ui-kit/form/NewFileUpload';
import UIPaginations from '../../ui-kit/core/UIPaginations';
import UIHint from '../../ui-kit/core/UIHint';
import { courseList } from '../../util/mock-api/data/course-list';
import { tutorList } from '../../util/mock-api/data/tutor-list';
import TutorFilter from '../../ui-kit/widget/TutorFilter';
import UIDrawer from '../../ui-kit/core/UIDrawer';
import { ThemeColor } from '../../settings/ThemeColor';
import { PageContentWrapper, MainContentWrapper } from '../landing/TutorLandingPage';

const RightContainer = styled.div`
    width: 340px;
    padding: 0px;
    background: ${ThemeColor.white};
    overflow: auto;
    max-height: 100%;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    > div:nth-child(2) {
        > form {
            > div {
                display: flex;
            }
        }
    }
    @media (max-width: 1289px) {
        display: none;
        max-height: none;
        overflow: unset;
    }
`;

const Description = styled.p`
    width: 80%;
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const Container = styled.div``;

const Label = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    margin: 0;
    margin-bottom: 10px;
`;

const RateContainer = styled.div`
    padding: 20px;
    border: 1px solid ${ThemeColor.border};
    border-radius: 10px;
    width: 100%;
`;

const Skills = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 5px;
`;

const useStyles = makeStyles((theme) => ({
    drawerFilter: {
        marginTop: '0 !important',
        paddingTop: '0 !important',
        paddingLeft: '0 !important',
    },
    filterButton: {
        display: 'none !important',
        '@media(max-width: 1289px)': {
            display: 'block !important',
        },
    },
    left: {
        borderRight: `1px solid ${ThemeColor.border}`,
        paddingRight: '0 !important',
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const ExploreTutorPage: FC<IProps> = (props) => {
    const { id } = props;
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });
    const skills = ['Some thing', 'Some thing', 'Some thing', 'Some thing', 'Some thing'];
    const ReasonOptions = [
        { value: 'some', label: 'some' },
        { value: 'some', label: 'some' },
        { value: 'some', label: 'some' },
    ];

    const [page, setPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false);
    const [openFileDispute, setOpenFileDispute] = useState(true);
    const [openSecondFileDispute, setOpenSecondFileDispute] = useState(false);
    const [rate, setRate] = useState<Array<number>>(new Array(skills.length).fill(0));
    const PER_PAGE = 3;
    const count = Math.ceil(tutorList.length / PER_PAGE);
    const DATA = usePagination(tutorList, PER_PAGE);
    const myRef = useRef(null);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
        myRef.current.scrollIntoView();
    };

    const onCloseFilter = () => {
        setOpenFilter(false);
    };

    const onOpenFilter = () => {
        setOpenFilter(true);
    };

    const onCloseFileDispute = () => {
        setOpenFileDispute(false);
    };

    const onDoRateFirst = (x, y) => {
        const newRates = [...rate];
        newRates[y] = x;
        setRate(newRates);
    };

    const onCloseSecondFileDispute = () => {
        setOpenSecondFileDispute(false);
    };

    const onOpenSecondFileDispute = () => {
        setOpenFileDispute(false);
        setOpenSecondFileDispute(true);
    };

    return (
        <Container>
            <UIForm formik={formik}>
                <Header />
                <UINavigation />
                <Content style={{ maxWidth: '1440px' }}>
                    <PageContentWrapper id={id}>
                        <MainContentWrapper ref={myRef} className={classes.left}>
                            <UIButton color="basicline" onClick={onOpenFilter} className={classes.filterButton}>
                                Filter
                            </UIButton>
                            <UISpacer height={10}></UISpacer>
                            <UIBox direction="column" block={true}>
                                {tutorList && tutorList.length > 0 && DATA.currentData().map((x, i) => <HList list={courseList} moreIcon={false} profileName={x.profileName} image={x.img} level={x.level} ratings={x.ratings} hourlyRate={x.hourlyRate} subject={x.subject} />)}
                            </UIBox>
                            {count > 1 && <UIPaginations count={count} size="large" page={page} onChange={handleChange}></UIPaginations>}
                            <UISpacer height={50}></UISpacer>
                        </MainContentWrapper>
                        <RightContainer>
                            <TutorFilter />
                        </RightContainer>
                        <UIDrawer open={openFilter} onClose={onCloseFilter} hideBack title="Filter">
                            <TutorFilter header={false} className={classes.drawerFilter} />
                        </UIDrawer>

                        <UICustomModal title="Leave some feedback" subTitle="Leave a review for Leyla. Your feedback will hlep other students in the future" open={openFileDispute} onClose={onCloseFileDispute} hideBack>
                            <UISpacer height={25}></UISpacer>
                            <UIUserProfile profileName="Leyla" ratings={null} subject="ECON 101" gender="He/Him/His"></UIUserProfile>
                            <UISpacer height={25}></UISpacer>
                            <Label>Comments</Label>
                            <UITextAreaField name="comment"></UITextAreaField>
                            <RateContainer>
                                {skills.map((skill, index) => (
                                    <UIBox alignItems="center" justifyContent="space-between" key={index}>
                                        <Skills>More TBD</Skills>
                                        <UIDoRate onChangs={onDoRateFirst} index={index} />
                                        <Skills>{rate[index].toFixed(1)}</Skills>
                                    </UIBox>
                                ))}
                            </RateContainer>
                            <UISpacer height={20}></UISpacer>
                            <ButtonsContainer>
                                <UIButton color="dispute">File Dispute</UIButton>
                                <UIButton color="second" onClick={onOpenSecondFileDispute}>
                                    Approve Session
                                </UIButton>
                            </ButtonsContainer>
                        </UICustomModal>
                        <UICustomModal open={openSecondFileDispute} onClose={onCloseSecondFileDispute} hideBack>
                            <Description>Leave a review for Leyla. Your feedback will help other students in the furutre.</Description>
                            <UISpacer height={25}></UISpacer>
                            <UIUserProfile profileName="Leyla" ratings={null} subject="ECON 101" gender="He/Him/His"></UIUserProfile>
                            <UISpacer height={25}></UISpacer>
                            <Label>Dispute reason</Label>
                            <UISelectField name="disputeReason" options={ReasonOptions}></UISelectField>
                            <UISpacer height={10}></UISpacer>
                            <Label>Additional Notes</Label>
                            <UITextAreaField name="notes" placeholder="Enter your comment"></UITextAreaField>
                            <UIHint text="In order for Rhizo to assess the dispute, please provide a clear outline of the issue. We cannot provide a refund unless there is a clear issue that the tutor failed to address. If you did not provide the tutor with ample information prior to the session and the tutor failed to address your questions clearly, we cannot provide a refund to you."></UIHint>
                            <UISpacer height={25}></UISpacer>
                            <Label>Additional files</Label>
                            <FileUploader name="fileupload"></FileUploader>
                            <UISpacer height={20}></UISpacer>
                            <ButtonsContainer>
                                <UIButton color="dispute">File Dispute</UIButton>
                                <UIButton color="second">Approve Session</UIButton>
                            </ButtonsContainer>
                        </UICustomModal>
                    </PageContentWrapper>
                </Content>
            </UIForm>
        </Container>
    );
};

ExploreTutorPage.defaultProps = {};

export default ExploreTutorPage;
