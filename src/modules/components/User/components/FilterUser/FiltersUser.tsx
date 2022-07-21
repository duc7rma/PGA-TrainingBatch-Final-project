import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import './FiltersUser.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { ICountry, IFilters, IStates, IUserTypes } from 'models/user';
import { API_PATHS } from './../../../../../configs/api';
import { setFilterField } from '../../redux/userReducer';

function FiltersUser() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [userTypesMem, setUserTypesMem] = useState([]);
  const [userTypesPendMem, setUserTypesPendMem] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState<IStates[]>([]);
  const [isShow, setIsShow] = useState(false);
  const [isShowDate, setIsShowDate] = useState(false);
  const [filtersField, setFiltersField] = useState<IFilters>({
    address: '',
    count: 25,
    country: '',
    date_range: [],
    date_type: 'R',
    memberships: [],
    order_by: 'DESC',
    page: 1,
    phone: '',
    search: '',
    sort: 'last_login',
    state: '',
    status: [],
    types: [],
    tz: 7,
  });

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };

  const optionsMemberships = [
    { value: 'M_4', label: 'Memberships' },
    { value: 'P_4', label: 'Pending Memberships' },
  ];

  const getUserTypes = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.rolesList, 'post'));
    // console.log(json);
    setUserTypesMem(json.data.administrator);
    setUserTypesPendMem(json.data.customer);
  }, [dispatch]);

  const optionsUserTypes: IUserTypes[] = userTypesMem.map(
    (item: { name: string; id: string | number }): IUserTypes => ({
      value: item.id,
      label: item.name,
    }),
  );

  userTypesPendMem.forEach((item: { name: string; id: string | number }) => {
    optionsUserTypes.push({
      value: item.id,
      label: item.name,
    });
  });

  const handleGetElementFilter = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFiltersField({ ...filtersField, [name]: value });

    const getStates = async () => {
      const json = await dispatch(
        fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/state', 'post', {
          code: e.target.value,
        }),
      );
      console.log(json.data);
      setStates(json.data);
    };
    const listStates = getStates();
  };

  const handleGetMembership = (e: MultiValue<IUserTypes>) => {
    const value = e.map((item: IUserTypes) => item.value);
    setFiltersField({ ...filtersField, memberships: value });
  };

  const getCountries = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.countriesList, 'post'));
    setCountries(json.data);
  }, [dispatch]);

  useEffect(() => {
    getUserTypes();
    getCountries();
  }, []);

  const handleGetTypes = (e: MultiValue<IUserTypes>) => {
    const value = e.map((item: IUserTypes) => item.value);
    setFiltersField({ ...filtersField, types: value });
  };

  const handleSearching = async () => {
    dispatch(setFilterField(filtersField));
  };

  const handleSelect = (ranges: any) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  return (
    <>
      <h2>Search for users</h2>

      <form className="filters-user">
        <div className="body-filters">
          <ul className="list-filters">
            <li>
              <div className="search-keyword filter">
                <input
                  type="search"
                  placeholder="Search keyword"
                  name="search"
                  onChange={(e) => handleGetElementFilter(e)}
                ></input>
              </div>
            </li>

            <li>
              <div className="select-membership filter">
                <Select
                  name="memberships"
                  options={optionsMemberships}
                  onChange={(e) => handleGetMembership(e)}
                  placeholder={<div className="select-placeholder-text">All Memberships</div>}
                  isMulti
                ></Select>
              </div>
            </li>

            <li>
              <div className="select-user-type filter">
                <Select
                  name="types"
                  options={optionsUserTypes}
                  onChange={(e) => handleGetTypes(e)}
                  placeholder={<div className="select-placeholder-text">All User Types</div>}
                  isMulti
                ></Select>
              </div>
            </li>

            <li>
              <div className="select-status filter">
                <select name="status" onChange={(e) => handleGetElementFilter(e)}>
                  <option value="anyStatus">Any Status</option>
                  <option value="E">Enable</option>
                  <option value="D">Disable</option>
                  <option value="U">Unapproved Vendor</option>
                </select>
              </div>
            </li>

            <li>
              <button className="btn-search" onClick={() => handleSearching()}>
                <span>Search</span>
              </button>
            </li>
          </ul>

          {!isShow ? (
            <div className="btn-down">
              <button className="btn-down" onClick={() => setIsShow(!isShow)}>
                <FontAwesomeIcon icon={faAnglesDown} style={{ height: '15px', width: '15px' }} />
              </button>
            </div>
          ) : (
            <>
              <ul className="filter-bonus">
                <li className="information">
                  <ul className="list-info">
                    <li className="country ">
                      <label>Country</label>
                      <div>
                        <select name="country" onChange={(e) => handleGetElementFilter(e)}>
                          <option key={0} value="0">
                            Select country
                          </option>
                          {countries.map((country: ICountry, index: number) => (
                            <option key={index + 1} value={country.code} id={country.id}>
                              {country.country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                    <li className="state">
                      <label>State</label>
                      <div>
                        <select name="state">
                          {states.map((item: IStates, index: number) => (
                            <option key={index} value={item.state}>
                              {item.state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                    <li className="address">
                      <label>Address</label>
                      <div>
                        <input name="address" onChange={(e) => handleGetElementFilter(e)} />
                      </div>
                    </li>
                    <li className="phone">
                      <label>Phone</label>
                      <div>
                        <input name="phone" onChange={(e) => handleGetElementFilter(e)} />
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="user-activity">
                  <label>User activity</label>
                  <div>
                    <ul>
                      <li className="check-register">
                        <input
                          type="radio"
                          id="register-radio"
                          name="date_type"
                          value="R"
                          onChange={(e) => handleGetElementFilter(e)}
                        />
                        <label>Register</label>
                        <input
                          type="radio"
                          id="last-login-radio"
                          name="date_type"
                          value="L"
                          onChange={(e) => handleGetElementFilter(e)}
                        />
                        <label>Last logged in</label>
                      </li>
                    </ul>
                    <input
                      onChange={(e) => handleGetElementFilter(e)}
                      name="date_range"
                      className="date-range"
                      placeholder="Enter date range"
                      onClick={() => setIsShowDate(!isShowDate)}
                    />

                    {isShowDate && <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />}
                  </div>
                </li>
              </ul>

              <div className="btn-down">
                <button className="btn-down" onClick={() => setIsShow(!isShow)}>
                  <FontAwesomeIcon icon={faAnglesUp} style={{ height: '15px', width: '15px' }} />
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default FiltersUser;
