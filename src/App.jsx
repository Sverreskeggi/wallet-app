import { useAccount, useConnect, useDisconnect, useBalance, useSendTransaction } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatEther, parseEther } from 'viem'
import { useState } from 'react'

function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { sendTransaction, isPending, isSuccess, data: txHash } = useSendTransaction()

  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  if (!isConnected) return <p>Кошелёк не подключён</p>

  const ethBalance = balance ? formatEther(balance.value) : '0'

  function handleSend() {
    sendTransaction({
      to: toAddress,
      value: parseEther(amount),
    })
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>Адрес: {address}</p>
      <p>Баланс: {parseFloat(ethBalance).toFixed(4)} {balance?.symbol}</p>

      <hr />
      <h3>Отправить ETH</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
        <input
          placeholder="Адрес получателя (0x...)"
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          placeholder="Сумма в ETH (например 0.01)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button
          onClick={handleSend}
          disabled={isPending || !toAddress || !amount}
          style={{ padding: '8px' }}
        >
          {isPending ? 'Ожидание подтверждения...' : 'Отправить'}
        </button>
      </div>

      {isSuccess && (
  <p style={{ marginTop: '1rem' }}>
    Транзакция отправлена!{' '}
    <a href={'https://sepolia.etherscan.io/tx/' + txHash} target="_blank" rel="noreferrer">
      Посмотреть в Etherscan
    </a>
  </p>
)}
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