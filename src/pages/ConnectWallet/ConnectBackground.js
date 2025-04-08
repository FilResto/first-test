import React from 'react'
import styled from 'styled-components'
import loadingImage from './../../assets/game/loading-background.jpg'

const StyledBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: black;
  background-image: url(${loadingImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-attachment: fixed;

  display: flex;
  /* Align items top-left */
  justify-content: flex-start;  
  align-items: flex-start;

  /* padding */
  padding: 20px;
`

const ConnectBackground = ({ children }) => {
  return <StyledBackground>{children}</StyledBackground>
}

export default ConnectBackground
