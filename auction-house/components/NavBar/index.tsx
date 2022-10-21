import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAuctionHouse } from "../../context/AuctionHouse";

const NavBar: React.FC = () => {
    const { auctionHouse, handleAuctionHouseDisconnect } = useAuctionHouse();

    return(
        <Box flexGrow={1} position="relative">
            <Flex flexDirection="row" justifyContent="space-around">
                <Box>
                    { auctionHouse && <Flex flexDirection="row">
                        <Text
                            mt={5}
                            fontSize="xl"
                            fontWeight="bold"
                            textTransform="capitalize"
                            color="white"
                        >
                            {`Auction House Address: ${auctionHouse.address.toBase58()}`}
                        </Text>
                        <Button
                            marginStart="10px"
                            colorScheme="purple"
                            size="md"
                            mt={5}
                            onClick={handleAuctionHouseDisconnect}
                        >
                            Disconnect from Auction House
                        </Button>
                    </Flex> }
                </Box>
                <WalletMultiButton />
            </Flex>
        </Box>
    );
}

export default NavBar;