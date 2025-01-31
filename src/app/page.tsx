"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import GameCanvas from "@/components/GameCanvas";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const { isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { sendTransaction, data: hash } = useSendTransaction();
  const { open } = useWeb3Modal();
  const handleConnect = () => {
    open();
  };
  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Transaction Pending");
    }
    toast.dismiss();

    if (isConfirmed) {
      toast.success("Transaction Successful", {
        action: {
          label: "View on Etherscan",
          onClick: () => {
            window.open(`https://explorer-testnet.morphl2.io/tx/${hash}`);
          },
        },
      });
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirming, isConfirmed, error, hash]);

  return (
    <main>
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">The legend of Omnichain</h1>
        {/* <p className="text-2xl text-muted-foreground">
          Build your dapp frontends with the latest tools.
        </p> */}
      </section>
      <div className="flex gap-6 items-center justify-center">
        <div>
      {gameStarted ? (
        <GameCanvas />
      ) : (
        <button onClick={() => setGameStarted(true)}>Start Game</button>
      )}
      {/* <GameCanvas /> */}
    </div>
        

      </div>
    </main>
  );
}
