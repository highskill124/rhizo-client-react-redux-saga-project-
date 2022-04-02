import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import Content from '../common/Content';
import UIHeading from '../../ui-kit/core/UIHeading';
import TutorScheduler from '../../ui-kit/widget/TutorScheduler';
import UIForm from '../../ui-kit/form/UIForm';
import Header from '../common/Header';
import UISpacer from '../../ui-kit/core/UISpacer';
import UISelectField from '../../ui-kit/form/UISelectField';
import UINavigation from '../common/UINavigation';
import UIButton from '../../ui-kit/button/UIButton';
import UITextField from '../../ui-kit/form/UITextField';
import UICustomModal from '../../ui-kit/core/UICustomModal';
import UIBox from '../../ui-kit/layout/UIBox';
import UICommonDrawer from '../../ui-kit/core/UICommonDrawer';
import { Device } from '../../settings/Device';
import { Margin } from '../../settings/Margin';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize } from '../../settings/Font';
import { CopyIcon, HMorelIcon } from '../../ui-kit/icon/UIIconAssets';
import { MeetingOptions } from '../../settings';

import { RootState } from '../../store/state/RootReducer';
import { SchedulerState, requestGetScheduler } from '../../store/state/SchedulerState';

const PageContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    margin: 0px !important;
    overflow: hidden;
    @media (max-width: ${Device.mobileMedium - 1}px) {
        margin: ${Margin.sm}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        margin: ${Margin.sm}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        margin: ${Margin.md}px;
        #profileBar {
            display: none;
        }
    }
    @media (min-width: ${Device.laptop}px) and (max-width: ${Device.laptopLarge - 1}px) {
        margin: ${Margin.md}px;
    }
    @media (min-width: ${Device.laptopLarge}px) and (max-width: ${Device.desktop - 1}px) {
        margin: ${Margin.lg}px;
    }
    @media (min-width: ${Device.desktop}px) {
        margin: ${Margin.xl}px;
    }
`;

const MainContentWrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* background: ${ThemeColor.white}; */
    flex: 1;
    align-self: stretch;
    max-height: 100%;
    padding: 20px;
    overflow: auto;
    > div:nth-child(3) {
    }
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    @media (max-width: ${Device.laptop - 1}px) {
        padding: 20px;
    }
`;

const Settings = styled.div`
    padding: 20px;
    width: 340px;
    @media (max-width: ${Device.laptop - 1}px) {
        display: none;
    }
`;

const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const ConfirmContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 10px;
`;

const Container = styled.div``;

const MeetingContainer = styled.div`
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const MeetingName = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const LiveStatus = styled.p`
    color: ${ThemeColor.subtitle};
    opacity: 0.5;
    font-size: ${FontSize.xs};
    margin: 0;
    text-transform: uppercase;
`;

const MeetingLinkContainer = styled.div`
    max-width: 290px;
    background-color: ${ThemeColor.basic};
    border-radius: 10px;
    border: none;
    text-overflow: ellipsis;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 15px;
`;

const MeetingLink = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const HMoreContainer = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${ThemeColor.secondLight};
    transform: rotate(90deg);
    padding: 4px 7px;
    > svg {
        * {
            fill: ${ThemeColor.secondDark};
        }
    }
    &:hover {
        cursor: pointer;
    }
`;

const Subheader = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    width: 80%;
    margin: 0;
`;

const Label = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.md};
    font-weight: 500;
    margin: 0;
`;

const Desc = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
    margin: 0;
`;

const useStyles = makeStyles((theme) => ({
    settingButton: {
        display: 'none !important',
        '@media (max-width: 1023px)': {
            display: 'block !important',
        },
    },
    copyIcon: {
        cursor: 'pointer',
    },
    modalWidth: {
        width: '460px !important',
    },
    update: {
        '@media (max-width: 767px)': {
            width: '100%',
            marginLeft: '20px',
        },
    },
}));

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const initialMeetingLink = [
    { name: "Andrew's Zoom Room", link: 'https://zoom.us/ru-ru/meetingroomzoom...', liveStatue: 'online' },
    { name: "Andrew's Zoom Room", link: 'https://zoom.us/ru-ru/meetingroomzoom...', liveStatue: 'online' },
];

