import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <p>Подключён: {address}</p>
        <button onClick={() => disconnect()}>
          Отключиться
        </button>
      </div>
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
    </div>
  )
}