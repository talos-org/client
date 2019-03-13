// @flow
import { APIClient } from 'api/client';

let client = new APIClient();

export async function getPeerInfo(name: string) {
  return client.get(`/network/get_peer_info?blockchainName=${name}`);
}

export function getWalletAddress(name: string) {
  return client.get(`/network/get_wallet_address?blockchainName=${name}`);
}
