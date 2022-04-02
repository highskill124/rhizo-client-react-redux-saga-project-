/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { addMinutes, addHours, addDays, startOfDay, isSameMinute, startOfWeek, setDate } from 'date-fns';
import formatDate from 'date-fns/format';

import { Scrollbars } from 'react-custom-scrollbars';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Text, Subtitle } from './typography';
import colors from './colors';
import selectionSchemes, { SelectionSchemeType, SelectionType } from './scheme';
import { Stripe } from '../icon/UIIconAssets';
import ScheduleDetailsMenu from './cmp/ScheduleDetailsMenu';
import UIBackdrop from '../core/UIBackdrop';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';

const cellHeight = 20;

const Wrapper = styled.div<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    user-select: none;
`;

const Grid = styled.div<{ columns: number; rows: number; columnGap: number; rowGap: number }>`
    position: relative;
    display: grid;
    grid-template-columns: auto repeat(${(props) => props.columns}, 1fr);
    grid-template-rows: auto repeat(${(props) => props.rows}, 1fr);
    column-gap: ${(props) => props.columnGap}px;
    row-gap: ${(props) => props.rowGap}px;
    width: 100%;
`;

const BlockedSlotOverlay = styled.div<any>`
    position: absolute;
    background-color: #ff7c7c;
    border-radius: 10px;
    overflow: hidden;
    z-index: 1500;

    > svg {
        width: 100%;
        height: 100%;
    }

    ${(props) => {
    return css`
            left: ${props.left}px;
            top: ${props.top}px;
            width: ${props.width}px;
            height: ${props.height}px;
        `;
}}
`;

const GridCell = styled.div`
    place-self: stretch;
    touch-action: none;
`;

const DateCell = styled.div<{
    selected: boolean;
    selectedColor: string;
    unselectedColor: string;
    hoveredColor: string;
    disabledColor: string;
    blocked?: boolean;
}>`
    width: 100%;
    height: ${cellHeight}px;
    border-radius: 3px;
    overflow: hidden;

    ${(props) => {
    if (props.blocked) {
        return css`
                /* background-color: #ff7c7c; */
                background-color: ${props.disabledColor};
            `;
    } else if (props.selected) {
        return css`
                background-color: ${props.selectedColor};
            `;
    } else {
        return css`
                background-color: ${props.unselectedColor};
                &:hover {
                    background-color: ${props.hoveredColor};
                }
            `;
    }
    return null;
}}
`;

const DateLabel = styled(Subtitle)`
    @media (max-width: 699px) {
        font-size: 12px;
    }
    margin: 0;
    margin-bottom: 20px;
    color: ${ThemeColor.calLabelColor};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
    letter-spacing: ${LetterSpacing.lg};
    line-height: ${LineHeight.sm};
`;

const TimeText = styled(Text)`
    /* @media (max-width: 699px) {
        font-size: 10px;
    } */
    text-align: right;
    margin: 0;
    margin-right: 20px;
    color: ${ThemeColor.calLabelColor};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
    letter-spacing: ${LetterSpacing.lg};
    line-height: ${LineHeight.md};
`;

const SUIBackdrop = styled(UIBackdrop)<any>`
    &.MuiBackdrop-root {
        background-color: transparent;
        z-index: 1000;
    }
