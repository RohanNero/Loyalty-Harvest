//import Image from "next/image";
import Link from "next/link";

/*

   Main page of the frontend!
   Allows users to navigate to the `User` and `Creator` home pages!
   *Uncommented code was nav bar, likely being moved to `layout.tsx`*

*/
export default function Home() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-start bg-green-200 ">
    <div className="border flex flex-col rounded w-full text-center pt-10 bg-[#6EE7B7]">
      {/* <div className="pt-4 w-full font-mono text-lg text-center bg-gradient-to-b from-green-200 to-green-600 flex justify-between items-center border-b-2 border-green-800">
        <div className="border-2 border-green-500 rounded-xl hover:border-purple-600 bg-gradient-to-r from-green-300 to-purple-400 text-purple-600 from-30% hover:to-purple-800 hover:from-green-600 hover:text-green-300 hover:shadow-lg py-3 px-7 font-mono ml-64 rounded">
          Loyalty Harvest
        </div>
        <div className="pb-2 mr-64">
          <img src="icon.png" alt="Description of the image" />
        </div>
      </div> */}

      <h1 className="text-xl font-mono text-[#6EE7B7] bg-[#10B981] p-3 mb-10 border border-purple-700 rounded-lg mx-auto w-1/5">
        Which one are you?
      </h1>
      <div className="flex justify-center gap-[37%]">
        {/* <h3 className="border text-2xl w-3/12 rounded-full border-green-500 border-2 hover:border-purple-600 bg-gradient-to-r from-purple-400 to-purple-400 text-purple-600 from-30% hover:to-purple-800 hover:from-green-600 hover:text-green-300 hover:shadow-lg hover:-translate-y-1 py-3 px-7 font-mono">
            User
          </h3> */}
        <h3 className="text-2xl font-mono text-green-600">User</h3>
        <h3 className="text-2xl font-mono text-green-600">Creator</h3>
        {/* <h3 className="border text-2xl text-green-600 w-3/12 rounded-full border-green-500 border-2 hover:border-purple-600 bg-gradient-to-r from-purple-400 to-purple-400 text-purple-600 from-30% hover:to-purple-800 hover:from-green-600 hover:text-green-300 hover:shadow-lg hover:-translate-y-1 py-3 px-7 font-mono">
            Organizer
          </h3> */}
      </div>

      {/* User and Organizer components */}
      <div className="flex justify-evenly font-mono bg-[#6EE7B7] py-16 w-full h-[69vh]">
        {/* User component */}
        <Link className="w-1/3 " href="/user">
          {/* Gold coin 1 container */}
          <div className="relative flex items-center justify-center h-96 w-96 translate-x-20 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-8 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
            {/* Four Leaf Clover */}
            <div className="h-1/3 w-1/3 relative flex items-center justify-center">
              {/* Main Square */}
              <div className="absolute h-full w-full bg-green-700"></div>
              {/* Leaf 1 left */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
              {/* Leaf 1 right */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
              {/* Leaf 2 left */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
              {/* Leaf 2 right */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
              {/* Leaf 3 left */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
              {/* Leaf 3 right */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
              {/* Leaf 4 left */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
              {/* Leaf 4 right */}
              <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
              {/* Stem */}
              <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </Link>

        {/* Organizer component */}
        <Link className="w-1/3" href="/creator">
          {/* The pot */}
          <div className="relative w-96 h-96 translate-x-10 bg-gradient-to-br from-gray-800 from-40% via-gray-700 to:75% to-gray-900 rounded-full z-10 hover:-translate-y-2">
            {/* The gold coins */}
            {/* Gold coin 1 container */}
            <div className="relative flex items-center justify-center -top-6 left-[30%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* Gold coin 2 container */}
            <div className="relative flex items-center justify-center -top-16 left-[35%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* Gold coin 3 container */}
            <div className="relative flex items-center justify-center -top-28 left-[20%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* Gold coin 4 container */}
            <div className="relative flex items-center justify-center -top-40 left-[45%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* Gold coin 5 container */}
            <div className="relative flex items-center justify-center -top-52 left-[40%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* Gold coin 6 container */}
            <div className="relative flex items-center justify-center -top-64 left-[55%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* Gold coin 7 container */}
            <div className="relative flex items-center justify-center -top-72 -translate-y-3 left-[65%] h-12 w-12 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-300 shadow-lg rounded-full border-2 border-yellow-500 hover:-translate-y-5 hover:shadow-xl hover:from-yellow-200 hover:via-yellow-500 hover:from-15% hover:to-85% hover:to-yellow-200">
              {/* Four Leaf Clover */}
              <div className="h-1/3 w-1/3 relative flex items-center justify-center">
                {/* Main Square */}
                <div className="absolute h-full w-full bg-green-700"></div>
                {/* Leaf 1 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] top-0"></div>
                {/* Leaf 1 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -top-[25%]"></div>
                {/* Leaf 2 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] top-0"></div>
                {/* Leaf 2 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -top-[25%]"></div>
                {/* Leaf 3 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[25%] bottom-0"></div>
                {/* Leaf 3 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -left-[.1%] -bottom-[25%]"></div>
                {/* Leaf 4 left */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[25%] bottom-0"></div>
                {/* Leaf 4 right */}
                <div className="absolute h-1/2 w-1/2 rounded-full bg-green-700 -right-[.1%] -bottom-[25%]"></div>
                {/* Stem */}
                <div className="absolute h-2/3 w-1/12 rotate-6 bg-green-700 rounded-br-lg -bottom-1/2 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            {/* The top of the pot */}
            <div className="w-80 h-10 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-800 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            {/* Little shiny spot on the pot */}
            <div className="w-5 h-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300  rounded-full absolute top-28 right-3/4 transform translate-x-2/3"></div>
          </div>
        </Link>
      </div>
    </div>
    // </div>
  );
}

// -------------------------------------------------------------------------------------------------------- //
//              Everything below this line is the original scaffold-eth 2 index.tsx file                    //
// -------------------------------------------------------------------------------------------------------- //

// import Link from "next/link";
// import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";

// const Home: NextPage = () => {
//   return (
//     <>
//       <MetaHeader />
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center mb-8">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/pages/index.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>

//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contract
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
