
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from './useUser/useAccount';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setUser } from '@fe-monorepo/store';
import { UserModel } from '@fe-monorepo/models';

export const useUserProfile = () => {
    const [loading, setLoading] = useState(false);
    const User = useSelector((state: RootState) => state.user.userContext);
    const dispatch = useDispatch();
    const user = useMemo(() => {
        if (User.username) {
            return User;
        }
        return null
    }, [User.username]);
    const { getUserProfile } = useAccount();
    const setUserToken = (token: string) => {
        if (!User.token) {
            dispatch(
                setUser({token} as UserModel)
            );
        }
    }
    const getUser = async () => {
        setLoading(true);
        await getUserProfile();
        setLoading(false)
    }
    useEffect(() => {
        if (User.token && !User.username) {
            getUser();
        }
    }, [User.token]);

    return {
        user,
        loading,
        setUserToken
    }
}
