import axios from "axios";
import { StationProps, SearchStation, StationEditProps } from "../types/station";
import api from "./api";

export async function getStations({name, limit}: SearchStation) {
    const { data } = await axios.get(`https://de1.api.radio-browser.info/json/stations/search?${name ? `name=${name}` : `limit=${limit || 10}`}`);
    return data;
}

export async function getStationsByUserId(userId: string, page: number) {
    const { data } = await api.get(`stations/user/${userId}${page ? `?page=${page}`: ""}`);
    return data;
}

export async function getStationsIds(userId: string) {
    const { data } = await api.get(`stations/stationIds/${userId}`);
    return data;
}

export async function registerStation(reqData: StationProps) {
    const { data } = await api.post(`stations`, reqData);
    return data;
}

export async function updateStation(stationId: string, reqData: StationEditProps) {
    const { data } = await api.patch(`stations/${stationId}`, reqData);
    return data;
}

export async function deleteStation(stationId: string) {
    const { data } = await api.delete(`stations/${stationId}`);
    return data;
}

