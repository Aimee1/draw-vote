import apis from "../../servers/result";
//state
const state =()=> {
    return{
         rankData: [],//列表数据
    }
};

const mutations = {
    SETRANK(state, payload) {
        state.rankData = payload;
    }
};

const actions = {
    //请求数据
    async getRank({ state, commit ,dispatch},params) {
        let res = await apis.getRank(params);
        if(res.error_code===0){
            commit("SETRANK",res);
        }
        return res;
    }
};

const getters = {

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
