// "use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-green-200 to-[#6EE7B7]"></div>

      {/* Middle purple area */}
      <div className="w-3/5 bg-[#6EE7B7] ">
        <div className="mt-[14vh] items-center justify-self-center flex flex-col w-full">
          <h1 className="font-mono justify-self-center p-10 text-2xl text-[#10B981] font-bold ">
            <Link href="/organizer">Creator</Link>
          </h1>
          <div className="w-3/4">
            <span className="font-mono px-10 text-[#10B981]">
              Welcome to the Creator dashboard! From here you can use the buttons below to create your own Reward Event.
              To get started you can can create an array of leaves for your desired NFT contract, starting block number,
              and ending block number
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/creator/leaves">
              <div className="text-lg font-mono border-2 rounded border-purple-400 bg-gradient-to-r from-green-200 to-[#6EE7B7] text-purple-600 hover:to-purple-800 hover:from-green-600 hover:text-green-300 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Leaves
              </div>
            </Link>
            <Link href="/creator/tree">
              <div className="text-lg font-mono border-2 rounded border-purple-400 bg-[#6EE7B7] text-purple-600 hover:to-purple-800 hover:from-green-600 hover:text-green-300 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Merkle
              </div>
            </Link>
            <Link href="/creator/event">
              <div className="text-lg font-mono border-2 rounded border-purple-400 bg-gradient-to-r from-[#6EE7B7] to-green-200 text-purple-600 hover:to-purple-800 hover:from-green-600 hover:text-green-300 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Event
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-[#6EE7B7] to-green-200"></div>
    </div>
  );
}
