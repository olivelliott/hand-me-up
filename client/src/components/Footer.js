// import {
//   Box,
//   chakra,
//   Container,
//   Link,
//   SimpleGrid,
//   Stack,
//   Text,
//   VisuallyHidden,
//   Input,
//   IconButton,
//   useColorModeValue,
// } from '@chakra-ui/react'
// import { ReactNode } from 'react'
// import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
// import { BiMailSend } from 'react-icons/bi'

<<<<<<< HEAD
const Logo = (props: any) => {
  return (
    <svg
      height={32}
      viewBox="0 0 120 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    ></svg>
  )
}
=======
>>>>>>> dev


// const SocialButton = ({
//   children,
//   label,
//   href,
// }: {
//   children: ReactNode,
//   label: string,
//   href: string,
// }) => {
//   return (
//     <chakra.button
//       bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
//       rounded={'full'}
//       w={8}
//       h={8}
//       cursor={'pointer'}
//       as={'a'}
//       href={href}
//       display={'inline-flex'}
//       alignItems={'center'}
//       justifyContent={'center'}
//       transition={'background 0.3s ease'}
//       _hover={{
//         bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
//       }}
//     >
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
//   )
// }

// const ListHeader = ({ children }: { children: ReactNode }) => {
//   return (
//     <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
//       {children}
//     </Text>
//   )
// }

// export default function LargeWithNewsletter() {
//   return (
//     <Box
//       bg={useColorModeValue('gray.50', 'gray.900')}
//       color={useColorModeValue('gray.700', 'gray.200')}
//     >
//       <Container as={Stack} maxW={'6xl'} py={10}>
//         <SimpleGrid
//           templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
//           spacing={8}
//         >
//           <Stack spacing={6}>
//             <Box>
//               <Logo color={useColorModeValue('gray.700', 'white')} />
//             </Box>
//             <Text fontSize={'sm'}>
//               © 2022 Chakra Templates. All rights reserved
//             </Text>
//             <Stack direction={'row'} spacing={6}>
//               <SocialButton label={'Twitter'} href={'#'}>
//                 <FaTwitter />
//               </SocialButton>
//               <SocialButton label={'YouTube'} href={'#'}>
//                 <FaYoutube />
//               </SocialButton>
//               <SocialButton label={'Instagram'} href={'#'}>
//                 <FaInstagram />
//               </SocialButton>
//             </Stack>
//           </Stack>
//           <Stack align={'flex-start'}>
//             <ListHeader>Company</ListHeader>
//             <Link href={'#'}>About us</Link>
//             <Link href={'#'}>Blog</Link>
//             <Link href={'#'}>Contact us</Link>
//             <Link href={'#'}>Pricing</Link>
//             <Link href={'#'}>Testimonials</Link>
//           </Stack>
//           <Stack align={'flex-start'}>
//             <ListHeader>Support</ListHeader>
//             <Link href={'#'}>Help Center</Link>
//             <Link href={'#'}>Terms of Service</Link>
//             <Link href={'#'}>Legal</Link>
//             <Link href={'#'}>Privacy Policy</Link>
//             <Link href={'#'}>Satus</Link>
//           </Stack>
//           <Stack align={'flex-start'}>
//             <ListHeader>Stay up to date</ListHeader>
//             <Stack direction={'row'}>
//               <Input
//                 placeholder={'Your email address'}
//                 bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
//                 border={0}
//                 _focus={{
//                   bg: 'whiteAlpha.300',
//                 }}
//               />
//               <IconButton
//                 bg={useColorModeValue('#001219', 'green.800')}
//                 color={useColorModeValue('white', 'gray.800')}
//                 _hover={{
//                   bg: '#0A9396',
//                 }}
//                 aria-label="Subscribe"
//                 icon={<BiMailSend />}
//               />
//             </Stack>
//           </Stack>
//         </SimpleGrid>
//       </Container>
//     </Box>
//   )
// }

// import React from 'react'

// const Footer = () => {
//   return (
//     <div>Footer component</div>
//   )
// }

// export default Footer


// import {
//   ButtonGroup,
//   Container,
//   IconButton,
//   Stack,
//   Text,

//   Image,
// } from "@chakra-ui/react";
// import * as React from "react";
// import footerlogo from "../assets/footerlogo.png";
// import { FaGithub } from "react-icons/fa";

// function Footer() {
//   const icons = [
//     {
//       name: "github",
//       alt: "github icon",
//       href: "https://github.com/olivelliott",
//       icon: "FaGithub",
//     },
//   ];
//   return (
//     <Container
//       as="footer"
//       role="contentinfo"
//       py={{ base: "12", md: "16" }}
//       maxW="auto"
//       color="orange"
//     >
//       <Stack spacing={{ base: "4", md: "5" }}>
//         <Stack justify="space-between" direction="row" align="center">
//           <Image src={footerlogo} maxW="6rem"></Image>
//           <ButtonGroup variant="ghost" color="orange">
//             <IconButton
//               as="a"
//               href="https://github.com/olivelliott/hand-me-up"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="GitHub"
//               icon={<FaGithub fontSize="1.25rem" />}
//             />
//           </ButtonGroup>
//         </Stack>
//         <Text fontSize="sm" color="red" align="center">
//           &copy; {new Date().getFullYear()}
//         </Text>
//       </Stack>
//     </Container>
//   );
// }

// export default Footer;

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import footerlogo from '../assets/footer-logo-1.png';



export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Image src={footerlogo} maxW='10rem'/>
        <Stack direction={'row'} spacing={6}>
          <Link to='/'>Home</Link>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
          <Link to='/all-products'>Products</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text fontSize="sm" align="center">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </Text>
          <Stack direction={'row'} spacing={6}>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};