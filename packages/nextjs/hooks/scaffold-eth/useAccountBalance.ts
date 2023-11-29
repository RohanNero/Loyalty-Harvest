import { useCallback, useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export function useAccountBalance(address?: string) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  console.log("gettargetnetwork:", getTargetNetwork().id);

  const targetNetworkId = getTargetNetwork().id;

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
    refetch,
  } = useBalance({
    address,
    watch: true,
    chainId: targetNetworkId,
  });

  // console.log("getNetwork:", getTargetNetwork().id);
  // console.log("address:", address);
  // console.log("reereee:", refetch);
  // console.log("global fetchedBalance:", fetchedBalanceData);

  const onToggleBalance = useCallback(() => {
    if (price > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    console.log("fetchedBalance:", fetchedBalanceData);
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData]);

  // console.log("balance:", balance);
  // console.log("isLoading:", isLoading);

  return { balance, price, isError, isLoading, onToggleBalance, isEthBalance, refetch };
}
