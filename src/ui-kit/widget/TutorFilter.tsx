import { useFormik } from 'formik';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/state/RootReducer';
import { requestMajorQuery, SearchState } from '../../store/state/SearchState';
import UISpacer from '../core/UISpacer';
import UIAutoComplete from '../form/UIAutoComplete';
import UICheckBox from '../form/UICheckBox';
import UIForm from '../form/UIForm';
import { UILabel } from '../form/UILabel';
import UISelectField from '../form/UISelectField';
import UIBox from '../layout/UIBox';
import { FontSize, FontWeight, LetterSpacing, LineHeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

const Wrapper = styled.div<Partial<IProps>>`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 25px;
    width: 320px;
    height: auto;
    flex: none;
    background: ${ThemeColor.white};
    border-radius: 15px;
    margin-top: 20px;
    margin-right: 20px;

    h4 {
        font-style: normal;
        font-weight: ${FontWeight.bold};
        font-size: ${FontSize.xxl};
        line-height: ${LineHeight.md};
        letter-spacing: ${LetterSpacing.md};
        color: ${ThemeColor.title};
        margin-bottom: 15px;
        margin: 0px;
    }
    @media (max-width: 1289px) {
        width: 100%;
    }
`;

interface IProps {
    className?: string;
    style?: any;
    id?: string;
    children?: ReactNode;
    header?: boolean;
}

const priceList = Array(19)
    .fill(10)
    .map((x, i) => ({ value: x + i * 5, label: `$${x + i * 5}/hr` }));

const TutorFilter: FC<IProps> = (props) => {
    const { id, header, style, className } = props;
    // const [majorList, setMajorList] = useState([]);
    // const [tutor, setTutor] = useState(null);
    const dispatch = useDispatch();
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const [majorOptions, setMajorOptions] = useState([]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {},
    });

    useEffect(() => {
        if (searchState.major.data && searchState.major.data.results) {
            const list = searchState.major.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setMajorOptions(list);
        }
    }, [searchState]);

    return (
        <Wrapper id={id} style={style} className={className}>
            <UIForm formik={formik}>
                {header && <h4>Filters</h4>}
                <UIAutoComplete creatable id={`tutor-filter-course`} name={`tutor-filter-course`} label="Courses" placeholder="search.." multiple groupType="tag-inside" options={majorOptions} activity={searchState.major.loading} onSearch={(x) => dispatch(requestMajorQuery({ query: x }))} onChange={(x) => {}} />
                <UIAutoComplete creatable id={`tutor-filter-course-tag`} name={`tutor-filter-course-tag`} label="Course Tag" placeholder="search.." multiple groupType="tag-inside" options={majorOptions} activity={searchState.major.loading} onSearch={(x) => dispatch(requestMajorQuery({ query: x }))} onChange={(x) => {}} />
                <UILabel>Meeting Location</UILabel>
                <UICheckBox id="virtual" name="virtual" label="Virtual" checked />
                <UISpacer height={5}></UISpacer>
                <UICheckBox id="inPerson" name="inPerson" label="In-person" checked />
                <UISpacer height={10} />
                <UILabel>Course Status</UILabel>
                <UICheckBox id="rhizoVerified" name="rhizoVerified" label="Rhizo Verified" checked />
                <UISpacer height={10} />

                <UILabel>Filter by price</UILabel>
                <UIBox>
                    <UISelectField id="min" name="min" label="" placeholder="Min" options={priceList}></UISelectField>
                    <UISpacer width={10} />
                    <UISelectField id="max" name="max" label="" placeholder="Max" options={priceList}></UISelectField>
                </UIBox>
            </UIForm>
        </Wrapper>
    );
};

TutorFilter.defaultProps = {
    header: true,
};

export default TutorFilter;
