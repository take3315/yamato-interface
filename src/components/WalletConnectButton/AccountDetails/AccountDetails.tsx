import { useContext } from 'react';
import { ExternalLink as LinkIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Button } from 'rebass/styled-components';
import styled, { ThemeContext } from 'styled-components';
// import WalletConnectIcon from '../../../assets/images/walletConnectIcon.svg';
import { ReactComponent as Close } from '../../../assets/images/x.svg';
import { SUPPORTED_WALLETS } from '../../../constants/web3';
import { useActiveWeb3React } from '../../../hooks/web3';
import {
  injected,
  // walletconnect,
  // walletlink,
  // fortmatic,
  // portis,
} from '../../../infrastructures/connectors';
import { AppDispatch } from '../../../state';
import { getEtherscanLink } from '../../../utils/externalLink';
import { shortenAddress } from '../../../utils/web3';
import { CategoryTitle } from '../../CommonItem';
import { ExternalLink } from '../../ExternalLink';
// import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg';
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png';
// import PortisIcon from '../../assets/images/portisIcon.png';
import Identicon from '../Identicon';
import Copy from './Copy';

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const UpperSection = styled.div`
  position: relative;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: 400;
  }
  h5:last-child {
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.text1};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.bg0};
`;

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};
  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSection = styled.div`
  padding: 0rem 1rem;
  ${({ theme }) =>
    theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }
  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text1};
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
  font-weight: 500;
  font-size: 1.4rem;
  a:hover {
    text-decoration: underline;
  }
  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  color: ${({ theme }) => theme.text1};
  margin-left: 1rem;
  font-size: 1.2rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text0};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const WalletName = styled.div`
  width: initial;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
`;

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`;

const WalletAction = styled(Button)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 1.4rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.text1};
`;

interface AccountDetailsProps {
  ENSName?: string;
  openOptions: () => void;
}

export default function AccountDetails({
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React();
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];
    return <WalletName>Connected with {name}</WalletName>;
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={16}>
          <Identicon />
        </IconWrapper>
      );
      // } else if (connector === walletconnect) {
      //   return (
      //     <IconWrapper size={16}>
      //       <img src={WalletConnectIcon} alt={'wallet connect logo'} />
      //     </IconWrapper>
      //   );
      // } else if (connector === walletlink) {
      //   return (
      //     <IconWrapper size={16}>
      //       <img src={CoinbaseWalletIcon} alt={'coinbase wallet logo'} />
      //     </IconWrapper>
      //   );
      // } else if (connector === fortmatic) {
      //   return (
      //     <IconWrapper size={16}>
      //       <img src={FortmaticIcon} alt={'fortmatic logo'} />
      //     </IconWrapper>
      //   );
      // } else if (connector === portis) {
      //   return (
      //     <>
      //       <IconWrapper size={16}>
      //         <img src={PortisIcon} alt={'portis logo'} />
      //         <MainWalletAction
      //           onClick={() => {
      //             portis.portis.showPortis();
      //           }}
      //         >
      //           Show Portis
      //         </MainWalletAction>
      //       </IconWrapper>
      //     </>
      //   );
    }
    return null;
  }

  return (
    <>
      <UpperSection>
        <HeaderRow>
          <CategoryTitle>Account</CategoryTitle>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {/* {connector !== injected && connector !== walletlink && (
                    <WalletAction
                      style={{
                        fontSize: '.825rem',
                        fontWeight: 400,
                        marginRight: '8px',
                      }}
                      onClick={() => {
                        (connector as any).close();
                      }}
                    >
                      Disconnect
                    </WalletAction>
                  )} */}
                  <WalletAction
                    onClick={() => {
                      openOptions();
                    }}
                  >
                    Change
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        {getStatusIcon()}
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {getStatusIcon()}
                        <p> {account && shortenAddress(account)}</p>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                <AccountControl>
                  <div>
                    {account && (
                      <Copy toCopy={account}>
                        <span style={{ marginLeft: '4px' }}>Copy Address</span>
                      </Copy>
                    )}
                    {chainId && account && (
                      <AddressLink
                        hasENS={!!ENSName}
                        isENS={true}
                        href={getEtherscanLink(
                          chainId,
                          ENSName ?? account,
                          'address'
                        )}
                      >
                        <LinkIcon size={16} />
                        <p style={{ marginLeft: '4px' }}>View on Etherscan</p>
                      </AddressLink>
                    )}
                  </div>
                </AccountControl>
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
    </>
  );
}
