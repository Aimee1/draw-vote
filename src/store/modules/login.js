import apis from "../../servers/login";
//state
const state=()=>{
    return{
        name:'',
        uId :''
    }
};

const mutations = {
    SETUSERINFO(state, payload) {
        let { name,id } = payload;
        state.name = name;
        state.uId   = id;
        localStorage.setItem('uId',state.uId);
    }
};

const actions = {
    //请求数据
    async userLogin({state,commit,dispatch},params) {
        let res = await apis.login(params);
        if(res.error_code===0){
            commit("SETUSERINFO",res.response_data);
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
