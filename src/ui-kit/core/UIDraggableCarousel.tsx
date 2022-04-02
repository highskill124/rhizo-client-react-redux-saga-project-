import React, { FC, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';
import styled, { css } from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
    carouselContainer: {
        width: '100%',
        '&>.react-multiple-carousel__arrow--right': {
            width: '18px',
            height: '18px',
            right: 'calc(1% + 1px)',
        },
        '&>.react-multiple-carousel__arrow::before': {
            fontSize: 10,
        },
        '&>.react-multiple-carousel__arrow': {
            minWidth: '18px',
            minHeight: '18px',
        },
        '&>.react-multiple-carousel__arrow--left': {
            width: '18px',
            height: '18px',
            left: 'calc(1% + 1px)',
        },
        '&>ul': {
            // gap: '15px',
        },
        '&.image-item': {
            padding: '15px 0 15px 15px',
        },
    },
}));

interface IProps {
    className?: string;
    children: ReactNode;
}

const UIDraggableCarousel: FC<IProps> = ({ children }) => {
    const classes = useStyles();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            // partialVisibilityGutter: 60,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            // partialVisibilityGutter: 50,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            // partialVisibilityGutter: 30,
        },
    };
    return (
        <Carousel ssr partialVisbile deviceType="desktop" itemClass="image-item" slidesToSlide={1} responsive={responsive} className={classes.carouselContainer}>
            {children}
        </Carousel>
    );
};

UIDraggableCarousel.defaultProps = {};

export default UIDraggableCarousel;
