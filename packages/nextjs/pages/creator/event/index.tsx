// "use client";
import Link from "next/link";
import CreateEventForm from "../../../components/loyalty-harvest/CreateEventForm";

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
            Finally, once you have constructed your merkle tree, you are ready to create the `Reward Event`! Don&apos;t
            be overwhelmed by the amount of input you&apos;ll need to provide, we will break them down step by step.{" "}
            <br /> First is the nft contract address that the `Reward Event` is for, which is the same address you
            inputted when creating your leaves. Second is the reward token address, this is the currency that the
            rewards will be paid out in, if you want to use a blockchain&apos;s native currency, then simply provide the
            0 address as input. Thirdly we have the total amount of reward token that will be sent along with the
            contract. Fourth is the address of the event&apos;s creator. Fifth is the merkle root from the tree you
            constructed. The next three are the same variables you used when creating your leaves, six and seven being
            block numbers and eight being the total nubmer of nfts. The ninth and final variable is the total number of
            blocks nfts were held for during your event, which is outputted to you when you created your leaves.
          </span>
          <CreateEventForm />
        </div>
      </div>

      {/* Right green gradient */}
      <div className="w-1/5 bg-gradient-to-r from-secondary to-green-200"></div>
    </div>
  );
}