const Scheduler: FC<IProps> = (props) => {
    const classes = useStyles();
    const { id } = props;
    const [totalTime, setTotlaTime] = useState(null);
    const [Tschedule, setTSchedule] = React.useState([]);
    const [single, setSingle] = useState(true);
    const [selected, setSelected] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [addMeetingName, setAddMeetingName] = useState<string>('');
    const [addMeetingLink, setAddMeetingLink] = useState<string>('');
    const [openSessionSettings, setOpenSessionSettings] = useState(false);
    const [meetingLink, setMeetingLink] = useState([]);
    const [copied, setCopied] = useState(false);

    const dispatch = useDispatch();
    const schedulerState = useSelector<RootState, SchedulerState>((state) => state.schedulerState);

    useEffect(() => {
        dispatch(requestGetScheduler());
        setMeetingLink(initialMeetingLink);
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    const hoursOption = [
        { value: 10, label: '10 hours' },
        { value: 20, label: '20 hours' },
        { value: 30, label: '30 hours' },
        { value: 40, label: '40 hours' },
    ];

    const calcTotalTime = (range: Array<any>) => {
        setTotlaTime(30 * range.length);
    };

    const isSingle = (range: Array<any>) => {
        if (range.length === 0) {
            setSingle(false);
        } else {
            range.sort((a, b) => a - b);
            for (let i = 0; i < range.length - 1; i++) {
                const d1 = new Date(range[i]);
                const d2 = new Date(range[i + 1]);
                const d1FullHours = d1.getHours() + d1.getMinutes() / 60;
                const d2FullHours = d2.getHours() + d2.getMinutes() / 60;
                const d1Day = d1.getDate();
                const d2Day = d2.getDate();
                if (d1Day !== d2Day) {
                    setSingle(false);
                    setSelected(false);
                    return;
                }
                if (d2FullHours - d1FullHours > 0.5) {
                    setSingle(false);
                    setSelected(false);
                    return;
                } else {
                    setSingle(true);
                    setSelected(true);
                }
            }
        }
    };

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getMinTime = (range: Array<any>) => {
        if (range.length === 0) {
            setScheduleTime('');
            setScheduleDate('');
        } else {
            range.sort((a, b) => a - b);
            const dMin = new Date(range[0]);
            const dMax = new Date(range[range.length - 1]);
            setScheduleTime(`${dMin.getHours()}:${dMin.getMinutes()} - ${dMax.getHours()}:${dMax.getMinutes()}`);
            setScheduleDate(`${MONTHS[dMin.getMonth()]}${dMin.getDate()}, ${dMin.getFullYear()}`);
        }
    };

    const onSchedule = (e) => {
        setTSchedule(e);
        isSingle(e);
        getMinTime(e);
        calcTotalTime(e);
    };

    const onOpenModal = () => {
        setOpenSessionSettings(false);
        setOpenModal(true);
    };

    const onCloseModal = () => {
        setOpenModal(false);
        setAddMeetingName(null);
        setAddMeetingLink(null);
    };

    const handleBackSettings = () => {
        setOpenModal(false);
        setOpenSessionSettings(true);
        setAddMeetingName(null);
        setAddMeetingLink(null);
    };

    const handleMeetingName = (e: any) => {
        setAddMeetingName(e.target.value);
    };

    const handleAddMeetingLink = (e: any) => {
        setAddMeetingLink(e.target.value);
    };

    const onSessionSettings = () => {
        setOpenSessionSettings(true);
    };

    const onCloseDrawer = () => {
        setOpenSessionSettings(false);
    };

    const onAddLocationConfirm = () => {
        meetingLink.push({ name: addMeetingName, link: addMeetingLink, liveStatue: 'Online' });
        setMeetingLink(meetingLink);
        setAddMeetingLink(null);
        setAddMeetingName(null);
        setOpenModal(false);
    };

    const onCopyLink = (target: any) => {
        navigator.clipboard.writeText(target);
        setCopied(!copied);
        setTimeout(() => setCopied((status) => !status), 2000);
    };

    return (
        <Container>
            <Header />
            <UINavigation />
            <Content style={{ maxWidth: '1440px' }}>
                <PageContentWrapper id={id}>
                    <MainContentWrapper>
                        <UIHeading header="Scheduler" subheader="Organize your time and set your availability with Rhizo's integrated meeting scheduler.">
                            <UIButton color="basicline" size="small" className={classes.settingButton} onClick={onSessionSettings}>
                                Settings
                            </UIButton>
                        </UIHeading>
                        <UISpacer height={20}></UISpacer>
                        <TutorScheduler onSchedule={(x) => onSchedule(x)} />
                        <UISpacer height={40}></UISpacer>
                        <Div>
                            <UIButton color="second" className={classes.update}>
                                Update
                            </UIButton>
                        </Div>
                    </MainContentWrapper>
                    <Settings>
                        <UIForm formik={formik} style={{ width: '100%' }}>
                            <UIHeading header="Minimum booking window" fullWidthSubheader="Here are your upcoming session for today."></UIHeading>
                            <UISpacer height={30}></UISpacer>
                            <UISelectField options={hoursOption} name="hourSelect"></UISelectField>
                            <UISpacer height={45}></UISpacer>
                            <UIHeading header="Session locations" fullWidthSubheader="Here are your upcoming session for today."></UIHeading>
                            {meetingLink.map((item, index) => (
                                <MeetingContainer>
                                    <UIBox justifyContent="space-between" alignItems="center">
                                        <div>
                                            <MeetingName>{item.name}</MeetingName>
                                            <UISpacer height={10}></UISpacer>
                                            <LiveStatus>{item.liveStatue}</LiveStatus>
                                            <UISpacer height={10}></UISpacer>
                                        </div>
                                        <HMoreContainer>
                                            <HMorelIcon />
                                        </HMoreContainer>
                                    </UIBox>
                                    <MeetingLinkContainer>
                                        <MeetingLink>{item.link}</MeetingLink>
                                        <CopyIcon className={classes.copyIcon} onClick={() => onCopyLink(item.link)} />
                                    </MeetingLinkContainer>
                                </MeetingContainer>
                            ))}
                            <UISpacer height={20}></UISpacer>
                            <UIButton color="second" style={{ width: '100%' }} onClick={onOpenModal}>
                                Add location
                            </UIButton>
                        </UIForm>
                    </Settings>
                    <UICommonDrawer title="Session Settings" open={openSessionSettings} hideBack onClose={onCloseDrawer} hideClose={false}>
                        <UIForm formik={formik} style={{ width: '100%' }}>
                            <UIHeading header="Minimum booking window" fullWidthSubheader="Here are your upcoming session for today."></UIHeading>
                            <UISpacer height={30}></UISpacer>
                            <UISelectField options={hoursOption} name="hourSelect"></UISelectField>
                            <UISpacer height={45}></UISpacer>
                            <UIHeading header="Session locations" fullWidthSubheader="Here are your upcoming session for today."></UIHeading>
                            {meetingLink.map((item, index) => (
                                <MeetingContainer>
                                    <UIBox justifyContent="space-between" alignItems="center">
                                        <div>
                                            <MeetingName>{item.name}</MeetingName>
                                            <UISpacer height={10}></UISpacer>
                                            <LiveStatus>{item.liveStatue}</LiveStatus>
                                            <UISpacer height={10}></UISpacer>
                                        </div>
                                        <HMoreContainer>
                                            <HMorelIcon />
                                        </HMoreContainer>
                                    </UIBox>
                                    <MeetingLinkContainer>
                                        <MeetingLink>{item.link}</MeetingLink>
                                        <CopyIcon className={classes.copyIcon} onClick={() => onCopyLink(item.link)} />
                                    </MeetingLinkContainer>
                                </MeetingContainer>
                            ))}
                            <UISpacer height={20}></UISpacer>
                            <UIButton color="second" style={{ width: '100%' }} onClick={onOpenModal}>
                                Add location
                            </UIButton>
                        </UIForm>
                    </UICommonDrawer>
                    <UICustomModal open={openModal} title="Add a session location" hideBack onClose={onCloseModal} className={classes.modalWidth}>
                        <UIForm formik={formik} style={{ width: '100%' }}>
                            <UISpacer height={5}></UISpacer>
                            <Subheader>Allow students to choose between multiple types of location types.</Subheader>
                            <UISpacer height={20}></UISpacer>
                            <UITextField name="meetingName" label="Name" value={addMeetingName} onChange={handleMeetingName}></UITextField>
                            <UISelectField name="locationType" label="Location Type" options={MeetingOptions}></UISelectField>
                            <UISpacer height={10}></UISpacer>
                            <Label>Link</Label>
                            <UISpacer height={10}></UISpacer>
                            <Desc>This will be the link student will use to join the session. It will not be revealed publicly.</Desc>
                            <UISpacer height={10}></UISpacer>
                            <UITextField name="meetingLink" value={addMeetingLink} onChange={handleAddMeetingLink}></UITextField>
                            <ConfirmContainer>
                                <UIButton color="basicline" onClick={handleBackSettings}>
                                    Cancel
                                </UIButton>
                                <UIButton color="second" onClick={onAddLocationConfirm}>
                                    Confirm
                                </UIButton>
                            </ConfirmContainer>
                        </UIForm>
                    </UICustomModal>
                </PageContentWrapper>
            </Content>
        </Container>
    );
};

Scheduler.defaultProps = {};

export default Scheduler;
