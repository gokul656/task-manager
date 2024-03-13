import { ADD_TASK, BASE_URL, GET_ALL_TASKS, SIGN_IN, SIGN_UP } from "@/utils/constants"
import { getCall, postCall, putCall } from "./axios.service"
import axios from "axios"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

export const signIn = async (user: User) => {
    const URL = `${BASE_URL}${SIGN_IN}`
    const response = await postCall(URL, user, {})

    setCookie("token",  response?.data?.token)
    return response
}

export const signUp = async (user: User) => {
    const URL = `${BASE_URL}${SIGN_UP}`
    const response = await postCall(URL, user, {})

    setCookie("token", response?.data?.token)
    return response
}

export const getAllTasks = async () => {
    const URL = `${BASE_URL}${GET_ALL_TASKS}`
    const response = await getCall(URL, {
        Authorization: getToken()
    })

    return response
}

export const logout = (): void => {
    deleteCookie("token")
}

export const updateTask = async (task: Task) => {
    const URL = `${BASE_URL}${ADD_TASK}`
    const response = await putCall(URL, task, {
        Authorization: getToken()
    })

    return response;
}

export const addTask = async (task: Task) => {
    const URL = `${BASE_URL}${ADD_TASK}`
    const response = await postCall(URL, task, {
        Authorization: getToken()
    })

    return response;
}

export const deleteTask = async (taskId: string) => {
    const URL = `${BASE_URL}${ADD_TASK}${taskId}`
    const response = await axios.delete(URL, {
        headers: {
            Authorization: getToken()
        }
    })

    return response;
}


const getToken = () => {
    return `Bearer ${getCookie("token")}`
}