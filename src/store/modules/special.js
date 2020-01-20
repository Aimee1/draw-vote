import apis from "../../servers/special";
//state
const state =()=> {
    return{
         userData: [],//列表数据
    }
};

const mutations = {
    SETALLUSERS(state, payload) {
        state.userData = payload;
    }
};

const actions = {
    //请求数据
    async getAllActor({ state, commit ,dispatch},params) {
        let res = await apis.getAllUsers(params);
        if(res.error_code===0){
            commit("SETALLUSERS",res.response_data);
        }
    },
    async vote({ state, commit ,dispatch},params) {
        return await apis.vote(params);
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
