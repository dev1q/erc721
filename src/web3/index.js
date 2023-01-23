import Web3 from 'web3';
const web3 = new Web3(window?.ethereum);

const useWeb3 = () => {
  return { web3 };
};

export default useWeb3;
