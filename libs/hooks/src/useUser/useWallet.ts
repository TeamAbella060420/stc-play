/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { USER_QUERY } from '@fe-monorepo/data-access';
import { setWalletList, setWallet, useAppDispatch } from '@fe-monorepo/store';

export const useWallet = () => {
  const dispatch = useAppDispatch();

  const [getWallet, { data: walletResponse, error: walletError }] = useLazyQuery(USER_QUERY.getWallet, {
    errorPolicy: 'all'
  });

  const getUserWallet = async () => {
    return await getWallet();
  };

  useEffect(() => {
    if (walletResponse) {
      const { data } = walletResponse.getWallet;
      if (data.list) {
        dispatch(setWalletList(data));
        dispatch(setWallet(data));
      }
    }
  }, [walletResponse]);

  useEffect(() => {}, [walletError]);

  return { getUserWallet };
};
