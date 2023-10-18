import styled from "styled-components";

const InfoWallets = styled.p`
text-align: center;
margin: 0;
`

const WalletsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid tomato;
  margin: 0 auto;
  margin-bottom: 10px;
  max-width: 800px;
`;
const Wallet = styled.div`
  padding: 4px 0;
  margin: 0;
  border: 1px solid azure;
  background-color: teal;
  color: gold;
`;

export {InfoWallets, WalletsWrapper, Wallet };
