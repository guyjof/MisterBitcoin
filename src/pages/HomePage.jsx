import { BitcoinService } from '../services/bitcoin-service.js'
import { MovesList } from '../cmps/MovesList.jsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const HomePage = () => {
  const [bitcoinRate, setBitcoinRate] = useState(null)
  const { loggedInUser } = useSelector(state => state.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const bitcoinRate = await BitcoinService.getRate(loggedInUser.coins)
        setBitcoinRate(bitcoinRate)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [bitcoinRate])

  if (!loggedInUser) return <div>Loading...</div>
  const { name, coins, moves } = loggedInUser
  return (
    <main className='home'>
      <section className='home-info'>
        <div className='user-info'>
          <img
            className='profile-pic'
            src={'https://robohash.org/' + name}
            alt=''
          />
          <p>Hello {name}!</p>
          <p>BTC: {coins} 🪙</p>
          <p>1 USD &#8776; {bitcoinRate} BTC</p>
        </div>
        <MovesList title={'Last Moves:'} moves={moves} />
      </section>
    </main>
  )
}
