import AppError from "./AppError.exception";

export default class ContractMethodNotFoundException extends AppError {
  constructor(contractName: string, methodName: string, contractAddress: string, contractMethods: string[]) {
    super(
      'ContractMethodNotFoundException', 
      `Contract '${contractName}' does not have a method '${methodName}'`,
      { contract: {
        name: contractName,
        address: contractAddress,
        methods: contractMethods
      } }, 
      400
    );
  }
}