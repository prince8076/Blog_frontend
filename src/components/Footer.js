import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.headerBg};
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.headerText};
`;

const Footer = () => (
    <FooterWrapper>
        <p>© {new Date().getFullYear()} InkWave Blog — Tech, Travel &amp; Lifestyle. All rights reserved.</p>
    </FooterWrapper>
);

export default Footer;
