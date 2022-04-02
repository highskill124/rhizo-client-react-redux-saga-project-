/* eslint-disable no-unused-vars */
import React, { FC, useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import { useField } from 'formik';
import styled from 'styled-components';
// import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';
import UISpacer from '../core/UISpacer';
import UICheckBox from './UICheckBox';
import UIFormControl from './UIFormControl';
import { UILabel } from './UILabel';
import { ReactComponent as UploadIcon } from '../../media/image/upload-file-icon.svg';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

export const FieldWrapper = styled.div<any>`
    position: relative;
    border: none;
    display: flex;
    width: 100%;
    height: 64px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${ThemeColor.white};
`;

const dropzoneStyle = {
    width: '100%',
    height: 64,
    minHeight: 64,
    background: ThemeColor.white,
    border: `1px dashed ${ThemeColor.grey165}`,
    borderRadius: 13,
};

const dropzoneActiveStyle = { borderColor: ThemeColor.primary };

const DZLayoutWrapper = styled.span`
    display: flex;
    width: 100%;
    height: 64px;
    user-select: none;
`;

const IconWrapper = styled.div<any>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* right: 7px; */
    width: 32px;
    height: 32px;
    padding: 0px;
    border-radius: 16px;
    overflow: hidden;

    & > svg {
        display: flex;
        width: 15px;
        height: 15px;
        user-select: false;
        pointer-events: none;
    }
`;

const DZPreviewWrapper = styled.span`
    display: flex;
    width: 100%;
    height: 64px;
`;

const DZPreview = ({ meta }) => {
    const { name, percent, status } = meta;
    return (
        <DZPreviewWrapper>
            {name}, {Math.round(percent)}%, {status}
        </DZPreviewWrapper>
    );
};

const DZInputLabel = styled.label`
    display: flex;
    width: 100%;
    height: 64px;
    cursor: pointer;
    padding: 15px;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.primary};
    flex-direction: row;
    justify-content: center;
`;

const Text = styled.span`
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.md};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.primary};
    flex: none;
    flex-grow: 0;
    margin: 7px 0px;
    user-select: none;
`;

// const DZInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
//     const text = files && files.length > 0 ? 'Upload transcript file' : 'Upload transcript file';

//     return (
//         <DZInputLabel>
//             <IconWrapper>
//                 <UploadIcon />
//             </IconWrapper>
//             <Text>{text}</Text>
//             <input
//                 style={{ display: 'none' }}
//                 type="file"
//                 accept={accept}
//                 multiple
//                 onChange={(e) => {
//                     getFilesFromEvent(e).then((chosenFiles) => {
//                         onFiles(chosenFiles);
//                     });
//                 }}
//             />
//         </DZInputLabel>
//     );
// };

// const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
//     return (
//         <DZLayoutWrapper>
//             {previews}

//             <div style={{ minHeight: 42 }} {...dropzoneProps}>
//                 {files.length < maxFiles && input}
//             </div>

//             {files.length > 0 && submitButton}
//         </DZLayoutWrapper>
//     );
// };

interface IProps {
    className?: string;
    id?: string;
    name: string;
    label?: string;
}

const UIFileUpload: FC<IProps> = (props) => {
    const { id, name, label } = props;
    // const [field, meta, helpers] = useField(name);
    const [field, meta, helpers] = useField({ name });
    const [terms, setTerms] = useState(false);

    // const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (x, status) => {
    //     if (status === 'headers_received') {
    //         // TODO
    //     } else if (status === 'aborted') {
    //         // TODO ;
    //     }
    // };

    // const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({ url: '#' });

    // const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    //     allFiles.forEach((f) => f.remove());
    // };

    return (
        <UIFormControl>
            {label && <UILabel htmlFor={id}>{label}</UILabel>}

            <FieldWrapper key={id} count={1}>
                {/* <Dropzone
                    key={`dropzone-${id}`}
                    // LayoutComponent={Layout}
                    // PreviewComponent={DZPreview}
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    maxFiles={1}
                    multiple={false}
                    canCancel={false}
                    inputContent={DZInput}
                    // accept="image/*,audio/*,video/*"
                    styles={{
                        dropzone: dropzoneStyle,
                        dropzoneActive: dropzoneActiveStyle,
                    }}
                /> */}
            </FieldWrapper>
            <UISpacer width={1} height={10} />
            <UICheckBox id="terms" name="terms" checked={terms} onChange={() => setTerms(!terms)} label="Verified courses will be publicly displayed with grades publicly viewable. Rhizo reserves the right to verify your transcript with your institution." />
        </UIFormControl>
    );
};

UIFileUpload.defaultProps = {};

export default UIFileUpload;
