import React from 'react';
import styled from 'styled-components';
import Page from '../common/Page';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Title = styled.h4`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: Roboto;
    font-style: normal;
    font-weight: ${FontWeight.bold};
    font-size: ${FontSize.xxl};
    line-height: ${LineHeight.md};
    display: flex;
    align-items: flex-end;
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey45};
    margin: 0 0 20px 0px;
    max-width: 420px;
`;

const DashboardPage = (props) => {
    return (
        <Page name="dashboard">
            <Title>Dashboard</Title>
        </Page>
    );
};

export default DashboardPage;
