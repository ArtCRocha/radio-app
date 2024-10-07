import axios from "axios";
import { StationProps, SearchStation } from "../types/station";
import api from "./api";

export async function getStations({name, limit}: SearchStation) {
    const { data } = await axios.get(`https://de1.api.radio-browser.info/json/stations/search?${name ? `name=${name}` : `limit=${limit || 10}`}`);
    return data;
}

export async function getStationsByUserId(userId: string, page: number) {
    const { data } = await api.get(`stations/user/${userId}${page ? `?page=${page}`: ""}`);
    return data;
}

export async function registerStation(reqData: StationProps) {
    const { data } = await api.post(`stations`, reqData);
    return data;
}