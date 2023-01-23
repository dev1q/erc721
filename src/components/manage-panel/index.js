import React, { useEffect } from 'react';
import useWeb3 from '../../web3';
import { SimpleButton } from '../simple';
import Ipfs from 'ipfs'

const ManagePanel = () => {
  const { web3 } = useWeb3();
  useEffect(() => {
    const fetch = async () => {
      await web3.currentProvider.sendAsync();
      console.log(await window.ethereum.request({ method: 'eth_accounts' }));
    };
    fetch();
    window.ethereum.on('connected', fetch);
    window.ethereum.on('accountsChanged', fetch);
  }, []);
  return (
    <div>
      <SimpleButton>Hello</SimpleButton>
      <SimpleButton></SimpleButton>
      <SimpleButton></SimpleButton>
      <SimpleButton></SimpleButton>
    </div>
  );
};

export default ManagePanel;

 