import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Page from '../common/Page';
import { RootState } from '../../store/state/RootReducer';
import { SearchState } from '../../store/state/SearchState';
import { ProfileState } from '../../store/state/ProfileState';
import UIModal from '../../ui-kit/core/UIModal';
import { ThemeColor } from '../../settings/ThemeColor';
import StudentScheduler from '../../ui-kit/widget/StudentScheduler';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${ThemeColor.contentBg};
    flex: none;
    flex-grow: 0;
    align-self: stretch;
    margin: 0px 0px 0px 0px;
    padding: 0px;
    height: 100%;
`;

const PlayGroundPage = () => {
    const searchState = useSelector<RootState, SearchState>((state) => state.searchState);
    const [, setMajorOptions] = useState([]);
    const [, setInstitutionOptions] = useState([]);
    const [, setTagOptions] = useState([]);

    const [, setUser] = useState(null);
    const profile = useSelector<RootState, ProfileState>((state) => state.profileState);

    useEffect(() => {
        if (searchState.major.data && searchState.major.data.results) {
            const list = searchState.major.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setMajorOptions(list);
        }
        if (searchState.institution.data && searchState.institution.data.results) {
            const list = searchState.institution.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setInstitutionOptions(list);
        }
        if (searchState.tag.data && searchState.tag.data.results) {
            const list = searchState.tag.data.results.map((x) => ({ label: x.name, value: x.alias }));
            setTagOptions(list);
        }
    }, [searchState]);

    useEffect(() => {
        if (profile && profile.user && profile.user.data) {
            setUser(profile.user.data);
        }
    }, [profile]);

    const [open, setOpen] = React.useState(false);
    const [openStudentScheduler, setOpenStudentScheduler] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Page name="playground">
            <UIModal id="deleteConfirm" onClose={handleClose} open={open} title="Delete Course?" desc="Are you sure you want to delete this course? It will no longer appear on search results for this course" subButtonLabel="Cancel" mainButtonLabel="Confirm" />
            <Wrapper>
                <button type="button" onClick={() => setOpenStudentScheduler(true)}>
                    Show Student Scheduler
                </button>
                <StudentScheduler open={openStudentScheduler} onClose={() => setOpenStudentScheduler(false)} />
            </Wrapper>
        </Page>
    );
};

export default PlayGroundPage;
