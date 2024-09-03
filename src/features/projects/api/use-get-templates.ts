import { client } from "@/lib/hono";
import {useQuery} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<typeof client.api.projects.templates.$get>["query"]
export type ResponseType = InferResponseType<typeof client.api.projects.templates.$get,200>
export const useGetTemplates = (apiQuery: RequestType) => {
    const query = useQuery({
        queryKey: ["templates",{page: apiQuery.page,limit: apiQuery.limit}],
        queryFn: async () => {
            const response = await client.api.projects.templates.$get({
                query: apiQuery
            });
            if(!response.ok){
                throw new Error("获取模版失败！")
            }

            const {data} = await response.json()
            return data;
        },
    });
    return query
}