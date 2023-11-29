import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import * as chains from "wagmi/chains";
import * as chains from "viem/chains";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useNetworkColor, useOutsideClick } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { NETWORKS_EXTRA_DATA } from "~~/utils/scaffold-eth/networks";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  //const [selectedNetwork, setSelectedNetwork] = useState("");

  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const networkColor = useNetworkColor();

  // To allow your dapp to live on another chain, simply add its name to this array.
  // Entire list of chains: https://github.com/wevm/viem/blob/main/src/chains/index.ts
  const includedChains = ["mainnet", "sepolia", "polygon", "polygonMumbai"];

  function changeTargetNetwork(newNetwork: any): void {
    scaffoldConfig.targetNetwork = newNetwork;
  }

  useEffect(() => {
    if (chain == undefined) {
      return;
    }

    // Iterate through the chains
    Object.entries(chains).forEach(([chainKey, chainValue]) => {
      if (chain.id === chainValue.id) {
        console.log("chainKey:", chainKey);
        console.log("chainValue:", chainValue);
        console.log("key:", chainKey);

        const modifiedChainValue = {
          ...chainValue,
          testnet: false, // Replace with the correct value
        };
        console.log("modifedsifje chain value:", modifiedChainValue);
        //console.log("chains:", chains[chainKey]);

        // setSelectedNetwork(chainValue.name);
        //scaffoldConfig.targetNetwork = chains[chainKey as keyof typeof chains];
        changeTargetNetwork(chains[chainKey as keyof typeof chains]);
        console.log(`Switching chain to ${chainValue.name}...`);
      }
    });
  }, [chain]);

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Debug Contracts
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <select
          className="select select-sm sm:w-fit w-20 mr-2"
          style={{ borderWidth: 1, borderColor: networkColor }}
          onChange={event => {
            const [, id] = event.target.value.split("|");
            switchNetwork?.(+id);
          }}
        >
          <option disabled>Select network</option>
          {Object.entries(chains)
            .filter(([chainKey]) => includedChains.includes(chainKey))
            .map(([chainKey, chainValue]) => (
              <option
                key={chainKey}
                value={`${chainKey}|${chainValue.id}`}
                style={{ color: (NETWORKS_EXTRA_DATA[chainValue.id]?.color).toString() || "#bbbbbb" }}
                selected={chain?.id === chainValue.id}
              >
                {chainValue.name}
              </option>
            ))}
        </select>
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/// Secondary Header using custom `chainData` object as opposed to `chains` module ///
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// import React, { useCallback, useRef, useState } from "react";
// import { useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { createPublicClient, createWalletClient, custom } from "viem";
// // import * as chains from "wagmi/chains";
// import * as chains from "viem/chains";
// import { Chain, useNetwork, useSwitchNetwork } from "wagmi";
// import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
// import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
// import { useOutsideClick } from "~~/hooks/scaffold-eth";
// import scaffoldConfig from "~~/scaffold.config";

// const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
//   const router = useRouter();
//   const isActive = router.pathname === href;

//   return (
//     <Link
//       href={href}
//       passHref
//       className={`${
//         isActive ? "bg-secondary shadow-md" : ""
//       } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
//     >
//       {children}
//     </Link>
//   );
// };

// /**
//  * Site header
//  */

// export const Header = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const burgerMenuRef = useRef<HTMLDivElement>(null);
//   useOutsideClick(
//     burgerMenuRef,
//     useCallback(() => setIsDrawerOpen(false), []),
//   );

//   const [selectedNetwork, setSelectedNetwork] = useState("");

//   const { switchNetwork } = useSwitchNetwork();
//   const { chain } = useNetwork();

//   const includedChains = ["ethereumSepolia", "polygon", "polygonMumbai"];

//   function changeTargetNetwork(newNetwork: any): void {
//     console.log("newNetwork:", newNetwork);
//     scaffoldConfig.targetNetwork = newNetwork;
//   }

//   const viewChain = async () => {
//     const publicClient = createPublicClient({
//       transport: custom(window.ethereum),
//     });
//     const chainId = await publicClient.getChainId();
//     return chainId;
//   };
//   const switchChain = async (current: number) => {
//     console.log("Switching chain...");
//     const chain = await viewChain();
//     console.log("viewChain:", chain);
//     //if (current !== chain) {
//     console.log("chainId:", chain);
//     console.log("switching to:", current);
//     //await walletClient.switchChain({ id: current });
//     console.log("network switched?");
//     // console.log("SwitchChains:", switchChains);
//     // console.log("SwitchNetwork:", switchNetwork);
//     // if (chain == 137) scaffoldConfig.targetNetwork = "polygon";
//     //}
//   };
//   useEffect(() => {
//     for (const network of chains) {
//       console.log("network loop:", network);
//       if (chain == network.id) setSelectedNetwork(network.name);
//     }

//     console.log("current:", chain);
//     if (chain !== undefined && chain.id) switchChain(chain.id);
//   }, [chain]);

//   const navLinks = (
//     <>
//       <li>
//         <NavLink href="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink href="/debug">
//           <BugAntIcon className="h-4 w-4" />
//           Debug Contracts
//         </NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
//       <div className="navbar-start w-auto lg:w-1/2">
//         <div className="lg:hidden dropdown" ref={burgerMenuRef}>
//           <label
//             tabIndex={0}
//             className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
//             onClick={() => {
//               setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
//             }}
//           >
//             <Bars3Icon className="h-1/2" />
//           </label>
//           {isDrawerOpen && (
//             <ul
//               tabIndex={0}
//               className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
//               onClick={() => {
//                 setIsDrawerOpen(false);
//               }}
//             >
//               {navLinks}
//             </ul>
//           )}
//         </div>
//         <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
//           <div className="flex relative w-10 h-10">
//             <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
//           </div>
//           <div className="flex flex-col">
//             <span className="font-bold leading-tight">Scaffold-ETH</span>
//             <span className="text-xs">Ethereum dev stack</span>
//           </div>
//         </Link>
//         <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
//       </div>
//       <div className="navbar-end flex-grow mr-4">
//         <select
//           className="select select-sm sm:w-fit w-20 mr-2"
//           style={{ borderWidth: 1, borderColor: chain && (chain as any).color }}
//           onChange={event => {
//             console.log("event target value:", event.target.value);
//             const [name, id] = event.target.value.split("|");
//             console.log("name:", name);
//             console.log("chains:", chains);
//             console.log("chains poly:", chains.polygon);
//             switchNetwork?.(+id);
//             // For ultimate efficiency we will use `chains` object and not define a custom chain ourselves
//             // if (network.name === name) {
//             //   switchChain(network.id);
//             // }
//             // name === "Ethereum"
//             //   ? switchChain(1)
//             //   : name === "Polygon"
//             //   ? switchChain(137)
//             //   : name === "OP Mainnet"
//             //   ? changeTargetNetwork(chains["optimism"])
//             //   : changeTargetNetwork(chains[name.toLowerCase() as keyof typeof chains]);
//           }}
//         >
//           <option disabled>Select network</option>
//           {Object.entries(chains)
//             .filter(([chainKey]) => includedChains.includes(chainKey))
//             .map(([chainKey, chainValue]) => (
//               <option
//                 key={chainKey}
//                 value={`${chainKey}|${chainValue.id}`}
//                 // Add the color property if it exists in your module
//                 style={{ color: chainValue.color }}
//                 selected={selectedNetwork === chainKey}
//               >
//                 {chainValue.name}
//               </option>
//             ))}
//         </select>
//         <RainbowKitCustomConnectButton />
//         <FaucetButton />
//       </div>
//     </div>
//   );
// };
