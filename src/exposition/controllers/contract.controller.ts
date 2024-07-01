import { BaseContract, ContractTransactionReceipt, ContractTransactionResponse, TransactionRequest } from "ethers";
import { Request } from "express";

import { callContractMethod, executeContractMethod, getContractMethod, getContractMethods } from "../../services/contracts.service";
import AppResult from "../../types/AppResult.type";
import Logger from "../../helpers/logger.helper";

let logger: Logger;

export async function callContractMethodController(req: Request): Promise<AppResult> {
  const contractName: string = req.params.contractName;
  const contractAddress: string = req.params.contractAddress;
  const methodName: string = req.params.method;
  const args: any[] = req.body.args || [];
  const options: TransactionRequest = req.body.options || {};

  const result = await callContractMethod(contractName, contractAddress, methodName, args, options);

  return {
    statusCode: 200,
    body: {
      message: 'Success',
      result
    }
  };
}

export async function executeContractMethodController(req: Request): Promise<AppResult> {
  const contractName: string = req.params.contractName;
  const contractAddress: string = req.params.contractAddress;
  const methodName: string = req.params.method;
  const args: any[] = req.body.args || [];
  const options: TransactionRequest = req.body.options || {};

  const result: ContractTransactionResponse | ContractTransactionReceipt | null = await executeContractMethod(contractName, contractAddress, methodName, args, options);

  return {
    statusCode: 201,
    body: {
      message: result instanceof ContractTransactionReceipt ? 'Transaction executed' : 'Transacion processed',
      result
    }
  }
}

export default function initContractController(_logger: Logger) {
  logger = _logger;
}