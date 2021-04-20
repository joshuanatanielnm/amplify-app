import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import React, { useEffect, useState } from 'react'

import { API } from 'aws-amplify'

function App() {
  const [coins, updateCoins] = useState([])
  const [input, updateInput] = useState({ limit: 5, start: 0 })

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
  }

  async function fetchCoins() {
    const { limit, start } = input
    const data = await API.get(
      'cryptoapi',
      `/coins?limit=${limit}&start=${start}`
    )
    updateCoins(data.coins.data)
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className='App'>
      <input
        onChange={(e) => updateInputValues('limit', e.target.value)}
        placeholder='limit'
      />
      <input
        placeholder='start'
        onChange={(e) => updateInputValues('start', e.target.value)}
      />
      <button onClick={fetchCoins}>Fetch Coins</button>

      {coins &&
        coins.map((coin, index) => (
          <div key={index}>
            <h2>
              {coin.name} - {coin.symbol}
            </h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))}
    </div>
  )
}

export default App
