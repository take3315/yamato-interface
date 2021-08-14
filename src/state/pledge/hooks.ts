import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveWeb3React } from '../../hooks/web3';
import { AppDispatch, AppState } from '../index';
import {
  depositCollateral,
  fetchingMyPledge,
  withdrawCollateral,
} from './actions';
import { PledgeDetail } from './reducer';

export function usePledgeData(): PledgeDetail {
  const { account } = useActiveWeb3React();
  return useSelector(
    (state: AppState) =>
      state.pledge[account ?? ''] ?? {
        collateral: 0,
        debt: 0,
        withdrawalLockDate: 0,
      }
  );
}

export function useFetchingMyPledge(): (
  collateral: number,
  debt: number,
  withdrawalLockDate: number
) => void {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (collateral: number, debt: number, withdrawalLockDate: number) =>
      dispatch(
        fetchingMyPledge({
          owner: account ?? '',
          collateral,
          debt,
          withdrawalLockDate,
        })
      ),
    [dispatch, account]
  );
}
export function useDepositCollateral(): (collateral: number) => void {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (collateral: number) =>
      dispatch(depositCollateral({ owner: account ?? '', collateral })),
    [dispatch, account]
  );
}
export function useWithdrawCollateral(): (collateral: number) => void {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (collateral: number) =>
      dispatch(withdrawCollateral({ owner: account ?? '', collateral })),
    [dispatch, account]
  );
}
