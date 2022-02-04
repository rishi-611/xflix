import * as types from "../constants";

export const updateSearch = (search)=>({
    type: types.UPDATE_QUERY_SEARCH,
    payload: {
        search
    }
})

export const updateFilters = (filters) =>({
    type: types.UPDATE_QUERY_FILTERS,
    payload: filters
})