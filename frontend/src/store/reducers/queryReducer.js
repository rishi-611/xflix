import * as types from "../constants";

const initialState = {
    title: "",
    genres: "",
    contentRating: "",
    sortBy: ""
}

const queryReducer = (state=initialState, action)=>{
    const {type, payload} = action;

    switch(type){
        case types.UPDATE_QUERY_FILTERS:
            return {
                ...state,
                genres: payload.genres,
                contentRating: payload.contentRating,
                sortBy: payload.sortBy
            };
        case types.UPDATE_QUERY_SEARCH:
            return {
                ...state,
                title: payload.search
            }

        default:
            return state;
    }

}

export default queryReducer;