import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ListUsers from 'modules/components/User/components/ListUsers/ListUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import './Pagination.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from 'modules/common/redux/thunk';
import { setCountPerPage, setListUsers, setPage } from 'modules/components/User/redux/userReducer';
import { API_PATHS } from './../../../../configs/api';

function PaginatedItems() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [pageCount, setPageCount] = useState(1);
  const [userPerPage, setUserPerPage] = useState(25);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageClick = async (event: any) => {
    dispatch(setPage(event.selected + 1));
  };

  const handleSelectUsersPerPage = (userPerPage: number) => {
    setUserPerPage(userPerPage);
    dispatch(setCountPerPage(userPerPage));
  };

  const { filtersFieldRedux } = useSelector((state: AppState) => ({
    filtersFieldRedux: state.user.filters,
  }));

  const getUsersListFirst = async () => {
    const json = await dispatch(fetchThunk(API_PATHS.usersList, 'post', filtersFieldRedux));
    console.log(json.data);
    setTotalItems(json.recordsTotal);
    setPageCount(Math.ceil(json.recordsTotal / userPerPage));
    dispatch(setListUsers(json.data));
  };

  useEffect(() => {
    getUsersListFirst();
  }, [filtersFieldRedux]);

  const { listUsersPerPage } = useSelector((state: AppState) => ({
    listUsersPerPage: state.user.listUsers,
  }));

  return (
    <>
      <ListUsers currentItems={listUsersPerPage} />
      <div className="pagination-container">
        <ReactPaginate
          nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />

        <div className="pagination">
          <p className="total-items">{totalItems}</p>
          <p>items</p>
          <select onChange={(event: any) => handleSelectUsersPerPage(event.target.value)}>
            <option value="10">10</option>
            <option selected value="25">
              25
            </option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <p>per page</p>
        </div>
      </div>
    </>
  );
}

export default PaginatedItems;
