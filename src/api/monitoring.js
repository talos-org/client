// @flow
import { APIClient } from 'api/client';

let client = new APIClient();

export function getPeerInfo(name: string) {
  return client.get(`/get_peer_info?blockchainName=${name}`);
}

export function getInactiveNodes(data: { blockchainName: string }) {
  return client.post('/get_inactive_nodes', data);
}
