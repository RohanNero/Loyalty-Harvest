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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in aliquet turpis. Duis vehicula eros eget
              purus ultricies vulputate. Nunc vitae malesuada odio, eleifend facilisis orci. Cras vehicula luctus diam,
              vitae elementum purus laoreet sit amet. Vestibulum ac lectus posuere neque tincidunt tincidunt. Curabitur
              suscipit erat est, eu placerat mi blandit ut.
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
