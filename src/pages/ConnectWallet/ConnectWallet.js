import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

import globalContext from './../../context/global/globalContext'
import socketContext from '../../context/websocket/socketContext'
import { CS_FETCH_LOBBY_INFO } from '../../pokergame/actions'

import LoadingScreen from '../../components/loading/LoadingScreen'
import './ConnectWallet.scss'
import { ethers } from 'ethers'
import ConnectBackground from './ConnectBackground'  // define a wrapper

const ConnectWallet = () => {
  const { setWalletAddress } = useContext(globalContext)
  const { socket } = useContext(socketContext)
  const navigate = useNavigate()

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [localWallet, setLocalWallet] = useState('')  // metamask

  useEffect(() => {
    if (!socket || !socket.connected) {
      return
    }

    const walletAddress = query.get('walletAddress')
    const gameId = query.get('gameId')
    const username = query.get('username')

    if (walletAddress && gameId && username) {
      console.log('ConnectWallet -> Found query params:', { walletAddress, gameId, username })
      setWalletAddress(walletAddress)

      socket.emit(CS_FETCH_LOBBY_INFO, {
        walletAddress,
        socketId: socket.id,
        gameId,
        username,
      })

      console.log(CS_FETCH_LOBBY_INFO, { walletAddress, socketId: socket.id, gameId, username })
      navigate('/play')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [socket])

  async function handleConnectMetaMask() {
    if (!window.ethereum) {
      Swal.fire('MetaMask missing!', 'Please install MetaMask extension', 'error')
      return
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts && accounts.length > 0) {
        const userAddr = accounts[0]
        setLocalWallet(userAddr)
        setWalletAddress(userAddr)

        const gameId = 'defaultGame'
        const username = 'MetaMaskUser'

        if (socket && socket.connected) {
          socket.emit(CS_FETCH_LOBBY_INFO, {
            walletAddress: userAddr,
            socketId: socket.id,
            gameId,
            username,
          })
          navigate('/play')
        } else {
          setError('Socket not ready or disconnected. Please try again later.')
        }
      }
    } catch (err) {
      console.error(err)
      setError('Failed to connect MetaMask: ' + err.message)
    }
  }

  if (isLoading || !socket || !socket.connected) {
    return <LoadingScreen />
  }

  return (
    <ConnectBackground>
      <div className="connect-container">
        <h2 style={{ color: 'white' }}>Connect Your Wallet</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p style={{ color: 'white' }}>Your local wallet: {localWallet || 'Not Connected'}</p>

        <button onClick={handleConnectMetaMask}>Connect with MetaMask</button>
      </div>
    </ConnectBackground>
  )
}

export default ConnectWallet
