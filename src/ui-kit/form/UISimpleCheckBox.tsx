import React, { FC } from 'react';
import { Checkbox, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 0px;
`;

const useStyles = makeStyles((theme) => ({
    checkButton: {
        '&.Mui-checked': {
            color: ThemeColor.primary,
        },
    },
}));

interface IProps {
    value: number;
    checked: boolean;
    onChange: (x) => void;
}

const UISimpleCheckBox: FC<IProps> = (props) => {
    const classes = useStyles();
    const { checked, onChange, value } = props;
    return (
        <Wrapper>
            <Checkbox checked={checked} onChange={onChange} value={value} className={classes.checkButton} />
        </Wrapper>
    );
};

UISimpleCheckBox.defaultProps = {};

export default UISimpleCheckBox;
