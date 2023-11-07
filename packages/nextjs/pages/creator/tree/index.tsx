// "use client";
//import createLeaves from "../../../../backend/js/createLeaves";
import Link from "next/link";
import CreateMerkleForm from "~~/components/loyaltyHarvest/CreateMerkleForm";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-green-200 to-purple-400"></div>

      {/* Middle purple area */}
      <div className="w-3/5 bg-purple-400">
        <div className="mt-[14vh] items-center justify-self-center flex flex-col w-full">
          <h1 className="font-mono justify-self-center p-10 text-2xl text-green-300 font-bold ">
            <Link href="/creator">Create Merkle Tree</Link>
          </h1>
          <span className="font-mono px-10 text-green-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in aliquet turpis. Duis vehicula eros eget
            purus ultricies vulputate. Nunc vitae malesuada odio, eleifend facilisis orci. Cras vehicula luctus diam,
            vitae elementum purus laoreet sit amet. Vestibulum ac lectus posuere neque tincidunt tincidunt. Curabitur
            suscipit erat est, eu placerat mi blandit ut.
          </span>
          <CreateMerkleForm />
        </div>
      </div>

      {/* Right green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-purple-400 to-green-200"></div>
    </div>
  );
}
