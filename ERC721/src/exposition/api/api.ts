import express, { Express, Request, Response } from "express";

import { callContractMethodController, executeContractMethodController, getTokensOfWallet } from "../controllers/contract.controller";
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

/**
 * Initialize de application
 */
export default async function startApi(
  _config: Config,
  _loggger: Logger
) {
  logger = _loggger;
  config = _config;

  setupApi();

  logger.info("STARTING API");
  const appPort = config.PORT || 3000;
  app.listen(appPort);
  logger.info(`Express server running on port ${appPort}...`);
}

function setupApi() {
  app.get(`${config.CONTRACT.ADDRESS ? "" : "/:address"}/tokens/:walletAddress`, async (req: Request, res: Response) => {
    const contractAddress: string = req.params.address;
    const walletAddress: string = req.params.walletAddress;
    const requestMade: string = `GET ${config.CONTRACT.ADDRESS ? "" : `/${contractAddress}`}/tokens/${walletAddress}`;

    logger.info(requestMade);
    logger.debug(`${requestMade} ${JSON.stringify(req.headers)} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`);

    await handleControllerCall(req, res, logger, getTokensOfWallet);
  });

  app.get(`${config.CONTRACT.ADDRESS ? "" : "/:address"}/:method`, async (req: Request, res: Response) => {
    const contractAddress: string = req.params.address;
    const methodName: string = req.params.method;
    const requestMade: string = `GET ${config.CONTRACT.ADDRESS ? "" : `/${contractAddress}`}/${methodName}`;

    logger.info(requestMade);
    logger.debug(`${requestMade} ${JSON.stringify(req.headers)} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`);

    await handleControllerCall(req, res, logger, callContractMethodController);
  });

  app.post(`${config.CONTRACT.ADDRESS ? "" : "/:address"}/:method`, async (req: Request, res: Response) => {
    const contractAddress: string = req.params.address;
    const methodName: string = req.params.method;
    const requestMade: string = `POST ${config.CONTRACT.ADDRESS ? "" : `/${contractAddress}`}/${methodName}`;

    logger.info(requestMade);
    logger.debug(`${requestMade} ${JSON.stringify(req.headers)} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`);

    await handleControllerCall(req, res, logger, executeContractMethodController);
  });
}