const setSearchDropdownData = (data) => {
    return {
        type: "SET_SEARCH_DROPDOWN_DATA",
        payload: data,
    }
}

const clearSearchDropdownData = (dropdownType) => {
    return {
        type: "CLEAR_SEARCH_DROPDOWN_DATA",
        payload: dropdownType,
    }
}

const setSearchFilterBarData = (data) => {
    return {
        type: "SET_SEARCH_FILTER_BAR_DATA",
        payload: data,
    }
}

const clearSearchFilterBarData = (dropdownType) => {
    return {
        type: "CLEAR_SEARCH_FILTER_BAR_DATA",
        payload: dropdownType,
    }
}

const clearAllSearchFilterBarData = () => {
    return {
        type: "CLEAR_ALL_SEARCH_FILTER_BAR_DATA",
    }
}

export default {
    setSearchDropdownData,
    clearSearchDropdownData,
    setSearchFilterBarData,
    clearSearchFilterBarData,
    clearAllSearchFilterBarData,
}