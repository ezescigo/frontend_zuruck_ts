import styled, {css} from 'styled-components';

export const Cover = styled.div`
  position: absolute;
  width: 100vw;
  height: 300vh;
  background: white;
  opacity: 0.6;
  display: none;
  cursor: pointer;
  z-index: 30;

  ${({active}) => active && css`display: block` }
`
;

export const SearchBox = styled.input.attrs({
  type: 'text',
  placeholder: 'Search',
})`
  font-family: 'Varela Round', 'Courier New', Courier, monospace;
  border-radius: 30px;
  height: 45px;
  background-color: #fdfdfd;
  border: 0px;
  color: #575656;
  font-size: 14px;
  font-weight: Semi-Bold;
  padding: 5px 20px;
  padding-left: 50px;
  z-index: 50;
  
  &:focus { 
    outline: none !important;
    
    /* border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE; */

    ::placeholder {
      color: #7c7979;
    }
  }

  ::placeholder{
    display: none
  }
`;

export const SearchBoxContainer = styled.div`
  position: relative;
  border-radius: 20px;
  background-color: transparent;
  border: 0px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 50;
  flex: 2;
  transition: all 1s ease;

  .search-icon {
    position: absolute;
    width: 30px;
    height: 30px;
    margin: 10px;
    z-index: 50;
    cursor: pointer;
    transition: all 1s ease;
    color: white;

    &.active {
      color: #333333;
    }
  }

  .close-icon {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 5px;
    z-index: 50;
    cursor: pointer;
    transition: opacity 1.2s ease-in-out;
    /* transition: opacity 0.3s ease; */
    opacity: 0;
    color: rgba(41,41,41,0.95);

    visibility: hidden;

    &.active {
      visibility: visible;
      opacity: 1;
      color: #333333;
      /* transform: translateX(0px); */
    }
  }
`;

export const SlideNavBar = styled.div`
  padding: 80px 30px;
  width: 600px;
  right: 0;
  height: 100vh;
  display: flex;
  position: absolute;
  float: right;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  background-color: rgb(238, 243, 238);
  opacity: 1;
  z-index: 40;
  overflow-y: auto;

  h2, h4 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 300;
    margin: 5px auto;
  }

  .links-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 30px;

    .title-searchbar {
      font-weight: 400;
      margin-left: 0;
      margin-bottom: 15px;
    }

    .link-searchbar {
      font-size: 12;
      margin: 2px;
    }
  }
`