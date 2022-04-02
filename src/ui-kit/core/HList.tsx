/* eslint-disable no-param-reassign */
import React, { FC, ReactNode, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import NewCurrentCourseItem from '../../page/settings/course/NewCurrentCourseItem';
import { majorList } from '../../util/mock-api/data/major-list';
import UIBox from '../layout/UIBox';
import UIButton from '../button/UIButton';
import { RightArrowIcon, LeftArrowIcon } from '../icon/UIIconAssets';
import UIUserProfile from './UIUserProfile';
import { FontSize } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { MessageIcon, CalendarIcon } from '../../ui-kit/icon/UIIconAssets';
import useDrag from './useDrag';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    border-top: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    padding: 20px 0px 25px 0px;
    .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
        display: none;
    }

    .react-horizontal-scrolling-menu--scroll-container {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    * {
        box-sizing: border-box;
    }
`;

const HourlyRate = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.lg};
    margin: 0;
`;

const BottomWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 10px 25px 0px 25px;
    padding: 0px 0px 0px 0px;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

const ItemContainer = styled.div`
    padding: 0 20px 0 0;
`;

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: 'none !important',
        width: '260px !important',
        marginRight: '20px !important',
    },
    arrow: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        cursor: 'pointer',
        display: 'block',
        height: 23,
        width: 23,
        padding: 0,
        backgroundColor: ThemeColor.border,
        border: 'none',
        borderRadius: '50%',
        '&>svg': {
            width: 10,
            height: 10,
        },
        '&:hover': {
            backgroundColor: ThemeColor.grey192,
            transition: '.4s',
        },
    },
    scrollContainer: {
        '&>.react-horizontal-scrolling-menu--wrapper': {
            position: 'relative',
            '&>button:nth-child(1)': {
                position: 'absolute',
                left: 0,
                top: '50%',
                zIndex: '100',
            },
            '&>button:nth-child(3)': {
                position: 'absolute',
                right: 0,
                top: '50%',
                zIndex: '100',
            },
        },
    },
}));

type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;
interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    list?: Array<any>;
    profileName?: string;
    image?: string;
    level?: string;
    hourlyRate?: number;
    ratings?: number;
    subject?: string;
    detail?: boolean;
    bottomWrapper?: boolean;
    moreIcon?: boolean;
}

const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
    return (
        <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            <LeftArrowIcon />
        </Arrow>
    );
};
const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
            <RightArrowIcon />
        </Arrow>
    );
};

const Arrow = ({ children, disabled, onClick }: { children: React.ReactNode; disabled: boolean; onClick: VoidFunction }) => {
    const classes = useStyles();
    return (
        <button
            disabled={disabled}
            type="button"
            onClick={onClick}
            style={{
                opacity: disabled ? '0' : '1',
            }}
            className={classes.arrow}
        >
            {children}
        </button>
    );
};

const HList: FC<IProps> = ({ id, list, profileName, moreIcon, image, level, hourlyRate, subject, ratings, detail, bottomWrapper }) => {
    const classes = useStyles();
    const getItems = () => list.map((item, index) => ({ ...item, id: `element-${index}` }));
    const [items, setItems] = useState(getItems);
    const [selected, setSelected] = React.useState<string>('');
    const { dragStart, dragStop, dragMove, dragging } = useDrag();
    const handleDrag =
        ({ scrollContainer }: ScrollVisibilityApiType) =>
        (ev: React.MouseEvent) =>
            dragMove(ev, (posDiff) => {
                if (scrollContainer.current) {
                    scrollContainer.current.scrollLeft += posDiff;
                }
            });

    const handleItemClick = (itemId: string) => () => {
        if (dragging) {
            return false;
        }
        setSelected(selected !== itemId ? itemId : '');
    };
    type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

    const onWheel = (apiObj: scrollVisibilityApiType, ev: React.WheelEvent) => {
        const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

        // if (isThouchpad) {
        //     ev.stopPropagation();
        //     return;
        // }

        // if (ev.deltaY < 0) {
        //     apiObj.scrollNext();
        // } else if (ev.deltaY > 0) {
        //     apiObj.scrollPrev();
        // }
        ev.stopPropagation();
    };

    return (
        list && (
            <Wrapper id={id}>
                <UIBox direction="column" alignSelf="stretch" flex>
                    {detail && (
                        <UIBox justifyContent="space-between" alignItems="center" style={{ paddingRight: '20px' }}>
                            <UIUserProfile ratings={ratings} gender={level} avatar={image} profileName={profileName} subject={subject} />
                            <HourlyRate>${hourlyRate}/hr</HourlyRate>
                        </UIBox>
                    )}
                    <ItemContainer style={{ width: '100%' }} className={classes.scrollContainer}>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel} onMouseDown={() => dragStart} onMouseUp={() => dragStop} onMouseMove={handleDrag}>
                            {items && items.length > 0 && items.map((x, i) => <NewCurrentCourseItem itemId={x.id} showMenuButton={moreIcon} title={x.title} totalSessions={x.totalSessions} verified={x.verified} hoursTaught={x.hoursTaught} tags={majorList} className={classes.card} />)}
                        </ScrollMenu>
                    </ItemContainer>

                    {bottomWrapper && (
                        <BottomWrapper>
                            <ButtonsContainer>
                                <UIButton color="basic" onClick={() => {}}>
                                    <MessageIcon />
                                    Message
                                </UIButton>
                                <UIButton color="second" onClick={() => {}}>
                                    <CalendarIcon />
                                    Schedule session
                                </UIButton>
                            </ButtonsContainer>
                        </BottomWrapper>
                    )}
                </UIBox>
            </Wrapper>
        )
    );
};

HList.defaultProps = {
    bottomWrapper: true,
    detail: true,
};

export default HList;
