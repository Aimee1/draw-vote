import { post,get } from '../http';

const ApiUrl = {
      GetMenu :'/api/vote/getTypeAll',
      Vote    :'/api/vote/vote'
};

const apis = {
    async getMenu(params){
        return get(ApiUrl.GetMenu,params);
    },
    vote(params){
        return post(ApiUrl.Vote,params);
    }
};

export default apis;