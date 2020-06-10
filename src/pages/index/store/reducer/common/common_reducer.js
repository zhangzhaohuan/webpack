
export const initState = {
  isCommon: false,
};

export const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case 'common_istrue':
      return { ...state, isCommon: true };
    default:
      return state;
  }
};
