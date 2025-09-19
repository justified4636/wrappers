import { beginCell, type Cell } from "@ton/core"

export interface CertificateMetadata {
  title: string
  description: string
  certificateType: string
  issuer: string
  issueDate: string
  issuedBy: string
}

export function createCertificateMetadata(data: CertificateMetadata): Cell {
  return beginCell()
    .storeStringTail(
      JSON.stringify({
        ...data,
        timestamp: Date.now(),
        version: "1.0",
      }),
    )
    .endCell()
}

export function parseCertificateMetadata(cell: Cell): CertificateMetadata | null {
  try {
    const slice = cell.beginParse()
    const jsonString = slice.loadStringTail()
    return JSON.parse(jsonString)
  } catch (error) {
    console.error("Error parsing certificate metadata:", error)
    return null
  }
}

export const CONTRACT_CONFIG = {
  MAX_SUPPLY: 500n,
  MINT_FEE: "0.1", // TON
  GAS_FEE: "0.05", // TON
}
