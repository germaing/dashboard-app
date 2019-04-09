import {
    REMOVE_EDIT_ITEM_FILTER,
    SET_EDIT_ITEM_FILTERS,
} from '../reducers/editItemFilters';

// actions

export const acRemoveEditItemFilter = id => ({
    type: REMOVE_EDIT_ITEM_FILTER,
    id,
});

export const acSetEditItemFilters = filters => ({
    type: SET_EDIT_ITEM_FILTERS,
    filters,
});
