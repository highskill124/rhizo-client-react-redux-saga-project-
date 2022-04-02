import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { UploadFileIcon } from '../icon/UIIconAssets';
import { UploadedFileIcon } from '../icon/UIIconAssets';
import { ThemeColor } from '../../settings/ThemeColor';
import { LinearProgress, makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { CloseIcon } from '../icon/UIIconAssets';
import { Device } from '../../settings/Device';

import UIBox from '../layout/UIBox';
import UISpacer from '../core/UISpacer';
import { FontSize, FontWeight } from '../../settings/Font';

const Button = styled.button`
    margin: 0px 0px 20px 0px;
    border: 1px dashed #a4a4a4;
    border-radius: 18px;
    padding: 20px 30px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    &:hover {
        cursor: pointer;
    }
    color: ${ThemeColor.secondDark};
`;

const FileName = styled.p`
    color: ${ThemeColor.title};
    font-size: ${FontSize.sm};
    font-weight: ${FontWeight.medium};
`;

const FileSize = styled.p`
    color: #545454;
    font-size: ${FontSize.xxs};
    margin-top: 0;
`;

const CloseButton = styled.div`
    width: 30px !important;
    height: 30px !important;
    padding: 8px;
    padding-left: 10px;
    background-color: ${ThemeColor.second};
    border-radius: 50%;
    flex-shrink: 0;
    &:hover {
        cursor: pointer;
    }
    > svg {
        width: 11px;
        height: 11px;
    }
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:nth-child(1) {
        width: 300px;
    }
`;

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const FileUploader = (props) => {
    const hiddenFileInput = React.useRef(null);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = React.useState(10);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
        setProgress(10);
    };

    const removeFile = () => {
        setFile(null);
        hiddenFileInput.current.value = '';
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            {file ? (
                <UIBox>
                    <UploadedFileIcon />
                    <UISpacer width={12}></UISpacer>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '250px' }}>
                            <FileName>{file.name}</FileName>
                            <Div>
                                {progress < 100 && (
                                    <>
                                        <LinearProgressWithLabel value={progress} />
                                        <CloseButton onClick={removeFile}>
                                            <CloseIcon />
                                        </CloseButton>
                                    </>
                                )}
                            </Div>
                            <FileSize>
                                {file.size}
                                {file.size === 1 ? 'Byte' : 'Bytes'}
                            </FileSize>
                        </div>
                        {progress >= 100 && (
                            <CloseButton onClick={removeFile}>
                                <CloseIcon />
                            </CloseButton>
                        )}
                    </div>
                </UIBox>
            ) : (
                <Button onClick={handleClick}>
                    <UploadFileIcon />
                    <UISpacer width={7}></UISpacer>
                    Upload a file
                </Button>
            )}
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
        </>
    );
};
export default FileUploader;
