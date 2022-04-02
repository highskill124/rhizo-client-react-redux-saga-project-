import * as React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { ThemeColor } from '../../settings/ThemeColor';
import { ArrowDownIcon } from '../icon/UIIconAssets';

const Container = styled.div`
    width: 100%;
`;

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100% !important',
        '&:focus-visible': {
            outline: 'none !important',
        },
        '&> .MuiOutlinedInput-root': {
            height: '40px !important',
        },
        '&> div:nth-child(1)': {
            '&> div:nth-child(1)': {
                '&> div:nth-child(1)': {
                    borderRadius: '10px !important',
                    border: `1px solid ${ThemeColor.border} !important`,
                    color: `${ThemeColor.grey104}`,
                    '&>fieldset': {
                        borderWidth: 0,
                    },
                    '&>div:nth-child(2)': {
                        '&> button': {
                            width: 20,
                            height: 20,
                            paddingRight: 10,
                        },
                    },
                    '&:hover': {
                        '&> input': {},
                    },
                    '&:focus-visible': {
                        '&>fieldset': {
                            borderWidth: 1,
                            border: `1px solid ${ThemeColor.primary}`,
                        },
                    },
                },
            },
        },
    },
}));

export default function Tags() {
    const classes = useStyles();
    return (
        <Container>
            <Stack spacing={3} sx={{ width: 500 }} className={classes.container}>
                <Autocomplete multiple id="tags-outlined" size="small" popupIcon={<ArrowDownIcon />} options={top100Films} getOptionLabel={(option) => option.title} filterSelectedOptions renderInput={(params) => <TextField {...params} placeholder="Favorites" />} />
            </Stack>
        </Container>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'Shawshank', year: 1994 },
    { title: 'Godfather', year: 1972 },
    { title: 'Godfather', year: 1974 },
    { title: 'Dark', year: 2008 },
    { title: 'Angry', year: 1957 },
];
