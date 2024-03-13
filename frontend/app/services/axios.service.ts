import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { BASE_URL } from "@/utils/constants";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

instance.interceptors.response.use((res: AxiosResponse) => res.data);

const { get, post, put } = instance;

export const getCall = async (
    url: string,
    headers: RawAxiosRequestHeaders = {}
) => get(url, { headers });

export const postCall = async (
    url: string,
    data: any,
    headers: RawAxiosRequestHeaders = {}
) => post(url, data, { headers });

export const putCall = async (
    url: string,
    data: object,
    headers: RawAxiosRequestHeaders = {}
) => put(url, data, { headers });
