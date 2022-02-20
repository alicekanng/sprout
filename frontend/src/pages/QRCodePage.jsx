import { Avatar, Box, Center, Heading, Text } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/socket";
import { getLocalStorage } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";

export default function QRCodePage() {
  const user = getLocalStorage("user");
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("web:get_user_data", () => {
      socket.emit("user:receive_user_data", { user });
    });

    socket.on("web:scan_success", () => {
      navigate(`/user/${user.id}`);
    });
  }, []);

  return (
    <div id='doqr'>
      <Box minHeight='100vh'>
        <Center pt={120}>
          <Wrap>
            <WrapItem>
              <Avatar
                name='Dan Abrahmov'
                src={`https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`}
                size='2xl'
              />{" "}
            </WrapItem>
          </Wrap>
        </Center>

        <Center pt={5}>
          <Heading> Hello {`${user.name}`},</Heading>
        </Center>

        <Center pt={50} textAlign='center'>
          <Text>
            Your QR code is ready to be used at your favourite restaurants!
          </Text>
        </Center>

        <Center pt={50}>
          <Box maxW='sm' borderWidth='10px' borderRadius='md' overflow='show'>
            <QRCode value={`http://localhost:3000/${user.id}`} />
          </Box>
        </Center>
      </Box>
    </div>
  );
}
