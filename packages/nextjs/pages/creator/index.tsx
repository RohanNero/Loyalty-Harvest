// "use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-green-200 to-secondary"></div>

      {/* Middle purple area */}
      <div className="w-3/5 bg-secondary ">
        <div className="mt-[14vh] items-center justify-self-center flex flex-col w-full">
          <h1 className="font-mono justify-self-center p-10 text-2xl text-base-100 font-bold ">
            <button className="border rounded px-8 py-3 hover:-translate-y-2 hover:shadow-lg text-secondary bg-base-100">
              <Link href="/creator">Creator</Link>
            </button>
          </h1>
          <div className="w-3/4 mb-4">
            <span className="font-mono px-10 text-center text-base-100">
              Welcome to the Creator dashboard! <br />
              From here you can use the buttons below to create your own Reward Event. To get started you can can create
              an array of leaves for your desired NFT contract, then you can construct a merkle tree using the leaves.
              Once you have done these two things, you are ready to create the actual reward event!
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/creator/leaves">
              <div className="text-lg font-mono border rounded  bg-gradient-to-r from-green-200 to-[#6EE7B7] text-[#10B981] hover:to-green-200 hover:from-green-200 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Leaves
              </div>
            </Link>
            <Link href="/creator/tree">
              <div className="text-lg font-mono border rounded  bg-[#6EE7B7] text-[#10B981] hover:bg-green-200 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Merkle
              </div>
            </Link>
            <Link href="/creator/event">
              <div className="text-lg font-mono border rounded  bg-gradient-to-r from-[#6EE7B7] to-green-200 text-[#10B981] hover:to-green-200 hover:from-green-200 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Event
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-secondary to-green-200"></div>
    </div>
  );
}
