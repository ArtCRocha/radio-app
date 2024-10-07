export interface SearchStation {
    name?: string;
    limit?: number
}

export interface StationProps {
    name: string;
    changeuuid: string;
    serveruuid: string;
    stationuuid: string;
    url: string;
    urlResolved: string;
    homePage: string;
    favicon: string;
    country: string;
    state: string;
    countryCode: string;
    language: string;
    codec: string;
    userId: string | undefined
}

export interface StationWithId extends StationProps{
    id: string;
}

export interface StationListProps {
    page: number;
    totalItemsCount: number;
    totalPages: number;
    results: StationWithId[];
    hasNextPage: boolean;
    hasPreviousPage: boolean
}

export interface StationEditProps {
    name: string;
    country: string;
    state: string;
    countryCode: string;
    language: string;
}