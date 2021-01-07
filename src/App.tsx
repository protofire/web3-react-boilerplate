import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { MetaMask } from './connectors'
import './App.css'

function App() {
  const { active, activate, library, error } = useWeb3React()
  const [blockNumber, setBlockNumber] = useState(null)

  useEffect(() => {
    if (!active) {
      activate(MetaMask)
    }

    if (active) {
      library.getBlockNumber().then(setBlockNumber)
    }
  }, [active, library, activate])

  let content = null

  if (error) {
    content = 'There was an error'
  } else if (active) {
    content = blockNumber
      ? `Block number: ${blockNumber}`
      : 'Fetching block number'
  } else {
    content = 'Loading...'
  }

  return <div className="App">{content}</div>
}

export default App
