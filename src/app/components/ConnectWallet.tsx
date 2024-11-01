"use client";

import React, { useState } from 'react';
import { addressFromPublicKey, NodeProvider, web3 } from '@alephium/web3';
import { useWallet } from '@alephium/web3-react'; 
import { useConnect } from '@alephium/web3-react';


const ConnectWallet: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const wallet = useWallet();
  const { connect } = useConnect();

  const connectWallet = async () => {
    try {
      await connect();
      const nodeProvider = new NodeProvider('http://localhost:22973');
      web3.setCurrentNodeProvider(nodeProvider);
      if (Array.isArray(wallet.account)) {
        const accounts = wallet.account;
        if (accounts.length > 0) {
          setAccount(addressFromPublicKey(accounts[0].publicKey));
          setIsConnected(true);
          console.log('Wallet connected successfully:', accounts[0].publicKey);
        } else {
          console.log('No accounts found.');
        }
      } else {
        console.log('No accounts found.');
      }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }

  return (
    <button
      onClick={connectWallet}
      className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-700 lg:inline-flex hover:from-blue-600 hover:to-blue-800 rounded-full"
      role="button"
    >
      {isConnected ? `Connected: ${account?.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWallet;