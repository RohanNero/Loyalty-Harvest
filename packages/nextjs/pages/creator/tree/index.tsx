// "use client";
//import createLeaves from "../../../../backend/js/createLeaves";
import Link from "next/link";
import CreateMerkleForm from "~~/components/loyalty-harvest/CreateMerkleForm";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-green-200 to-secondary"></div>

      {/* Middle purple area */}
      <div className="w-3/5 bg-secondary">
        <div className="mt-[14vh] items-center justify-self-center flex flex-col w-full">
          <h1 className="font-mono justify-self-center p-10 text-2xl text-base-100 font-bold ">
            <button className="border rounded px-8 py-3 hover:-translate-y-2 hover:shadow-lg text-secondary bg-base-100">
              <Link href="/creator">Creator</Link>
            </button>
          </h1>
          <span className="font-mono px-10 text-base-100">
            Once you have created merkle leaves, you can use this form to construct your very own merkle tree! All you
            need to do is pass the leaves object!
          </span>
          <CreateMerkleForm />
        </div>
      </div>

      {/* Right green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-secondary to-green-200"></div>
    </div>
  );
}
