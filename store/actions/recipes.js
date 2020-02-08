export const TOGGLE_FAV = 'TOGGLE_FAV';
export const SET_FILTERS = 'SET_FILTERS'

export const toggleFavAction = (id) => {
    return {
        type: TOGGLE_FAV,
        recId: id
    }
}

export const filterAction = filterSettings => {
    return {
        type: SET_FILTERS,
        filters: filterSettings
    }
}