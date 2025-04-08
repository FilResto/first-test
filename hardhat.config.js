require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const { PRIVATE_KEY, INFURA_API_KEY } = process.env;

module.exports = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
