import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import MessagePack from 'what-the-pack';

const apiRoot = 'http://127.0.0.1:5000'
const commonHeaders = {
    accept: 'application/msgpack',
}
const { encode, decode } = MessagePack.initialize(2 ** 22);

const doFetch = async (url, fetchOptions) => {
    fetchOptions.headers = {...commonHeaders, ...fetchOptions.headers};
    const res = await fetch(url, fetchOptions);
    const buff = await res.arrayBuffer();
    return decode(MessagePack.Buffer(buff));
}

const fetchPulsars = async (fields, filters) => {
    const body = encode({ fields, filters });
    const fetchOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/msgpack',
        },
        body,
    };
    return await doFetch(`${apiRoot}/pulsars`, fetchOptions);
};

const fetchExtremes = async (extreme, fields) => {
    const url = queryString.stringifyUrl({
        url: `${apiRoot}/extremes/${extreme}`,
        query: {fields},
    });
    const fetchOptions = {
        method: 'GET',
    };
    return await doFetch(url, fetchOptions);
}

const useEndpoint = (func, params, defaultValue) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(defaultValue);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        (async () => {
            const res = await func(...params);
            if (!cancelled) {
                setData(res);
                setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [...params]);

    return [data, loading];
}

export const usePulsars = (fields, filters) => {
    return useEndpoint(fetchPulsars, [fields, filters], []);
};

export const useExtremes = (extreme, fields) => {
    return useEndpoint(fetchExtremes, [extreme, fields], {});
}
