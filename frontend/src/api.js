import React, { useState, useEffect } from 'react';
import MessagePack from 'what-the-pack';

const apiRoot = 'http://127.0.0.1:5000'
const { encode, decode } = MessagePack.initialize(2 ** 22);

const fetchPulsars = async (fields, filters) => {
    const body = encode({ fields, filters });
    const fetchOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/msgpack',
            'accept': 'application/msgpack',
        },
        body,
    };
    const res = await fetch(`${apiRoot}/pulsars`, fetchOptions);
    const buff = await res.arrayBuffer();
    return decode(MessagePack.Buffer(buff));
};

export const usePulsars = (fields, filters) => {
    const [loading, setLoading] = useState(true);
    const [pulsars, setPulsars] = useState([]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        (async () => {
            const res = await fetchPulsars(fields, filters);
            if (!cancelled) {
                setPulsars(res);
                setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [fields, filters]);

    return [pulsars, loading];
};
