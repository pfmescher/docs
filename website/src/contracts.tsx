import ContractAddresses from '@graphprotocol/contracts/addresses.json'

import { getAddressLink } from '@edgeandnode/common'
import { Link } from '@edgeandnode/gds'

import { Table } from '@/src/nextra-theme/components'

type ValueOf<T> = T[keyof T]
const contractsByNetworkId = ContractAddresses as Record<string, ValueOf<typeof ContractAddresses>>

export function ProtocolContractsTable({ networkId }: { networkId: number }) {
  const contracts = Object.entries(contractsByNetworkId[`${networkId}`] ?? {}).map(([name, contract]) => ({
    ...contract,
    name,
  }))
  return (
    <Table>
      <tbody>
        <tr>
          <th>{'Contract'}</th>
          <th>{'Address'}</th>
        </tr>
        {contracts.map((contract) => {
          return (
            <tr key={contract.name}>
              <td>{contract.name}</td>
              <td>
                <Link href={getAddressLink(contract.address, networkId)}>{contract.address}</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
