import modifyState from '../modifyState';

interface AutoCompleteOpts {
    input: string;
    select: string;
}

interface ListData {
    page: number;
    total_page: number;
    total: number;
    per_page: number;
    data: any[];
}

export interface ISpace_station_list_reducer {
    autoCompleteOpts: AutoCompleteOpts;
    cities: any[];
    page: number;
    per_page: number;
    checkedList: any[];
    listData: ListData;
}

export const initState: ISpace_station_list_reducer = {
    autoCompleteOpts: {
        input: '',
        select: 'name'
    },
    cities: [],

    page: 1,
    per_page: 10,


    checkedList: [],
    listData: {
        //当前页
        "page": 1,
        //总页数
        "total_page": 1,
        //总条数
        "total": 0,
        //每页数量
        "per_page": 10,
        "data": [],
    }
};




export const space_station_list_reducer = (state = initState, action) => {
    switch (action.type) {
        case 'space_station_list':
            return modifyState(state, action);
        default:
            return state;
    }
};






