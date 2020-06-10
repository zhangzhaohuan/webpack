
export const initState = {
    isCommon:false,
};

export const common_reducer = (state = initState, action) => {
    switch (action.type) {
        case 'common_istrue':
            return Object.assign({}, state, { isCommon: true });
        default:
            return state;
    }
};






