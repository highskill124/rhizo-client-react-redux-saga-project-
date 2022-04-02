import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import SwiperCore, { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import CurrentCourseItem from '../../page/settings/course/CurrentCourseItem';
import { majorList } from '../../util/mock-api/data/major-list';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

SwiperCore.use([Scrollbar, A11y]);
const Wrapper = styled.div<Partial<IProps>>`
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    box-sizing: border-box;
    > div {
        >div: nth-child(2) {
            display: block; // <<<< COURSES PAGE DISPLAY BLOCK SETTING >>>>
        }
    }
`;

const SwiperWrapper = styled.div<any>`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    /* width: 100%; */
`;

const SlideWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%px;
    /* height: 140px; */
`;

const TutorDetails = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-color: ${ThemeColor.white};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 25px 20px 25px;
    padding: 0px 0px 0px 0px;
    height: 38px;

    > div:nth-child(1) {
        width: 38px;
        height: 38px;
        background-color: ${ThemeColor.basic};
        border-radius: 50%50%;
        overflow: hidden;
        > div {
            display: none;
        }
        img {
            width: 100%;
            height: auto;
        }
    }

    > div:nth-child(2) {
        margin: 0px 12px 0px 12px;
        padding: 0px 10px;

        > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            > h4 {
                font-weight: ${FontWeight.medium};
                font-size: ${FontSize.md};
                line-height: ${LineHeight.md};
                letter-spacing: ${LetterSpacing.md};
                color: ${ThemeColor.grey45};
                margin: 0px;
                padding: 0px;
            }
        }
        > span {
            font-weight: ${FontWeight.medium};
            font-size: ${FontSize.sm};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            margin: 3px 0px 0px 0px;
        }
    }

    > span {
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        text-align: right;
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey45};
    }
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
    style?: any;
    detailShow?: boolean;
}

const CourseList: FC<IProps> = (props) => {
    const { id, list, profileName, image, level, hourlyRate, ratings, detailShow, style } = props;

    return (
        list && (
            <Wrapper id={id} style={style}>
                <Swiper spaceBetween={20} slidesPerView="auto" scrollbar={{ draggable: true, hide: true }} onSwiper={(swiper) => console.log(swiper)} onSlideChange={() => console.log('slide change')}>
                    {list &&
                        list.length > 0 &&
                        list.map((x, i) => (
                            <SlideWrapper>
                                <CurrentCourseItem title={x.title} totalSessions={x.totalSessions} hoursTaught={x.hoursTaught} tags={majorList} detailShow={detailShow} key={i} />
                            </SlideWrapper>
                        ))}
                </Swiper>
            </Wrapper>
        )
    );
};

CourseList.defaultProps = {};

export default CourseList;
