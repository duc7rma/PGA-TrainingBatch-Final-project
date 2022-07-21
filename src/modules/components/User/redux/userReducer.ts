import { IFilters, IUserList, userRemove } from 'models/user';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export const setListUsers = createCustomAction('user/set/list', (data: IUserList[]) => ({
    data,
}));

export const setCountPerPage = createCustomAction('user/set/count', (data: string | number) => ({
    data,
}));

export const setPage = createCustomAction('user/set/page', (data: string | number) => ({
    data,
}));

export const setFilterField = createCustomAction('user/set/filters', (data: IFilters) => ({
    data,
}));

export const deleteUserIds = createCustomAction('user/list/deleteIDs', (data: string) => ({
    data,
}));

export const clearUserIds = createCustomAction('user/list/clear', (data: []) => ({
    data,
}));

export const deleteId = createCustomAction('user/list/delete/userID', (data: string) => ({
    data,
}));

export interface UserState {
    listUsers: IUserList[],
    filters : IFilters,
    deleteIDs : {
        param: userRemove[]
    }
    
}

const actions = {deleteUserIds, setListUsers, setFilterField, setCountPerPage, setPage, clearUserIds, deleteId};
  
type ActionLocal = ActionType<typeof actions>;

export default function userReducer (
    state: UserState = {
        listUsers: [],
        filters: {
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
          },
        deleteIDs: {
            param: []
        }
    }, action : ActionLocal) {
        switch (action.type) {
            case getType(setListUsers): {
                const listUsers = action.data
                return {
                    ...state,
                    listUsers: listUsers
                }
            }

            case getType(setFilterField): {
                const filters = action.data
                return {
                    ...state,
                    filters: filters
                }
            }

            case getType(deleteUserIds): {
                const listIDs: userRemove[] = state.deleteIDs.param
                const IDs = listIDs.map((item: userRemove) => item.id)
                const isIncludes = IDs.includes(action.data)
                !isIncludes && listIDs.push({id: action.data, delete: 1})

                return {
                    ...state,
                    deleteIDs: {
                        param: listIDs
                    }
                }
            }

            case getType(setCountPerPage): {
                const countPerPage = action.data

                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        count: countPerPage
                    }
                }
            }

            case getType(setPage): {
                const page = action.data

                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        page: page
                    }
                }
            }

            case getType(clearUserIds): {
                const newList = action.data

                return {
                    ...state,
                    deleteIDs: newList
                }
            }

            case getType(deleteId): {
                const listIDs: userRemove[] = state.deleteIDs.param
                const IDs = listIDs.map((item: userRemove) => item.id)
                const index = IDs.indexOf(action.data) 
                const filtered = listIDs.filter(function(value){ 
                    return value !== listIDs[index];
                })
                return {
                    ...state,
                    deleteIDs: {
                        param: filtered
                    }
                }
            }

            default:{
                return state // We return the default state here
             }
    }
}