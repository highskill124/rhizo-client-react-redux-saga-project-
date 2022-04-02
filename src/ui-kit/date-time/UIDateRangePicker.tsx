import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from 'react-dates/constants';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, LeftNavIcon, MinusIcon, RightNavIcon } from '../icon/UIIconAssets';
import { Tween } from '../../settings/Tween';
import UIActionButton from '../button/UIActionButton';
import UIIconButtonBase from '../core/UIIconButtonBase';
import UIButtonBase from '../button/UIButtonBase';

const isSameDay = (a, b) => {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return a.date() === b.date() && a.month() === b.month() && a.year() === b.year();
};

const smallDevice = window.matchMedia('(max-width: 400px)').matches;
const orientation = smallDevice ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION;

const Wrapper = styled.div<Partial<IProps>>`
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .DateRangePickerInput {
        display: flex;
        border: none;
        background: ${ThemeColor.basic};
        border-radius: 10px;

        .DateRangePickerInput_arrow {
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
                stroke: ${ThemeColor.grey68};
            }
        }

        .DayPickerNavigation {
            display: flex;
            height: 40px;
            position: absolute;
            justify-content: space-between;
            align-self: stretch;
            flex: 1;
            width: 100%;
        }

        .DateRangePicker_picker {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 21px 73px rgba(0, 0, 0, 0.16);
        }
    }

    .DayPicker_weekHeader {
        color: ${ThemeColor.calLabelColor};
        font-size: ${FontSize.md};
        font-weight: ${FontWeight.medium};
        letter-spacing: ${LetterSpacing.lg};
        line-height: ${LineHeight.sm};
        top: 60px;
    }

    .CalendarDay__default {
        border: 1px solid #e4e7e7;
        /* border: none; */
        /* border-radius: 8px; */
        /* color: #484848; */
        background: #fff;

        color: ${ThemeColor.grey2D};
        font-size: ${FontSize.md};
        font-weight: ${FontWeight.medium};
        letter-spacing: ${LetterSpacing.lg};
        line-height: ${LineHeight.sm};

        &:hover {
            background: ${ThemeColor.danger};
        }
    }

    .CalendarDay__blocked_out_of_range,
    .CalendarDay__blocked_out_of_range:active,
    .CalendarDay__blocked_out_of_range:hover {
        background: #fff;
        border: 1px solid #e4e7e7;
        /* border: none; */
        /* border-radius: 8px; */
        color: #cacccd;
        font-size: ${FontSize.md};
        font-weight: ${FontWeight.medium};
        letter-spacing: ${LetterSpacing.lg};
        line-height: ${LineHeight.sm};
    }

    .CalendarDay__selected,
    .CalendarDay__selected:active,
    .CalendarDay__selected:hover {
        background: ${ThemeColor.danger};
        border: 1px double ${ThemeColor.danger};
        /* border: none; */
        color: #fff;
        font-weight: ${FontWeight.bold};
    }

    .CalendarDay__selected_span {
        /* background: ${Color(ThemeColor.primary).lighten(0.5).toString()};
        border: 1px double ${Color(ThemeColor.primary).lighten(0.2).toString()};
        color: ${Color(ThemeColor.primary).darken(0.5).toString()}; */

        /* background: ${Color('#6de0b3').lighten(0.35).toString()};
        border: 1px double #6de0b3;
        color: ${Color(ThemeColor.primary).darken(0.5).toString()}; */

        background: #fff4f4;
        border: 1px double ${Color(ThemeColor.danger).lighten(0.25).toString()};
        color: ${Color(ThemeColor.primary).darken(0.5).toString()};
    }

    .CalendarDay__hovered_span {
        /* background: ${Color('#6de0b3').lighten(0.35).toString()};
        border: 1px double #6de0b3;
        color: ${Color(ThemeColor.primary).darken(0.5).toString()}; */
        background: #fff4f4;
        border: 1px double ${Color(ThemeColor.danger).lighten(0.25).toString()};
        color: ${Color(ThemeColor.primary).darken(0.5).toString()};
    }

    .DateInput_fang {
        display: none;
    }

    .DateInput {
        background: transparent;
        user-select: none;
        cursor: pointer;

        > input {
            background-color: transparent;
            /* height: 30px; */
            user-select: none;
            font-family: 'Roboto';
            color: ${ThemeColor.grey2D};
            font-size: ${FontSize.md};
            font-weight: ${FontWeight.medium};
            letter-spacing: ${LetterSpacing.md};
            cursor: pointer;

            &.DateInput_input {
                border-bottom: none;
            }
        }

        ${(props) => {
            return css`
                ${`#${props.id}-start-date`} {
                    background: ${ThemeColor.basic};
                    border-radius: 10px 0px 0px 10px;
                    padding-left: 24px;
                    /* height: 30px; */
                    transition: background ${Tween.duration}s ${Tween.ease};

                    &:hover {
                        background: ${ThemeColor.primaryLight};
                    }

                    &.DateInput_input__focused {
                        border-bottom: none;
                        background: ${ThemeColor.primaryLight};
                    }
                }
                ${`#${props.id}-end-date`} {
                    background: ${ThemeColor.basic};
                    border-radius: 0px 10px 10px 0px;
                    text-align: right;
                    padding-right: 24px;
                    /* height: 30px; */

                    &:hover {
                        background: ${ThemeColor.primaryLight};
                    }

                    &.DateInput_input__focused {
                        border-bottom: none;
                        background: ${ThemeColor.primaryLight};
                    }
                }
            `;
        }}
    }
`;

