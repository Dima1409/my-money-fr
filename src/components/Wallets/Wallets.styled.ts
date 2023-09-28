import styled from "styled-components";

const InfoWallets = styled.p`
text-align: center;
margin: 0;
`

const WalletsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid tomato;
  margin-bottom: 10px;
`;
const Wallet = styled.div`
  padding: 4px;
  border: 1px solid azure;
  background-color: teal;
  color: gold;
`;

export {InfoWallets, WalletsWrapper, Wallet };
