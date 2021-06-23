import React, {useEffect, useState} from "react";
import './pagination.css'

function Pagination({items, onChangePage}) {

    const [pager, setPager] = useState({
        totalItems: 100,
        currentPage: 100,
        pageSize: 100,
        totalPages: 100,
        startPage: 100,
        endPage: 100,
        startIndex: 100,
        endIndex: 100,
        pages: []
    })

    useEffect(() => {
        setPage(1)
    }, [])

    const getPager = (totalItems, currentPage, pageSize, maxPagesToDisplay) => {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // default max pages to display is 10
        maxPagesToDisplay = maxPagesToDisplay || 10;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage = 0
        let endPage = 0
        if (totalPages <= maxPagesToDisplay) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages

            const halfwayPoint = Math.ceil(maxPagesToDisplay / 2);
            const pastHalfwayPoint = Math.floor(maxPagesToDisplay / 2) + 1;
            const beforeHalfwayPoint = halfwayPoint - 1;
            if (currentPage <= pastHalfwayPoint) {
                startPage = 1;
                endPage = maxPagesToDisplay;
            } else if (currentPage + beforeHalfwayPoint >= totalPages) {
                startPage = totalPages - (maxPagesToDisplay - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - halfwayPoint;
                endPage = currentPage + beforeHalfwayPoint;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    const setPage = (page) => {
        let filterPager = {...pager};

        if (page < 1 || page > filterPager.totalPages) {
            return;
        }

        // get new pager object for specified page
        filterPager = getPager(items.length, page, 10, 10);

        // get new page of items from items array
        const pageOfItems = items.slice(filterPager.startIndex, filterPager.endIndex + 1);

        // update state
        setPager(filterPager)


        // call change page function in parent component
        onChangePage(pageOfItems);
    }

    if (!pager.pages || pager.pages.length <= 1) {
        // don't display pager if there is only 1 page
        return null;
    }

    return (
        <ul className="pagination">
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => setPage(1)}>First</a>
            </li>
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
            </li>
            {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                    <a onClick={() => setPage(page)}>{page}</a>
                </li>
            )}
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <a onClick={() => setPage(pager.currentPage + 1)}>Next</a>
            </li>
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <a onClick={() => setPage(pager.totalPages)}>Last</a>
            </li>
        </ul>
    );
}

export default Pagination;
