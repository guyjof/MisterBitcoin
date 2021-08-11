export function MovesList({ title, moves }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className='moves-list'>
        {moves.map(move => {
          const { to, at, amount } = move
          return (
            <li key={at}>
              <p>To:{to}</p>
              <p>At:{new Date(at).toLocaleString()}</p>
              <p>Amount: {amount}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