const NavButton = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    > button {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background-color: ${ThemeColor.primary};
        margin: 18px;

        &:hover {
            background-color: ${ThemeColor.primaryLight};
            svg {
                * {
                    fill: ${ThemeColor.white};
                }
            }
        }

        svg {
            width: 14px;
            height: 14px;
            * {
                transition: fill ${Tween.duration}s ${Tween.ease};
                fill: ${ThemeColor.white};
            }
        }
    }
`;

const Arrow = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0px 16px 0px 16px;
    user-select: none;
    font-family: 'Roboto';
    color: ${ThemeColor.grey2D};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
    letter-spacing: ${LetterSpacing.md};
`;

const FooterWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    /* padding: 10px 12px; */
    padding: 0px;

    height: 32px;

    background: ${ThemeColor.basic};
    opacity: 1;
    border-radius: 0px 0px 10px 10px;

    > button {
        height: 32px;
        border-radius: 10px;
        background-color: ${ThemeColor.basic};
        color: ${ThemeColor.grey2D};
        border-radius: 0px 0px 0px 0px;
        align-self: stretch;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.sm};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.lg};
        justify-content: flex-start;
        padding: 0px 12px;

        ${(props) => {
            return css`
                margin: 0px;
            `;
        }}

        &:hover {
            background-color: ${ThemeColor.primaryLight};
            color: ${ThemeColor.white};
        }
    }
`;

const currentDate = moment(new Date());
const tomorrow = moment(currentDate).add(1, 'd');
const futureWeek = moment(currentDate).add(1, 'w');
const futureMonth = moment(currentDate).add(1, 'M');

interface IProps {
    id: string;
    startDate?: any;
    endDate?: any;
    focusedInput?: 'startDate' | 'END_DATE' | null;
    onChange?: (s, e) => void;
}

const UIDateRangePicker: FC<IProps> = (props) => {
    const { id, startDate, endDate, focusedInput, onChange } = props;

    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    const [input, setInput] = useState(focusedInput);

    useEffect(() => {
        setStart(startDate);
        setEnd(endDate);
        setInput(focusedInput);
    }, [startDate, endDate, focusedInput]);

    const onDateChange = (s, e) => {
        setStart(s);
        setEnd(e);
        onChange(s, e);
    };

    const onFocusChange = (x) => {
        setInput(x);
    };

    const renderDatePresets = () => {
        const presets: Array<any> = [
            {
                text: 'Today',
                start: currentDate,
                end: currentDate,
            },
            {
                text: 'Tomorrow',
                start: currentDate,
                end: tomorrow,
            },
            {
                text: 'Next Week',
                start: currentDate,
                end: futureWeek,
            },
            {
                text: 'Next Month',
                start: currentDate,
                end: futureMonth,
            },
        ];
        return (
            <FooterWrapper>
                {presets.map((x) => {
                    const isSelected = isSameDay(x.start, start) && isSameDay(x.end, end);
                    return (
                        <UIButtonBase key={x.text} onClick={() => onDateChange(x.start, x.end)}>
                            {<span>{x.text}</span>}
                        </UIButtonBase>
                    );
                })}
            </FooterWrapper>
        );
    };

    return (
        <Wrapper id={id}>
            <DateRangePicker
                // ---
                startDate={start}
                startDateId={`${id}-start-date`}
                endDate={end}
                endDateId={`${id}-end-date`}
                onDatesChange={(x) => onDateChange(x.startDate, x.endDate)}
                focusedInput={input}
                onFocusChange={(x) => onFocusChange(x)}
                // orientation={orientation}
                // withPortal={smallDevice}
                displayFormat={() => 'MMM DD'}
                // customInputIcon={<CalendarIcon />}
                customArrowIcon={<MinusIcon />}
                readOnly
                hideKeyboardShortcutsPanel
                // small
                navPrev={
                    <NavButton>
                        <UIButtonBase>
                            <LeftNavIcon />
                        </UIButtonBase>
                    </NavButton>
                }
                navNext={
                    <NavButton>
                        <UIButtonBase>
                            <RightNavIcon />
                        </UIButtonBase>
                    </NavButton>
                }
                renderCalendarInfo={renderDatePresets}
                numberOfMonths={smallDevice ? 1 : 2}
            />
        </Wrapper>
    );
};

UIDateRangePicker.defaultProps = {
    focusedInput: null,
    onChange: () => {},
};

export default UIDateRangePicker;
