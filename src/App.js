import React from 'react';
import { useWeb3Context } from 'web3-react'
import './App.css';


function App() {
  const context = useWeb3Context()
  const [blockNumber, setBlockNumber] = React.useState(null)

  React.useEffect(() => {
    if (!context.active) {
      context.setFirstValidConnector(['MetaMask'])
    }

    if (context.active) {
      const { library } = context
      library.getBlockNumber().then(setBlockNumber)
    }
  }, [context])

  let content = null
  if (!context.active && !context.error) {
    content = <div>'Loading...'</div>
  } else if (context.error) {
    content = <div>'There was an error'</div>
  } else {
    content = <div>{blockNumber ? `Block number: ${blockNumber.toString()}` : 'Fetching block number'}</div>
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
