import axios, { AxiosResponse } from "axios";
import { todoAppApiEndpointBaseUrl } from "../constants/EnvironmentConstants";
import { IItem } from "../models/IItem";
import { IItemRequest } from "../models/IItemRequest";

export const GetAllTodoItems = async () : Promise<AxiosResponse> => {
    try {
        var response = await axios.get<IItem[]>(`${todoAppApiEndpointBaseUrl}/todoItems`);
        return response;
    }
    catch(error: any) {
        return error.response.data;
    }
}

export const PostTodoItem = async (item: IItemRequest) : Promise<AxiosResponse> => {
    try {
        var response = await axios.post(`${todoAppApiEndpointBaseUrl}/todoItems`, item);
        return response;
    }
    catch(error: any) {
        return error.response.data;
    }
}

export const UpdateTodoItem = async (item: IItem) : Promise<AxiosResponse> => {
    try {
        var response = await axios.put(`${todoAppApiEndpointBaseUrl}/todoItems/${item.id}`, item);
        return response;
    }
    catch(error: any) {
        return error.response.data;
    }
}