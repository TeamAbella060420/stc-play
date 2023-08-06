import { useMediaQuery } from 'react-responsive';

const useMobileDetect = ()=> {
    const isMobile = useMediaQuery({ query: `(max-width: 991px)` });
    return isMobile;
}

export default useMobileDetect;