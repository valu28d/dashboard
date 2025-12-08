import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

type FetchDataReturn = {
    data: OpenMeteoResponse | undefined;
    loading: boolean;
    error: Error | undefined;
}

export default function useFetchData() : FetchDataReturn {

    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(URL);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        })();
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}