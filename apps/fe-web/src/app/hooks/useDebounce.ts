import  { useEffect, useState } from 'react';

const useDebounce = (value: string = '',delay: number = 500) => {
    const [debounceVal, setDebounceVal] = useState<string>(value);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceVal(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debounceVal;
}
 
export default useDebounce;