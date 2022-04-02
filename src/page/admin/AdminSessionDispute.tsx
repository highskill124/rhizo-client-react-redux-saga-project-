import { useFormik } from 'formik';
import React, { FC, ReactNode, useState, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import UISpacer from '../../ui-kit/core/UISpacer';
import UIForm from '../../ui-kit/form/UIForm';
import UITextField from '../../ui-kit/form/UITextField';
import { FilterListIcon } from '../../ui-kit/icon/UIIconAssets';
import usePagination from '../../ui-kit/core/UIPagination';
import UIBox from '../../ui-kit/layout/UIBox';
import Content from '../common/Content';
import UIButton from '../../ui-kit/button/UIButton';
import UINavigation from '../common/UINavigation';
import FileStorage from '../../ui-kit/widget/FileStorage';
import UIPaginations from '../../ui-kit/core/UIPaginations';
import UIUserProfile from '../../ui-kit/core/UIUserProfile';
import UISelectField from '../../ui-kit/form/UISelectField';
import UIAdminCard from '../../ui-kit/core/UIAdminCard';
import UITextAreaField from '../../ui-kit/form/UITextAreaField';
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
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const DetailHeader = styled.div`
    color: ${ThemeColor.title};
    font-size: ${FontSize.lg};
`;

const DetailContent = styled.div`
    width: 100%;
`;

const Detail = styled.div`
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid ${ThemeColor.border};
`;

const Title = styled.p`
    color: ${ThemeColor.title};
    font-weight: ${FontWeight.bold};
    margin: 0;
    padding: 0;
`;

const Response = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.bold};
`;

const Div = styled.div`
    padding: 20px;
    width: 100%;
    padding-bottom: 0;
`;

const ResponseContent = styled.div`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
`;

const Decision = styled.div`
    width: 100%;
    padding: 20px;
`;

const ButtonsContainer = styled.div`
    widht: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    padding: 20px;
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

const AdminSessionDispute: FC<IProps> = (props) => {
    const DisputeData = [
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
        {
            disputeDate: '2021/11/03',
            disputeHeader: 'Dispute #12345',
            disputeHours: 10,
            tutorProfileName: 'Mark Otto',
            tutorAvatar: '',
            tutorGender: 'He/Him/His',
            tutorRatings: 4.5,
            tutorDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
            tutorSubject: 'ECON 101',
            studentSubject: 'Econ 101',
            studentProfileName: 'Mark Otto',
            studentAvatar: '',
            studentGender: 'He/Him/His',
            studentRatings: 5,
            studentDisputeContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta, risus at egestas semper, lorem nibh aliquam tortor, ultricies ullamcorper odio sem nec turpis. Vivamus eget mi risus. Vestibulum eget felis vel diam porta facilisis ac sit amet lacus. Pellentesque pellentesque elit est, non facilisis magna congue at. In blandit tristique dignissim. Fusce ut quam ultrices, viverra orci hendrerit, tincidunt velit. Duis in lectus enim. Maecenas et facilisis dolor. Vestibulum odio nunc, mollis at ultrices sed, dignissim quis risus. Donec venenatis at nulla vehicula volutpat. Mauris vel augue vel turpis pulvinar tristique a vel urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ante risus, ultricies nec justo et, suscipit sagittis ipsum. Duis elementum fringilla congue. Nulla condimentum dui dictum turpis condimentum consequat. Sed accumsan ante sit amet ante sodales, in aliquet dui feugiat.',
        },
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
    const PER_PAGE = 5;
    const count = Math.ceil(DisputeData.length / PER_PAGE);
    const DATA = usePagination(DisputeData, PER_PAGE);
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

    const onCloseFilter = () => {
        setOpenFilter(false);
    };

    const onOpenFilter = () => {
        setOpenFilter(true);
    };

    return (
        <Container>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <UINavigation admin={true} />
                <Content className={classes.adminContent}>
                    <Div>
                        <UITextField name="institution" style={{ width: '500px' }}></UITextField>
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
                            {DisputeData &&
                                DisputeData.length > 0 &&
                                DATA.currentData().map((item, index) => (
                                    <div onClick={() => onShowDetail(index)} className={classes.cardContainer}>
                                        <UIAdminCard key={index} header={item.disputeHeader} date={item.disputeDate} hours={item.disputeHours} tutorAvatar={item.tutorAvatar} tutorProfileName={item.tutorProfileName} tutorGender={item.tutorGender} tutorRatings={item.tutorRatings} tutorSubject={item.tutorSubject} tutorDisputeContent={item.tutorDisputeContent} studentAvatar={item.studentAvatar} studentProfileName={item.studentProfileName} studentGender={item.studentGender} studentRatings={item.studentRatings} studentSubject={item.studentSubject} studentDisputeContent={item.studentDisputeContent} />
                                    </div>
                                ))}
                            <UISpacer height={10}></UISpacer>
                            {count > 1 && <UIPaginations count={count} size="large" page={page} onChange={handleChange}></UIPaginations>}
                            <UISpacer height={50}></UISpacer>
                        </Left>
                        <RightContainer>
                            {showDetail && (
                                <Right>
                                    <DetailHeading>
                                        <DetailHeader>{DisputeData[detailNumber].disputeHeader}</DetailHeader>
                                        <UIButton color="second">Session Details</UIButton>
                                    </DetailHeading>
                                    <DetailContent>
                                        <Detail>
                                            <Title>Student</Title>
                                            <UISpacer height={10}></UISpacer>
                                            <UIUserProfile avatar={DisputeData[detailNumber].studentAvatar} profileName={DisputeData[detailNumber].studentProfileName} gender={DisputeData[detailNumber].studentGender} ratings={DisputeData[detailNumber].studentRatings} subject={DisputeData[detailNumber].studentSubject}></UIUserProfile>
                                            <UISpacer height={20}></UISpacer>
                                            <Response>Student Reponse</Response>
                                            <ResponseContent>{DisputeData[detailNumber].studentDisputeContent}</ResponseContent>
                                            <Response>Supporting document</Response>
                                            <FileStorage />
                                        </Detail>
                                        <Detail>
                                            <Title>Mentor</Title>
                                            <UISpacer height={10}></UISpacer>
                                            <UIUserProfile avatar={DisputeData[detailNumber].tutorAvatar} profileName={DisputeData[detailNumber].tutorProfileName} gender={DisputeData[detailNumber].tutorGender} ratings={DisputeData[detailNumber].tutorRatings} subject={DisputeData[detailNumber].tutorSubject}></UIUserProfile>
                                            <UISpacer height={20}></UISpacer>
                                            <Response>Mentor Reponse</Response>
                                            <ResponseContent>{DisputeData[detailNumber].tutorDisputeContent}</ResponseContent>
                                            <Response>Supporting document</Response>
                                            <FileStorage />
                                        </Detail>
                                    </DetailContent>
                                    <Decision>
                                        <Response>Admin Decision</Response>
                                        <UITextAreaField name="decistion"></UITextAreaField>
                                    </Decision>
                                    <ButtonsContainer>
                                        <UIButton color="basicline">Reject</UIButton>
                                        <UIButton color="basicline">Refund $34.96</UIButton>
                                    </ButtonsContainer>
                                    <UISpacer height={50}></UISpacer>
                                </Right>
                            )}
                        </RightContainer>
                    </PageContentWrapper>
                    <UISpacer height={50}></UISpacer>
                </Content>
            </UIForm>
        </Container>
    );
};

AdminSessionDispute.defaultProps = {};

export default AdminSessionDispute;
