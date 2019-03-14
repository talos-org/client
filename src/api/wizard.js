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

export function getBlockchains() {
  return client.get(`/configuration/get_blockchains`);
}

export function connectToAdminNode(data: { adminNodeAddress: string }) {
  return client.post('/nodes/connect_to_admin_node', data);
}
