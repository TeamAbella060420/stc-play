import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { useUserProfile } from '@fe-monorepo/hooks';
import { AppRoutes } from '../app.routes.enum';

const CallbackPage = () => {
    const { setUserToken } = useUserProfile();
    const navigate = useNavigate();
    const parsedQueryString = queryString.parse(window.location.search, {parseBooleans: true, parseNumbers: true});
    useEffect(() => {
        console.log(parsedQueryString, 'parsedQueryString');
        if (!isEmpty(parsedQueryString) && parsedQueryString?.token) {
            setUserToken(parsedQueryString?.token as string);
            navigate(`${AppRoutes.home}?${queryString.stringify(parsedQueryString)}`);
        } else {
            navigate(`${AppRoutes.authSignUp}?${queryString.stringify(parsedQueryString)}`);
        }
    }, [parsedQueryString]);
    return null;
}

export default CallbackPage;
