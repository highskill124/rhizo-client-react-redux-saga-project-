import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: none;
`;

const SToggleButtonGroup = styled(ToggleButtonGroup)`
    .MuiToggleButton-root {
        height: 40px;
        border: none;
        padding: 0px 10px;
        min-width: 120px;
        .MuiToggleButton-label {
            font-style: normal;
            font-weight: ${FontWeight.bold};
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            letter-spacing: ${LetterSpacing.md};
            color: ${ThemeColor.grey104};
            text-transform: none;
            padding: 0px 15px;

            svg {
                margin-left: 10px;
                * {
                    fill: ${ThemeColor.grey104};
                }
            }
        }

        border-radius: 10px;
        /* border-bottom-left-radius: 15px; */
        background-color: ${ThemeColor.basic};

        &:hover {
            background-color: ${ThemeColor.primaryLight};
            .MuiToggleButton-label {
                color: ${ThemeColor.white};
                svg {
                    * {
                        fill: ${ThemeColor.white};
                    }
                }
            }
        }

        &.Mui-selected {
            background-color: ${ThemeColor.primary};
            .MuiToggleButton-label {
                color: ${ThemeColor.white};
                svg {
                    * {
                        fill: ${ThemeColor.white};
                    }
                }
            }
            &:hover {
                background-color: ${ThemeColor.primary};
                .MuiToggleButton-label {
                    color: ${ThemeColor.white};
                    svg {
                        * {
                            fill: ${ThemeColor.white};
                        }
                    }
                }
            }
        }
    }
`;

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
    list: Array<any>;
    value?: any;
    onChange?: (e) => void;
}

const UISegmentButtonGroup: FC<IProps> = (props) => {
    const { id, list, value, onChange } = props;
    const [item, setItem] = useState(value);

    const handleChange = (x) => {
        setItem(x);
        onChange(x);
    };

    return (
        <Wrapper id={id}>
            <SToggleButtonGroup value={item}>
                {list &&
                    list.length > 0 &&
                    list.map((x, i) => (
                        <ToggleButton value={x} onClick={() => handleChange(x)}>
                            {x.label}
                            {x.icon ? <x.icon /> : null}
                        </ToggleButton>
                    ))}
            </SToggleButtonGroup>
        </Wrapper>
    );
};

UISegmentButtonGroup.defaultProps = {
    value: 0,
};

export default UISegmentButtonGroup;
