// @flow
import { APIClient } from 'api/client';

let client = new APIClient();

export function createChain(data: { blockchainName: string }) {
  return client.post('/configuration/create_chain', data);
}

export function doesBlockchainExist(blockchainName: string) {
  return client.get(
    `/configuration/check_blockchain_name?blockchainName=${blockchainName}`,
  );
}

export function launchDaemon(data: { blockchainName: string }) {
  return client.post('/configuration/deploy_chain', data);
}

export function updateConfig(data: Object) {
  return client.post('/configuration/config_parameters', data);
}
