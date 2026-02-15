import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

const ABI = [
  "function issueCertificate(string certificateId, bytes32 hash) external",
  "function getCertificate(string certificateId) external view returns (bytes32, address, uint256)",
  "function setIssuer(address issuer, bool allowed) external",
  "event CertificateIssued(string certificateId, address issuer, bytes32 hash, uint256 issuedAt)"
];

export class BlockchainService {
  provider: ethers.JsonRpcProvider;
  wallet: ethers.Wallet;
  contract: ethers.Contract | null = null;

  constructor(rpcUrl: string, privateKey: string, contractAddress?: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    if (contractAddress) this.contract = new ethers.Contract(contractAddress, ABI, this.wallet);
  }

  connectContract(address: string) {
    this.contract = new ethers.Contract(address, ABI, this.wallet);
  }

  async issueCertificate(certificateId: string, hashHex: string) {
    if (!this.contract) throw new Error('Contract not connected');
    const hashValue = hashHex.startsWith('0x') ? hashHex : '0x' + hashHex;
    const tx = await this.contract.issueCertificate(certificateId, hashValue);
    const receipt = await tx.wait();
    return { txHash: receipt.transactionHash, receipt };
  }

  async getCertificate(certificateId: string) {
    if (!this.contract) throw new Error('Contract not connected');
    return this.contract.getCertificate(certificateId);
  }

  async setIssuer(address: string, allowed: boolean) {
    if (!this.contract) throw new Error('Contract not connected');
    const tx = await this.contract.setIssuer(address, allowed);
    const receipt = await tx.wait();
    return { txHash: receipt.transactionHash, receipt };
  }
}
