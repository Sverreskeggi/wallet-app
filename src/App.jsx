import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { injected } from 'wagmi/connectors'

function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  if (!isConnected) return null

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>Адрес: {address}</p>
      <p>
        Баланс: {balance
          ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
          : 'Загрузка...'}
      </p>
    </div>
  )
}

function ConnectButton() {
  const { isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <button onClick={() => disconnect()}>
        Отключиться
      </button>
    )
  }

  return (
    <button onClick={() => connect({ connector: injected() })}>
      Подключить MetaMask
    </button>
  )
}

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Web3 Wallet</h1>
      <ConnectButton />
      <WalletInfo />
    </div>
  )
}