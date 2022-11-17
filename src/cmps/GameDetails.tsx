import { useEffect, useState } from 'react'
import { RootState } from '../features'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import { User } from '../models/User'
import { userService } from '../services/userServise'

export const GameDetails = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)

  const [whitePlayer, setWhitePlayer] = useState<User | null>(null)
  const [blackPlayer, setBlackPlayer] = useState<User | null>(null)

  const getUsers = async () => {
    if (!gameState) return
    if (!gameState?.players) return

    if (gameState?.players.white) {
      const user = await userService.getUser(gameState?.players.white)
      setWhitePlayer(user)
    }
    if (gameState?.players.black) {
      const user = await userService.getUser(gameState?.players.black)
      setBlackPlayer(user)
    }
  }

  useEffect(() => {
    getUsers()
  }, [gameState?.players?.black, gameState?.players?.white])

  console.log({ whitePlayer, blackPlayer })

  const screenStyle =
    gameState?.players?.black === authState?.loggedInUser?._id
      ? 'black-screen'
      : 'white-screen'

  return (
    <section className="game-details">
      <div className={'container ' + screenStyle}>
        <div className={'black-player ' + screenStyle}>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.black.map((piece) => (
              <span>{piece}</span>
            ))}
          </div>
          <div className={'timer ' + screenStyle}>05:00</div>
          <div className="bar"></div>
          <div className="player-name">
            <span className="is-connected"></span>
            <p>{blackPlayer?.fullname}</p>
          </div>
        </div>
        <div className="moves"></div>
        <div className="actions"></div>
        <div className={'white-player ' + screenStyle}>
          <div className="player-name">
            <span className="is-connected"></span>
            <p>{whitePlayer?.fullname}</p>
          </div>
          <div className="bar"></div>
          <div className="timer">05:00</div>
          <div className="eaten-pieces">
            {gameState?.eatenPieces.white.map((piece) => (
              <span>{piece}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
