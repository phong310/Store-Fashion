import useSWR from 'swr';
import axiosInstance from '../config/axiosInstance';

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export const useFetch = (url) => {
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
