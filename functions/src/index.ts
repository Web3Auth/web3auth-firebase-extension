import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { NodeDetailManager } from "@toruslabs/fetch-node-details";
import Torus, { TorusCtorOptions, TorusPublicKey } from "@toruslabs/torus.js";
import type { TORUS_NETWORK_TYPE } from "@toruslabs/constants";
import { Database } from "firebase-admin/database";

const {
  WEB3AUTH_CLIENT_ID,
  WEB3AUTH_NETWORK,
  WEB3AUTH_VERIFIER_NAME,
  RTDB_INSTANCE,
  RTDB_PATH,
  LOCATION,
} = process.env;

export const getDatabaseUrl = () => {
  if (LOCATION === "us-central1")
    return `https://${RTDB_INSTANCE}.firebaseio.com`;

  return `https://${RTDB_INSTANCE}.${LOCATION}.firebasedatabase.app`;
};

const databaseURL: string = getDatabaseUrl();

functions.logger.log("databaseURL", databaseURL);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL,
});

const database: Database = admin.database();

const ALLOWED_NETWORKS: TORUS_NETWORK_TYPE[] = [
  "mainnet",
  "cyan",
  "testnet",
  "aqua",
  "sapphire_devnet",
  "sapphire_mainnet",
];

const validateEnvironmentVariables = () => {
  if (typeof WEB3AUTH_CLIENT_ID !== "string") {
    throw new Error("WEB3AUTH_CLIENT_ID not set");
  }

  if (
    !(
      typeof WEB3AUTH_NETWORK === "string" &&
      ALLOWED_NETWORKS.includes(WEB3AUTH_NETWORK as TORUS_NETWORK_TYPE)
    )
  ) {
    throw new Error("WEB3AUTH_NETWORK not set");
  }

  if (typeof WEB3AUTH_VERIFIER_NAME !== "string") {
    throw new Error("WEB3AUTH_VERIFIER_NAME not set");
  }
};

const generateWalletAddressHandler = async (
  user: functions.auth.UserRecord
): Promise<TorusPublicKey> => {
  functions.logger.log("Firebase user created", user);

  try {
    validateEnvironmentVariables();

    if (!WEB3AUTH_VERIFIER_NAME) {
      throw new Error("WEB3AUTH_VERIFIER_NAME not set");
    }
    const verifierId = user.uid;
    const verifier = WEB3AUTH_VERIFIER_NAME;

    const fnd = new NodeDetailManager({
      network: WEB3AUTH_NETWORK as TORUS_NETWORK_TYPE,
    });

    const nodeDetails = await fnd.getNodeDetails({ verifier, verifierId });
    if (!nodeDetails) {
      throw new Error("No node details found");
    }

    const newAuthInstance = new Torus({
      enableOneKey: true,
      clientId: WEB3AUTH_CLIENT_ID,
      network: WEB3AUTH_NETWORK,
    } as TorusCtorOptions);

    const publicAddress = await newAuthInstance.getPublicAddress(
      nodeDetails.torusNodeEndpoints,
      nodeDetails.torusNodePub,
      {
        verifier,
        verifierId,
      }
    );

    functions.logger.log(
      `ETH Wallet Address: ${publicAddress.finalKeyData.evmAddress} for user with userId: ${user.uid}} is created successfully using Web3Auth.`
    );

    database.ref((RTDB_PATH || "web3auth") + "/" + user.uid).set({
      name: user.displayName,
      email: user.email,
      eth_address: publicAddress.finalKeyData.evmAddress,
    });

    return publicAddress;
  } catch (error) {
    functions.logger.error("Error creating Web3Auth user", error);
    throw new Error(`Error creating Web3Auth user ${error}`);
  }
};

export const generateWalletAddress = functions.auth
  .user()
  .onCreate(generateWalletAddressHandler);
