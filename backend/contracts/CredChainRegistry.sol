// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CredChainRegistry is Ownable {
    struct CertificateRecord {
        bytes32 hash;
        address issuer;
        uint256 issuedAt;
    }

    mapping(string => CertificateRecord) private records;
    mapping(address => bool) public allowedIssuer;

    event CertificateIssued(string certificateId, address issuer, bytes32 hash, uint256 issuedAt);

    modifier onlyAllowed() {
        require(allowedIssuer[msg.sender], "Not an allowed issuer");
        _;
    }

    function setIssuer(address issuer, bool allowed) external onlyOwner {
        allowedIssuer[issuer] = allowed;
    }

    function issueCertificate(string calldata certificateId, bytes32 hash) external onlyAllowed {
        require(records[certificateId].issuedAt == 0, "Already issued");
        records[certificateId] = CertificateRecord({ hash: hash, issuer: msg.sender, issuedAt: block.timestamp });
        emit CertificateIssued(certificateId, msg.sender, hash, block.timestamp);
    }

    function getCertificate(string calldata certificateId) external view returns (bytes32, address, uint256) {
        CertificateRecord memory r = records[certificateId];
        return (r.hash, r.issuer, r.issuedAt);
    }
}
