import apis from "../../servers/selection";
const state =()=> {
    return{
        selectType:[],
        selectMenu:[]
    }
};

const mutations = {
    SETMENU(state,payload){
        state.selectType = payload.type;
        state.selectMenu = payload.program;
    }
};

const actions = {
    //请求数据
    async getAllMenus({state,commit,dispatch},params){
        let res = await apis.getMenu(params);
        if(res.error_code===0){
            commit('SETMENU',res);
        }
        return res;
    },
    async vote({state,commit,dispatch},params){
        return await apis.vote(params);
    }
};

const  getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}