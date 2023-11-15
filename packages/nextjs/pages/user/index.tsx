// "use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left green gradient */}
      <div className="w-1/5 bg-gradient-to-l from-green-300 to-secondary"></div>

      {/* Middle purple area */}
      <div className="w-3/5 bg-green-300">
        <div className="mt-[14vh] items-center justify-self-center flex flex-col w-full">
          <h1 className="font-mono justify-self-center p-10 text-2xl text-[#10B981] font-bold ">
            <button className="border rounded px-8 py-3 hover:-translate-y-2 hover:shadow-lg text-secondary bg-base-100">
              <Link href="/user">User</Link>
            </button>
          </h1>
          <div className="w-3/4">
            <p className="font-mono px-10 text-[#10B981]">
              Welcome to the user dashboard! <br /> From here, you can create a merkle proof for a specific Reward Event
              and optionally, a signature that will allow you to claim, and of course the actual claim function!
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/user/proof">
              <div className="text-lg font-mono border-2 rounded border-green-400 bg-green-200 hover:bg-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Proof
              </div>
            </Link>
            <Link href="/user/signature">
              <div className="text-lg font-mono border-2 rounded border-green-400 bg-green-200 hover:bg-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Signature
              </div>
            </Link>
            <Link href="/user/claim">
              <div className="text-lg font-mono border-2 rounded border-green-400 bg-green-200 hover:bg-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 p-1">
                Claim
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right green gradient */}
      <div className="w-1/5 bg-gradient-to-l from-secondary to-green-300"></div>
    </div>
  );
}
