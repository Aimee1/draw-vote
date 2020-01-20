import { get } from "../http";

const  Rank = "/api/vote/getRanking";

const apis = {
    // 获取排名
    async getRank(params) {
        return get(Rank,params);
    },
};
export default apis;