`;

interface IProps {
    selection: Array<Date>;
    blockedSpan?: Array<Date>;
    selectionScheme: SelectionSchemeType;
    onChange: (newSelection: Array<Date>) => void;
    startDate: Date;
    numDays: number;
    minTime: number;
    maxTime: number;
    hourlyChunks?: number;
    dateFormat?: string;
    timeFormat?: string;
    columnGap?: number;
    rowGap?: number;
    unselectedColor?: string;
    selectedColor?: string;
    hoveredColor?: string;
    disabledColor?: string;
    renderDateCell?: (datetime: Date, selected: boolean, refSetter: (dateCellElement: HTMLElement) => void) => JSX.Element;
    renderTimeLabel?: (time: Date) => JSX.Element;
    renderDateLabel?: (date: Date) => JSX.Element;
}

export const preventScroll = (e: TouchEvent) => {
    e.preventDefault();
};

const computeDatesMatrix = (props: IProps): Array<Array<Date>> => {
    const startTime = startOfDay(props.startDate);
    const dates: Array<Array<Date>> = [];
    const minutesInChunk = Math.floor(60 / props.hourlyChunks);
    for (let d = 0; d < props.numDays; d += 1) {
        const currentDay = [];
        for (let h = props.minTime; h < props.maxTime; h += 1) {
            for (let c = 0; c < props.hourlyChunks; c += 1) {
                currentDay.push(addMinutes(addHours(addDays(startTime, d), h), c * minutesInChunk));
            }
        }
        dates.push(currentDay);
    }
    return dates;
};

enum Status {
    UNINITIALIZED = 'UNINITIALIZED',
    START = 'START',
    IN_PROGRESS = 'IN_PROGRESS',
    END = 'IN_PROGRESS',
}

const UIScheduler: FC<IProps> = (props) => {
    const willMount = useRef(true);
    const dateCellMap = useRef<Map<string, Element>>(new Map());

    const selectionSchemeHandlers: { [key: string]: (startDate: Date, endDate: Date, foo: Array<Array<Date>>) => Date[] } = {
        linear: selectionSchemes.linear,
        square: selectionSchemes.square,
    };

    const cellToDate: Map<Element, Date> = new Map();

    const gridRef = useRef(null);

    const [selectionDraft, setSelectionDraft] = useState([...props.selection]);
    const [selectionType, setSelectionType] = useState(null);
    const [selectionStart, setSelectionStart] = useState(null);
    const [isTouchDragging, setIsTouchDragging] = useState(false);
    const [dates, setDates] = useState(computeDatesMatrix(props));
    const [forceEndSelection, setForceEndSelection] = useState(false);
    const [status, setStatus] = useState(Status.UNINITIALIZED);
    const [blockedSlots, setBlockedSlots] = useState([...props.blockedSpan]);
    const [overlayBounds, setoverlayBounds] = useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedBlockedSlotOvelay, setSelectedBlockedSlotOvelay] = useState(null);
    const [isMouseTooltipVisible, setIsMouseToolipVisible] = useState(false);

    const onBlockedSlotOverlayClick = (target, bounds) => {
        setSelectedBlockedSlotOvelay(bounds);
        setMenuAnchorEl(target);
    };

    const onResize = () => {
        updateOverlays();
    };

    const updateOverlays = () => {
        if (blockedSlots && blockedSlots.length > 0 && dateCellMap.current.size > 0) {
            const date = formatDate(blockedSlots[0], 'yyyy-MM-dd-H:mm:ss').split('-')[2];
            const blockedList = blockedSlots.filter((x) => {
                const ts = formatDate(x, 'yyyy-MM-dd-H:mm:ss');

                return date === ts.split('-')[2];
            });
            const elList = blockedList.map((x) => {
                const ts = formatDate(x, 'yyyy-MM-dd-H:mm:ss');
                return dateCellMap.current.get(ts);
            });

            const firstEl = elList[0];
            const boundsGrid = gridRef.current.getBoundingClientRect();
            const bounds = firstEl.getBoundingClientRect();
            const left = bounds.left - boundsGrid.left;
            const top = bounds.top - boundsGrid.top;
            const { width } = bounds;

            const height = elList.length * cellHeight + (elList.length - 1) * props.rowGap;

            setoverlayBounds([
                {
                    left,
                    top,
                    width,
                    height,
                },
            ]);
        }
    };

    const endSelection = () => {
        setStatus(Status.END);

        setSelectionType(null);
        setSelectionStart(null);
    };
    /** -----------------------------======================== */
    // console.log(Status.IN_PROGRESS && 'progress')
    // console.log(selectionDraft[0], selectionDraft[selectionDraft.length - 1], 'selection draft')

    // const tooltip = () => {
    //     console.log('tooltipstart')
    //     return (
    //         <MouseTooltip
    //             visible={true}
    //             offsetX={15}
    //             offsetY={10}
    //         >
    //             <span style={{ backgroundColor: 'black' }}>Follow the cursor!</span>
    //         </MouseTooltip>
    //     )
    // }

    // if (Status.IN_PROGRESS) {
    //     setIsMouseToolipVisible(true);
    // }

    /** -----------------------------======================== */

    useEffect(() => {
        window.addEventListener('resize', onResize);

        if (selectionStart === null) {
            setSelectionDraft([...props.selection]);
            setDates(computeDatesMatrix(props));
        }

        if (willMount.current) {
            document.removeEventListener('mouseup', endSelection);
            cellToDate.forEach((value, dateCell) => {
                if (dateCell && dateCell.removeEventListener) {
                    dateCell.removeEventListener('touchmove', preventScroll);
                }
            });
            willMount.current = false;
        }

        document.addEventListener('mouseup', endSelection);

        cellToDate.forEach((value, dateCell) => {
            if (dateCell && dateCell.addEventListener) {
                dateCell.addEventListener('touchmove', preventScroll, { passive: false });
            }
        });

        updateOverlays();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        if (forceEndSelection) {
            endSelection();
            setForceEndSelection(false);
        }
    }, [endSelection, forceEndSelection]);

    useEffect(() => {
        if (status === Status.END) {
            props.onChange(selectionDraft);
        }
    }, [props, selectionDraft, status]);

    useEffect(() => {
        setDates(computeDatesMatrix(props));
    }, [props.startDate, props.numDays, props]);

    const getTimeFromTouchEvent = (event: React.TouchEvent<any>): Date | null => {
        const { touches } = event;
        if (!touches || touches.length === 0) return null;
        const { clientX, clientY } = touches[0];
        const targetElement = document.elementFromPoint(clientX, clientY);
        if (targetElement) {
            const cellTime = cellToDate.get(targetElement);
            return cellTime ?? null;
        }
        return null;
    };

    const updateAvailabilityDraft = (selectionEnd: Date | null, callback?: () => void) => {
        if (selectionType === null || selectionStart === null) return;

        let newSelection: Array<Date> = [];
        if (selectionStart && selectionEnd && selectionType) {
            newSelection = selectionSchemeHandlers[props.selectionScheme](selectionStart, selectionEnd, dates);
        }

        newSelection = newSelection.filter((x) => {
            const blocked = Boolean(blockedSlots.find((a) => isSameMinute(a, x)));
            return !blocked;
        });

        let nextDraft = [...props.selection];
        if (selectionType === 'add') {
            nextDraft = Array.from(new Set([...nextDraft, ...newSelection]));
        } else if (selectionType === 'remove') {
            nextDraft = nextDraft.filter((a) => !newSelection.find((b) => isSameMinute(a, b)));
        }

        setSelectionDraft(nextDraft);
    };

    const handleMouseUpEvent = (time: Date) => {
        console.log('mouse up');
        updateAvailabilityDraft(time);
        // Don't call endSelection() here because the document mouseup handler will do it
    };

    const handleMouseEnterEvent = (time: Date) => {
        updateAvailabilityDraft(time);
    };

    const handleTouchMoveEvent = (event: React.TouchEvent) => {
        setIsTouchDragging(true);
        const cellTime = getTimeFromTouchEvent(event);
        if (cellTime) {
            updateAvailabilityDraft(cellTime);
        }
    };

    const handleTouchEndEvent = () => {
        if (!isTouchDragging) {
            updateAvailabilityDraft(null);

            setForceEndSelection(true);
        } else {
            endSelection();
        }
        setIsTouchDragging(false);
    };

    // Isomorphic (mouse and touch) handler since starting a selection works the same way for both classes of user input
    const handleSelectionStartEvent = (startTime: Date) => {
        // Check if the startTime cell is selected/unselected to determine if this drag-select should
        // add values or remove values
        const timeSelected = props.selection.find((a) => isSameMinute(a, startTime));
        setSelectionType(timeSelected ? 'remove' : 'add');
        setSelectionStart(startTime);
        setStatus(Status.START);
    };

    const renderDateCellWrapper = (time: Date): JSX.Element => {
        const startHandler = () => {
            handleSelectionStartEvent(time);
        };

        const selected = Boolean(selectionDraft.find((a) => isSameMinute(a, time)));
        const blocked = Boolean(blockedSlots.find((a) => isSameMinute(a, time)));

        return (
            <GridCell
                className="rgdp__grid-cell"
                role="presentation"
                key={time.toISOString()}
                // Mouse handlers
                onMouseDown={startHandler}
                onMouseEnter={() => {
                    if (blocked) {
                        endSelection();
                        setForceEndSelection(true);
                    } else {
                        handleMouseEnterEvent(time);
                    }
                }}
                onMouseUp={() => {
                    if (!blocked) {
                        handleMouseUpEvent(time);
                    }
                }}
                onTouchStart={startHandler}
                onTouchMove={handleTouchMoveEvent}
                onTouchEnd={handleTouchEndEvent}
            >
                {renderDateCell(time, selected, blocked)}
            </GridCell>
        );
    };

    // const renderBlockedSlotOverlay = () => {
    //     if (dateCellMap.current.size > 0) {
    //         const elList = blockedSlots.map((x) => {
    //             const ts = formatDate(x, 'yyyy-MM-dd-H:mm:ss');
    //             return dateCellMap.current.get(ts);
    //         });
    //
    //         const firstEl = elList[0];
    //         const boundsGrid = gridRef.current.getBoundingClientRect();
    //         const bounds = firstEl.getBoundingClientRect();
    //         const left = bounds.left - boundsGrid.left;
    //         const top = bounds.top - boundsGrid.top;
    //
    //         return <BlockedSlotOverlay left={left} top={top} width={bounds.width} height={100} />;
    //     } else return null;
    // };

    const renderDateCell = (time: Date, selected: boolean, blocked: boolean): JSX.Element => {
        const refSetter = (dateCell: HTMLElement | null) => {
            if (dateCell) {
                cellToDate.set(dateCell, time);
                const ts = formatDate(time, 'yyyy-MM-dd-H:mm:ss');
                dateCellMap.current.set(ts, dateCell);
            }
        };
        if (props.renderDateCell) {
            return props.renderDateCell(time, selected, refSetter);
        } else {
            return <DateCell blocked={blocked} selected={selected} ref={refSetter} selectedColor={props.selectedColor} unselectedColor={props.unselectedColor} hoveredColor={props.hoveredColor} disabledColor={props.disabledColor} />;
        }
    };

    const renderTimeLabel = (time: Date, i: number): JSX.Element => {
        if (props.renderTimeLabel) {
            return props.renderTimeLabel(time);
        } else {
            return <TimeText>{i % 2 === 0 && formatDate(time, props.timeFormat)}</TimeText>;
        }
    };

    const renderDateLabel = (date: Date, index: number): JSX.Element => {
        if (!index) {
            return <DateLabel />;
        }
        if (props.renderDateLabel) {
            return props.renderDateLabel(date);
        } else {
            return <DateLabel>{formatDate(date, props.dateFormat)}</DateLabel>;
        }
    };

    const renderFullDateGrid = (): Array<JSX.Element> => {
        const flattenedDates: Date[] = [];
        const numDays = dates.length;
        const numTimes = dates[0].length;
        for (let j = 0; j < numTimes; j += 1) {
            for (let i = 0; i < numDays; i += 1) {
                flattenedDates.push(dates[i][j]);
            }
        }
        const dateGridElements = flattenedDates.map(renderDateCellWrapper);
        for (let i = 0; i < numTimes; i += 1) {
            const index = i * numDays;
            const time = dates[0][i];
            // Inject the time label at the start of every row
            dateGridElements.splice(index + i, 0, renderTimeLabel(time, i));
        }
        return [
            // Empty top left corner
            <div key="topleft" />,
            // Every row after that
            ...dateGridElements.map((element, index) => React.cloneElement(element, { key: `time-${index}` })),
        ];
    };

    const renderBlockedSlots = () => {
        return (
            overlayBounds &&
            overlayBounds.length > 0 &&
            overlayBounds.map((x) => (
                <BlockedSlotOverlay left={x.left} top={x.top} width={x.width} height={x.height} onClick={(e) => onBlockedSlotOverlayClick(e.target, x)}>
                    <Stripe />
                </BlockedSlotOverlay>
            ))
        );
    };

    return (
        <Wrapper overlayBounds={overlayBounds}>
            <Grid columns={dates.length} rows={1} columnGap={props.columnGap} rowGap={props.rowGap} ref={(el) => (gridRef.current = el)}>
                <div key="topleft" />
                {dates.map((dayOfTimes, index) => React.cloneElement(renderDateLabel(dayOfTimes[1], index), { key: `date-${index}` }))}
            </Grid>
            <Scrollbars style={{ height: 300 }}>
                <Grid columns={dates.length} rows={dates[0].length} columnGap={props.columnGap} rowGap={props.rowGap} ref={(el) => (gridRef.current = el)}>
                    {renderFullDateGrid()}
                    {/* {renderBlockedSlots()} */}
                </Grid>
            </Scrollbars>
            {/* <ScheduleDetailsMenu target={selectedBlockedSlotOvelay} anchorOrigin={{ vertical: 'center', horizontal: selectedBlockedSlotOvelay ? selectedBlockedSlotOvelay.width + 10 : 20 }} anchorEl={menuAnchorEl} onClose={() => onBlockedSlotOverlayClick(null, null)}></ScheduleDetailsMenu>
            <SUIBackdrop open={Boolean(menuAnchorEl)} /> */}
        </Wrapper>
    );
};

UIScheduler.defaultProps = {
    selection: [],
    blockedSpan: [],
    selectionScheme: 'square',
    numDays: 7,
    minTime: 9,
    maxTime: 23,
    hourlyChunks: 2,
    startDate: new Date(),
    timeFormat: 'ha',
    dateFormat: 'Mon/d',
    columnGap: 2,
    rowGap: 2,
    selectedColor: ThemeColor.secondDark,
    unselectedColor: ThemeColor.second,
    hoveredColor: ThemeColor.secondMiddle,
    disabledColor: ThemeColor.basic,
    onChange: () => {},
};

export default UIScheduler;
