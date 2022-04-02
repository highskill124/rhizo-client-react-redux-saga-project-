import React, { useState } from 'react';

const usePagination = (data: any, itemsPerPage: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    const currentData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    };

    const next = () => {
        setCurrentPage((currentPages) => Math.min(currentPages + 1, maxPage));
    };

    const prev = () => {
        setCurrentPage((currentPages) => Math.max(currentPages - 1, 1));
    };

    const jump = (page: any) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPages) => Math.min(pageNumber, maxPage));
    };

    return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
