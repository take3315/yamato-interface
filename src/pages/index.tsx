import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Dashboad from '../components/Dashboad';
import Footer from '../components/Footer';
import Infographics from '../components/Infographics';
import Pledge from '../components/Pledge';
import Redemption from '../components/Redemption';
import Web3Status from '../components/WalletConnectButton';
import World from '../components/World';
import SvgYamatoLogWithTitle from '../components/svgs/YamatoLogoWithTitle';

export default function Index() {
  return (
    <>
      <Box p={4}>
        <Helmet title="Yamato Interface" />

        <Grid
          templateRows="repeat(16, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={2}>
            <Link to="/">
              <SvgYamatoLogWithTitle width={255} height={25} />
            </Link>
            <Link to="/tools/">ツール</Link>
          </GridItem>

          <GridItem rowSpan={1} colSpan={2}>
            <div
              style={{
                textAlign: 'right',
                width: '100%',
              }}
            >
              <Web3Status />
            </div>
          </GridItem>

          <GridItem rowSpan={3} colSpan={3}>
            <Dashboad />
          </GridItem>

          <GridItem rowSpan={8} colSpan={1}>
            <World />
          </GridItem>

          <GridItem rowSpan={11} colSpan={3}>
            <Pledge />

            <Box className="divider" mt={12} />

            <Redemption />
          </GridItem>

          <GridItem rowSpan={5} colSpan={1}>
            <Infographics />
          </GridItem>

          <GridItem rowSpan={1} colSpan={4}>
            <Footer />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
