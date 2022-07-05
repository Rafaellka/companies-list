import {createApi, BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
const token = 'b613f8aa2e02e283591f34535a1c5b34451b7e02';

export const dadataApi = createApi({
    reducerPath: 'dadata',
    baseQuery: fetchBaseQuery({
        baseUrl: url
    }),
    endpoints: (build) => ({
        getInfoByINN: build.mutation<any, string>({
            query: (INN: string) => ({
                url: '',
                headers: {
                    "Content-type": 'application/json',
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                method: 'POST',
                body: JSON.stringify({
                    query: INN,
                    branch_type: "MAIN"
                })
            })
        })
    })
});

export const {useGetInfoByINNMutation} = dadataApi;