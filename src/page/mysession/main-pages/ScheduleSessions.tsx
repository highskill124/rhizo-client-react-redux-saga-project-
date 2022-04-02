import { useFormik } from 'formik';
import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UIForm from '../../../ui-kit/form/UIForm';
import SessionContainer from '../../../ui-kit/core/UISessions';
import { RootState } from '../../../store/state/RootReducer';
import { Device } from '../../../settings/Device';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../../settings/Font';
import { ThemeColor } from '../../../settings/ThemeColor';
import { ScheduleData } from '../temp-data/data';

const Wrapper = styled.div<Partial<IProps>>`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex: none;
    background: ${ThemeColor.white};
    padding: 0;
    overflow: auto;
    max-height: 100%;
    padding-top: 5px;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }
    > form {
        width: 340px;
        @media (max-width: ${Device.laptopLarge - 1}px) {
            width: 340px;
        }
        > div {
            > div {
                > form {
                    > div:nth-child(3) {
                        display: flex;
                    }
                }
            }
        }
    }

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
        margin-bottom: 15px;
        margin: 0px;
    }
    @media (max-width: ${Device.mobileMedium - 1}px) {
        display: none;
    }
    @media (max-width: 1289px) {
        display: none;

        .tablet-hidden {
            display: none;
        }
    }
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
    &::-webkit-scrollbar {
        width: 0px !important;
        background: transparent; /* make scrollbar transparent */
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    data: any;
    initialNumber?: number;
    scheduleInitial?: number;
}

const SimpleSessionsContainer: FC<IProps> = (props) => {
    const { id, data, initialNumber, scheduleInitial } = props;
    const isTutor = useSelector<RootState, boolean>((s) => s.profileState.user.isTutor);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    return (
        <Wrapper id={id}>
            <UIForm formik={formik}>
                <ContentWrapper>
                    <SessionContainer data={ScheduleData} sessionType="schedule" userType={isTutor} initialNumber={initialNumber} scheduleInitial={scheduleInitial}/>
                </ContentWrapper>
            </UIForm>
        </Wrapper>
    );
};

SimpleSessionsContainer.defaultProps = {};

export default SimpleSessionsContainer;
