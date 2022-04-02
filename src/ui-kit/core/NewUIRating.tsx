import React, { FC } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { SessionStarIcon } from '../../ui-kit/icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import UISpacer from './UISpacer';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: auto;
    position: relative;
    padding: 3px 0;

    .text {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xxs};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: #a1abb3;
        margin-left: 8px;
        user-select: none;
    }
`;

const SRating = styled(Rating)<any>`
    > .MuiRating-root {
        margin-left: 0px;
    }

    svg {
        display: inline-flex;
        flex-shrink: 0;
        flex-grow: 0;
        margin: 3px;
        width: 8px;
        height: 8px;
        * {
            stroke: ${ThemeColor.warn};
            fill: ${ThemeColor.white};
        }
    }

    .MuiRating-iconFilled {
        color: ${ThemeColor.warn};
        svg {
            * {
                fill: ${ThemeColor.warn};
            }
        }
    }

    .MuiRating-iconHover {
        color: '${ThemeColor.warn};';
        svg {
            * {
                fill: '${ThemeColor.warn};';
            }
        }
    }

    .MuiRating-iconActive {
        transform: scale(1);
    }

    .MuiRating-decimal {
        width: 13px;
    }
`;

interface IProps {
    className?: string;
    id?: string;
    value: number;
    readOnly?: boolean;
    subject?: string;
    style?: any;
}

const NewUIRating: FC<IProps> = (props) => {
    const { id, value, readOnly, subject, style } = props;
    const [selected, setSelected] = React.useState<number | null>(value);
    const [hover, setHover] = React.useState(-1);

    return (
        <Wrapper id={id} style={style}>
            <SRating
                // ---
                name={id}
                defaultValue={2.5}
                getLabelText={(x) => `${x}`}
                precision={0.1}
                value={value}
                icon={<SessionStarIcon />}
                readOnly={readOnly}
                onChange={(event, newValue) => {
                    setSelected(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            <UISpacer width={5}></UISpacer>
            {value !== null && (
                <span className="text">
                    {value}&nbsp;{subject ? '•' : null}&nbsp;{subject}
                </span>
            )}
        </Wrapper>
    );
};

NewUIRating.defaultProps = {
    readOnly: true,
};

export default NewUIRating;
