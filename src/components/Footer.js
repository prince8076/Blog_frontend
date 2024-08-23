import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Footer = () => (
    <FooterWrapper>
        <p>© 2024 My Blog. All rights reserved.</p>
    </FooterWrapper>
);

export default Footer;
