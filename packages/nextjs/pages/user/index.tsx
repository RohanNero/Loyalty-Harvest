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
            <Link href="/user">User</Link>
          </h1>
          <div className="w-3/4">
            <p className="font-mono px-10 text-[#10B981]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in aliquet turpis. Duis vehicula eros eget
              purus ultricies vulputate. Nunc vitae malesuada odio, eleifend facilisis orci. Cras vehicula luctus diam,
              vitae elementum purus laoreet sit amet. Vestibulum ac lectus posuere neque tincidunt tincidunt. Curabitur
              suscipit erat est, eu placerat mi blandit ut.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/user/proof">
              <div className="text-lg font-mono border-2 rounded border-green-400 bg-gradient-to-r from-secondary via-green-200 to-green-200 hover:from-secondary hover:to-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Proof
              </div>
            </Link>
            <Link href="/user/signature">
              <div className="text-lg font-mono border-2 rounded border-green-400 bg-gradient-to-r from-green-200 via-green-200 to-green-200 hover:from-secondary hover:to-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 p-1">
                Create Signature
              </div>
            </Link>
            <Link href="/user/claim">
              <div className="text-lg font-mono border-2 rounded border-green-400 bg-gradient-to-r from-green-200 via-green-200 to-secondary hover:from-secondary hover:to-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 p-1">
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
