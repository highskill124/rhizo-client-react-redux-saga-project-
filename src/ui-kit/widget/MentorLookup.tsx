import { useFormik } from 'formik';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Device } from '../../settings/Device';
import { RootState } from '../../store/state/RootReducer';
import { requestMajorQuery, SearchState } from '../../store/state/SearchState';
import UIAutoComplete from '../form/UIAutoComplete';
import UITextField from '../form/UITextField';
import UIForm from '../form/UIForm';
import UITabNav from '../navigation/tab/UITabNav';
import UIBadge from '../core/UIBadge';
import UITabPanel from '../navigation/tab/UITabPanel';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';
import { SearchIcon } from '../icon/UIIconAssets';

const Wrapper = styled.div<Partial<IProps>>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: none;
    flex-grow: 0;
    background-color: ${ThemeColor.white};
    padding: 0px;
    /* padding: 25px; */
    border-radius: 15px;
    min-height: 220px;
    position: relative;
    overflow: hidden;

    > h4 {
        font-style: normal;
        font-weight: ${FontWeight.medium};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        margin: 25px 0px 0px 25px;
        padding: 0px;
    }

    @media (max-width: ${Device.mobileMedium - 1}px) {
        border-radius: 10px;

        > h4 {
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            margin: 15px 0px 0px 15px;
        }
    }

    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        border-radius: 10px;

        > h4 {
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            margin: 15px 0px 0px 15px;
        }
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        border-radius: 10px;

        > h4 {
            font-size: ${FontSize.md};
            line-height: ${LineHeight.md};
            margin: 15px 0px 0px 15px;
        }
    }
`;

const TutorSearchWrapper = styled.div<any>`
    display: flex;
    position: absolute;
    right: 0;
    top: -10px;
    z-index: 1000;
    justify-content: end;
    margin: 10px 15px 0px 15px;
    align-self: stretch;
    > div {
        margin-bottom: 0px;
    }

    > div {
        width: 250px;
    }

    @media (max-width: ${Device.tablet}px) {
        > div {
            display: none;
        }
    }
`;

const TagListWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    flex: 1;
    position: relative;
`;

const Tag = styled.div<any>`
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.sm};
    line-height: ${LineHeight.md};
    letter-spacing: ${LetterSpacing.md};
    color: ${ThemeColor.grey104};
    margin: 4px 4px;
    background: ${ThemeColor.white};
    border: 1px solid ${ThemeColor.grey229};
    box-sizing: border-box;
    border-radius: 6px;
    height: 36px;
    padding: 0px 10px;
    user-select: none;
`;

const ContentWrapper = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 16px 25px 25px 25px;

    @media (max-width: ${Device.mobileMedium - 1}px) {
        padding: 15px;
    }
    @media (min-width: ${Device.mobileMedium}px) and (max-width: ${Device.tablet - 1}px) {
        padding: 15px;
    }
    @media (min-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
        padding: 15px;
    }
`;

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'absolute',
        right: 20,
        bottom: 10,
    },
}));

const tagList = [
    { name: 'History', number: 20 },
    { name: 'Higher Geometry', number: 15 },
    { name: 'Geographical science', number: 30 },
    { name: 'Higher Geometry', number: 43 },
    { name: 'History', number: 20 },
    { name: 'Higher Geometry', number: 15 },
    { name: 'Geographical science', number: 30 },
    { name: 'Higher Geometry', number: 43 },
];

interface IProps {
    className?: string;
    id?: string;
    children?: ReactNode;
}

const MentorLookup: FC<IProps> = (props) => {
    const { id } = props;
    const [index, setIndex] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    // const [, setCourseList] = useState([]);
    // const [, setTopicList] = useState([]);
    // const [, setMajorList] = useState([]);
    const [, setTutor] = useState(null);
    const classes = useStyles();

    const dispatch = useDispatch();
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const [majorOptions, setMajorOptions] = useState([]);
    // const [topicOptions, settopicOptions] = useState([]);
    // const [courseOptions, setcourseOptions] = useState([]);

    useEffect(() => {
        if (searchState.major.data && searchState.major.data.results) {
            const list = searchState.major.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setMajorOptions(list);
        }
        // if (searchState.topic.data && searchState.topic.data.results) {
        //     const list = searchState.topic.data.results.map((x) => ({ label: x.name, value: x.alias }));
        //     setTopicOptions(list);
        // }
        // if (searchState.course.data && searchState.course.data.results) {
        //     const list = searchState.course.data.results.map((x) => ({ label: x.name, value: x.alias }));
        //     setCourseOptions(list);
        // }
    }, [searchState]);

    const [tabLabels] = useState([
        { id: 'Courses', label: 'Courses' },
        { id: 'Tags', label: 'Tags' },
        { id: 'Majors', label: 'Majors' },
    ]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {},
    });

    const handleChangeIndex = (x) => {
        setIndex(x);
    };

    const onSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    // const onCourseChange = (x) => setCourseList(x);
    // const onTopicChange = (x) => setTopicList(x);
    // const onMajorChange = (x) => setMajorList(x);
    const onTutorChange = (x) => setTutor(x);

    return (
        <Wrapper id={id}>
            <UIForm formik={formik} style={{ width: '100%' }}>
                <TutorSearchWrapper>
                    {/* <UIAutoComplete id={`mentor-lookup-tutor`} name={`mentor-lookup-tutor`} label="" placeholder="search.." options={majorOptions} activity={searchState.major.loading} onSearch={(x) => dispatch(requestMajorQuery({ query: x }))} onChange={(x) => onTutorChange(x)} /> */}
                    <UITextField name="search" value={searchValue} onChange={onSearchValue} placeholder="Search.." />
                    <SearchIcon className={classes.search} />
                </TutorSearchWrapper>

                <UITabNav id="lookupTab" labels={tabLabels} onChange={handleChangeIndex}>
                    <UITabPanel id={id} hidden={index !== 0} index={index}>
                        <ContentWrapper>
                            {tagList && (
                                <TagListWrapper>
                                    {tagList.length > 0 &&
                                        tagList.map((x, i) => (
                                            <Tag key={`course-tag-${i}`}>
                                                {x.name}
                                                <UIBadge label={x.number.toString()} color="second"></UIBadge>
                                            </Tag>
                                        ))}
                                </TagListWrapper>
                            )}
                        </ContentWrapper>
                    </UITabPanel>
                    <UITabPanel id={id} hidden={index !== 1} index={index}>
                        <ContentWrapper>{tagList && <TagListWrapper>{tagList.length > 0 && tagList.map((x, i) => <Tag key={`course-tag-${i}`}>{x}</Tag>)}</TagListWrapper>}</ContentWrapper>
                    </UITabPanel>
                    <UITabPanel id={id} hidden={index !== 2} index={index}>
                        <ContentWrapper>{tagList && <TagListWrapper>{tagList.length > 0 && tagList.map((x, i) => <Tag key={`course-tag-${i}`}>{x}</Tag>)}</TagListWrapper>}</ContentWrapper>
                    </UITabPanel>
                </UITabNav>
            </UIForm>
        </Wrapper>
    );
};

MentorLookup.defaultProps = {};

export default MentorLookup;
