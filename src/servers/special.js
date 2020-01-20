import { get,post } from "../http";

const GetUserAll = "/api/vote/getUserAll ";
const Vote       = "/api/vote/vote";

const apis = {
    // 获取用户信息
    async getAllUsers(params) {
        return get(GetUserAll,params);
    },
    //投票
    // 获取用户信息
    async vote(params) {
        return post(Vote,params);
    }
};
export default apis;
