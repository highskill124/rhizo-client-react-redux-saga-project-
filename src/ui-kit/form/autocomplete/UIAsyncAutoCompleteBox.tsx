/* eslint-disable no-unused-vars */
import React, { FC, useState } from 'react';
import { AccountBalance, LocalOffer, School } from '@material-ui/icons';
import { AutoCompleteService } from './AutoCompleteService';
import { NavUpcomingSessionIcon } from '../../icon/UIIconAssets';
import UIBox, { IUIBoxProps } from '../../core/UIBox';
import UIAutoComplete, { IUIAutocompleteProps } from './UIAutoComplete';

const SearchTargetMap = {
    INSTITUTION: 'Institution',
    COURSE: 'Course',
    TAG: 'Tag',
    MAJOR: 'Major',
    MAJOR_CODE: 'MajorCode',
    TUTOR: 'Tutor',
};

const searchTargetList = [
    { label: 'Institution', value: 'Institution', icon: AccountBalance, url: '' },
    { label: 'Major', value: 'Major', icon: NavUpcomingSessionIcon, url: '' },
    { label: 'Course', value: 'Course', icon: School, url: '' },
    { label: 'Tag', value: 'Tag', icon: LocalOffer, url: '' },
    { label: 'Tutor Name', value: 'Tutor', icon: AccountBalance, url: '' },
    { label: 'Major', value: 'MajorCode', icon: NavUpcomingSessionIcon, url: '' },
];

const autoCompleteService: AutoCompleteService = new AutoCompleteService();

interface IProps extends IUIAutocompleteProps {
    target?: number;
    params?: any;
    onChange?: (value, create?: boolean, item?: any) => void;
    boxProps?: IUIBoxProps;
}

const UIAsyncAutoCompleteBox: FC<IProps> = (props) => {
    const { id, params, target, onChange, boxProps, ...rest } = props;

    const [activity, setActivity] = useState(false);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState(null);
    const [searchTarget, setSearchTarget] = useState(searchTargetList[target]);

    const onMenuChange = (x) => {
        setSearchTarget(x);
    };

    const onTextChange = async (text) => {
        let result = null;
        setActivity(true);
        switch (searchTarget.value) {
            case SearchTargetMap.INSTITUTION:
                result = await autoCompleteService.searchInstitution({
                    search: text,
                });
                setActivity(false);
                setOptions(extractInstitution(result));
                break;

            case SearchTargetMap.MAJOR:
                result = await autoCompleteService.searchMajor({
                    // title: params.title,
                    title: '',
                    institution: params.institution,
                });
                setActivity(false);
                setOptions(extractMajor(result));
                break;

            case SearchTargetMap.MAJOR_CODE:
                result = await autoCompleteService.searchMajor({
                    // title: params.title,
                    title: '',
                    institution: params.institution,
                });
                setActivity(false);
                setOptions(extractMajorCode(result));
                break;

            case SearchTargetMap.COURSE:
                result = await autoCompleteService.searchCourse({
                    // subject: text,
                    // abbreviation: text,
                    // course_code: text,
                    subject: '',
                    abbreviation: '',
                    course_code: '',
                    institution: params.institution,
                });
                setActivity(false);
                setOptions(extractCourse(result));
                break;

            case SearchTargetMap.TAG:
                result = await autoCompleteService.searchTag({
                    search: text,
                    institution: params.institution,
                });
                setActivity(false);
                setOptions(extractData(result));
                break;

            case SearchTargetMap.TUTOR:
                result = await autoCompleteService.searchTutor({
                    search: text,
                });
                setActivity(false);
                setOptions(extractData(result));
                break;

            default:
                break;
        }
    };

    const extractInstitution = (d) => {
        if (d && d.results) {
            setData(d.results);
            return d.results.map((x) => ({ label: x.name, value: x.id }));
        }
        return [];
    };

    const extractMajor = (d) => {
        if (d && d.results) {
            setData(d.results);
            return d.results.map((x) => ({ label: x.title, value: x.id }));
        }
        return [];
    };

    const extractMajorCode = (d) => {
        if (d && d.results) {
            setData(d.results);
            return d.results.map((x) => ({ label: `${x.title} (${x.abbreviation})`, value: x.id }));
        }
        return [];
    };

    const extractCourse = (d) => {
        if (d && d.results) {
            setData(d.results);
            return d.results.map((x) => ({ label: `${x.abbreviation}`, value: x.id }));
        }
        return [];
    };

    const extractData = (d) => {
        if (d && d.results) {
            setData(d.results);
            return d.results.map((x) => ({ label: x.name, value: x.id }));
        }
        return [];
    };

    const handleChange = (value, create) => {
        console.log('=====================');
        console.log(data);

        if (data) {
            const item = data.find((x) => x.id === value);
            onChange(value, create, item);
        }
    };

    return (
        <UIBox id={`ui-async-box-${id}`} {...boxProps}>
            <UIAutoComplete
                // --
                id={id}
                {...rest}
                options={options}
                activity={activity}
                onSearch={(x) => onTextChange(x)}
                showCaret
                onChange={handleChange}
                // multiple
                // groupType="tag-box"
                // creatable
                // selection
            />
        </UIBox>
    );
};

UIAsyncAutoCompleteBox.defaultProps = {
    target: 0,
    params: {},
    onChange: () => {},
};

export default React.memo(UIAsyncAutoCompleteBox);
