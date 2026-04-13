import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatEther } from 'viem'

function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { data: balance, isLoading } = useBalance({ address })

  if (!isConnected) return <p>Кошелёк не подключён</p>
  if (isLoading) return <p>Загрузка...</p>

  const ethBalance = balance ? formatEther(balance.value) : '0'

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>Адрес: {address}</p>
      <p>Баланс: {parseFloat(ethBalance).toFixed(4)} {balance?.symbol}</p>
    </div>
  )
}

function ConnectButton() {
  const { isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return <button onClick={() => disconnect()}>Отключиться</button>
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