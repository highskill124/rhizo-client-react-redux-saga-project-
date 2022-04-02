import React, { FC } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { StarIcon } from '../icon/UIIconAssets';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: auto;
    padding: 12px 15px;
    background: ${ThemeColor.basic};
    border-radius: 10px;
    position: relative;
    width: 160px;

    .text {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.md};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.grey104};
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
        * {
            fill: ${ThemeColor.grey165};
        }
    }

    .MuiRating-iconFilled {
        color: ${ThemeColor.primary};
        svg {
            * {
                fill: ${ThemeColor.primary};
            }
        }
    }

    .MuiRating-iconHover {
        color: '${ThemeColor.primary};';
        svg {
            * {
                fill: '${ThemeColor.primary};';
            }
        }
    }

    .MuiRating-iconActive {
        transform: scale(1);
    }
`;

interface IProps {
    className?: string;
    id?: string;
    value: number;
    readOnly?: boolean;
}

const UIRating: FC<IProps> = (props) => {
    const { id, value, readOnly } = props;
    const [selected, setSelected] = React.useState<number | null>(value);
    const [hover, setHover] = React.useState(-1);

    const labels: { [index: string]: string } = {
        0.5: '0.5',
        1: '1.0',
        1.5: '1.5',
        2: '2.0',
        2.5: '2.5',
        3: '3.0',
        3.5: '3.5',
        4: '4.0',
        4.5: '4.5',
        5: '5.0',
    };

    return (
        <Wrapper id={id}>
            <SRating
                // ---
                name={id}
                defaultValue={2.5}
                getLabelText={(x) => `${x}`}
                precision={0.5}
                value={value}
                icon={<StarIcon />}
                readOnly={readOnly}
                onChange={(event, newValue) => {
                    setSelected(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && <span className="text">{labels[hover !== -1 ? hover : selected]}</span>}
        </Wrapper>
    );
};

UIRating.defaultProps = {
    readOnly: true,
};

export default UIRating;
