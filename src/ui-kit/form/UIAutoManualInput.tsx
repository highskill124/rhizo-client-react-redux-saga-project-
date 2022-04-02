/* eslint-disable no-unused-vars */
import { useField } from 'formik';
import React, { FC, ReactNode, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Container, Icon } from '@material-ui/core';
import UIButton from '../button/UIButton';
import UIFormControl from './UIFormControl';
import UIBox from '../layout/UIBox';
import UITextField from './UITextField';
import UISpacer from '../core/UISpacer';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import UICustomModal from '../core/UICustomModal';
import { ThemeColor } from '../../settings/ThemeColor';
import { FontSize } from '../../settings/Font';
import { FontWeight } from '../../settings/Font';

const Label = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
    font-weight: ${FontWeight.medium};
`;

const SubLabel = styled.p`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.sm};
`;

const Div = styled.div`
    width: 50%;
    padding: 0;
`;

const Li = styled.li`
    color: ${ThemeColor.subtitle};
    font-size: ${FontSize.md};
`


interface IProps {
    placeholder?: string;
    style?: any;
    options: Array<any>;
    children?: ReactNode;
    className?: string;
    onConfirm?: (x: any) => void;
}

const filter = createFilterOptions();

const UIAutoManualInput: FC<IProps> = (props) => {
    const { options, className, style, onConfirm } = props;
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            course: '',
            number: '',
        });

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        course: '',
        number: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            course: dialogValue.course,
            number: parseInt(dialogValue.number, 10),
        });
        handleClose();
    };

    useEffect(() => {
        onConfirm(value);
        setValue(null);
    }, [value])

    return (
        <>
            <Autocomplete
                className={className}
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        console.log('not new value3', newValue)
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                course: newValue,
                                number: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        console.log('not new value2', newValue)
                        toggleOpen(true);
                        setDialogValue({
                            course: newValue.inputValue,
                            number: '',
                        });
                    } else {
                        console.log('not new value', newValue)
                        setValue(newValue);
                        // handleChange(newValue);
                    }
                }}

                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    console.log(filtered, 'filtered')
                    if (params.inputValue !== '') {
                        console.log(params.inputValue, 'paramsinputvalue');
                        filtered.push({
                            inputValue: params.inputValue,
                            course: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={options}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.course;
                }}
                style={style}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <Li {...props}>{option.course + " " + (option.number ? option.number : '')}</Li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} />}
            />
            <UICustomModal open={open} onClose={handleClose} title="Add a new Course" subTitle="Add a new course to your profile" hideBack>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <DialogContent style={{ padding: '20px 0px' }}>
                        <UISpacer height={25}></UISpacer>
                        <UIBox gap={15}>
                            <Div>
                                <Label>Major</Label>
                                <SubLabel>The major of your courses. e.g (Math)</SubLabel>
                                <UITextField
                                    id="name"
                                    name="major"
                                    value={dialogValue.course}
                                    onChange={(event) =>
                                        setDialogValue({
                                            ...dialogValue,
                                            course: event.target.value,
                                        })
                                    }
                                />
                            </Div>
                            <Div>
                                <Label>Course Number</Label>
                                <SubLabel>The course number. e.g (101)</SubLabel>
                                <UITextField
                                    id="name"
                                    name="number"
                                    value={dialogValue.number}
                                    onChange={(event) =>
                                        setDialogValue({
                                            ...dialogValue,
                                            number: event.target.value,
                                        })
                                    }
                                />
                            </Div>
                        </UIBox>
                    </DialogContent>
                    <DialogActions style={{ padding: '20px 0px' }}>
                        <UIButton color="basicline" onClick={handleClose}>Cancel</UIButton>
                        <UIButton color="second" type="submit">Confirm</UIButton>
                    </DialogActions>
                </form>
            </UICustomModal>
        </>
    );
};

UIAutoManualInput.defaultProps = {};

export default UIAutoManualInput;
