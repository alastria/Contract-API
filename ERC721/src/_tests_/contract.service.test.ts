import { getContractMethods, callContractMethod, executeContractMethod, initContractsService } from '../services/contracts.service';
import { ethers } from 'ethers';
import Logger from '../helpers/logger.helper';
import ContractCollection from '../types/ContractCollection.type';
import Config from '../types/Config.type';

describe('contracts.service', () => {
  let logger: Logger;
  let contracts: ContractCollection;
  let config: Config;

  beforeAll(() => {
    logger = new Logger();
    contracts = {
      ERC721MintableAndBurnable: {
        abi: [
          'function mint() public returns (uint256)',
          'function mintTo(address to) public returns (uint256)',
          'function burn(uint256 tokenId) public',
          'function transfer(address to, uint256 tokenId) public'
        ],
        bytecode: '0x...' // Add the bytecode of the contract here
      }
    };
    config = {
      NETWORK: {
        WALLET_PRIV_KEY: 'your-private-key',
        URL: 'http://localhost:8545'
      }
    };
    initContractsService(logger, contracts, config);
  });

  test('getContractMethods should return contract methods', () => {
    const contractInterface = new ethers.utils.Interface(contracts.ERC721MintableAndBurnable.abi);
    const methods = getContractMethods(contractInterface);
    expect(methods).toContain('nonpayable uint256 mint()');
  });

  test('callContractMethod should call mint method', async () => {
    const result = await callContractMethod('ERC721MintableAndBurnable', 'contract-address', 'mint', [], {});
    expect(result).toBeDefined();
  });

  test('executeContractMethod should execute transfer method', async () => {
    const receipt = await executeContractMethod('ERC721MintableAndBurnable', 'contract-address', 'transfer', ['recipient-address', 1], {});
    expect(receipt).toBeDefined();
  });
});