import express, { Express, Request, Response } from "express";

import { callContractMethodController, executeContractMethodController } from "../controllers/contract.controller";
import handleControllerCall from "../controllers";

import Logger from "../../helpers/logger.helper";
import Config from "../../types/Config.type";
import { apiKeyMiddleware } from "../middleware/apiKey.middleware";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiKeyMiddleware);

let logger: Logger;
let config: Config;

app.get("/:contractName/:contractAddress/:method", async (req: Request, res: Response) => {
  const contractName: string = req.params.contractName;
  const contractAddress: string = req.params.contractAddress;
  const methodName: string = req.params.method;
  const requestMade: string = `GET /${contractName}/${contractAddress}/${methodName}`;

  logger.info(requestMade);
  logger.debug(`${requestMade} ${JSON.stringify(req.headers)} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`);

  await handleControllerCall(req, res, logger, callContractMethodController);
});

app.post("/:contractName/:contractAddress/:method", async (req: Request, res: Response) => {
  const contractName: string = req.params.contractName;
  const contractAddress: string = req.params.contractAddress;
  const methodName: string = req.params.method;
  const requestMade: string = `POST /${contractName}/${contractAddress}/${methodName}`;

  logger.info(requestMade);
  logger.debug(`${requestMade} ${JSON.stringify(req.headers)} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`);

  await handleControllerCall(req, res, logger, executeContractMethodController);
});

/**
 * Initialize de application
 */
export default async function startApi(
  _config: Config,
  _loggger: Logger
) {
  logger = _loggger;
  config = _config;

  logger.info("STARTING API");
  const appPort = config.PORT || 3000;
  app.listen(appPort);
  logger.info(`Express server running on port ${appPort}...`);
}
