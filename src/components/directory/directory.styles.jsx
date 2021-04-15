import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DirectoryContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 75px;
  @media (min-width: 600px) {
    margin-top: 0px;
  }
`
export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};

`
export const ShopNowButton = styled(Link)`
  position: absolute;
  display:inline-block;
  margin: auto;
  top: 70%;
  right:0;
  bottom:0;
  left:0;
  height: 60px;
  width: 220px;
  text-align: center;
  background-color: rgba(253, 252, 252, 0.877);
  color: #3b3a3a;
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  text-transform: uppercase;  
  border-radius: 30px;
  /* border: 1px solid white; */
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  z-index: 5;
  transition: all 0.3s ease-in-out;

  &:active {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`
  