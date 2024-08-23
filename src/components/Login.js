import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoImage from '../aseets/images/new_logo.png';

const theme = {
    colors: {
        primary: "#1a1a1a",
        secondary: "#2a2a2a",
        text: "#e0e0e0",
        mutedText: "#bbb",
        background: "#1a1a1a",
        border: "#333",
        accent: "#f39c12", // Added accent color
    },
    font: {
        family: "Poppins",
        size: {
            large: "24px",
            medium: "18px",
            small: "14px",
            xSmall: "12px",
        },
        weight: {
            regular: 400,
            medium: 500,
            bold: 600,
        },
    },
};

function Login({ onClose }) {
    return (
        <MainContainer>
            <FirstContainer>
                <SecondContainer>
                    <CloseIcon icon={faTimes} onClick={onClose} />
                    <ThirdContainer>
                        <Logo src={LogoImage} alt="InkWave" />
                        <Title>InkWave Blog</Title>
                        <LoginForm>
                            <EmailInput type="email" placeholder="Enter your email" />
                            <PasswordInput type="password" placeholder="Enter your password" />
                            <StyledButton>Log In</StyledButton>
                        </LoginForm>
                        <TermsText>
                            By continuing, you agree to our{" "}
                            <StyledLink>Terms & Conditions</StyledLink>
                        </TermsText>
                        <SignUpText>
                            New here?{" "}
                            <SignUpLink>Sign up</SignUpLink>
                        </SignUpText>
                    </ThirdContainer>
                </SecondContainer>
            </FirstContainer>
        </MainContainer>
    );
}

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  ${flexCenter}
  position: fixed; /* Fixed positioning for popup */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  z-index: 1000; /* Ensure it's above other content */
`;

const FirstContainer = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100%;
`;

const SecondContainer = styled.div`
  ${flexCenter}
  position: relative;
  background-color: ${theme.colors.secondary};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px;
  height: auto;
`;

const ThirdContainer = styled.div`
  max-width: 350px;
  ${flexCenter}
  flex-direction: column;
  gap: 10px; /* Adjust gap to control space between elements */
  position: relative;
`;

const commonTextStyle = css`
  font-family: ${theme.font.family};
  text-align: center;
  color: ${theme.colors.text};
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 10px; /* Add bottom margin if needed for spacing */
`;

const Title = styled.h2`
  ${commonTextStyle}
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.bold};
  margin: 0; /* Remove margin */
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const EmailInput = styled.input`
  width: 100%; /* Ensure full width of the container */
  max-width: 350px; /* Set a maximum width to control the size */
  padding: 15px; /* Increase padding for a larger input field */
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.medium}; /* Increase font size for better readability */
  outline: none;
  box-sizing: border-box; /* Include padding and border in width calculation */
  
  &::placeholder {
    color: ${theme.colors.mutedText};
  }

  &:focus {
    border-color: ${theme.colors.accent};
  }
`;

const PasswordInput = styled.input`
  width: 100%; /* Ensure full width of the container */
  max-width: 350px; /* Set a maximum width to control the size */
  padding: 15px; /* Increase padding for a larger input field */
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.medium}; /* Increase font size for better readability */
  outline: none;
  box-sizing: border-box; /* Include padding and border in width calculation */
  
  &::placeholder {
    color: ${theme.colors.mutedText};
  }

  &:focus {
    border-color: ${theme.colors.accent};
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: ${theme.colors.accent};
  border: none;
  color: ${theme.colors.background};
  font-size: ${theme.font.size.small};
  font-weight: ${theme.font.weight.bold};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  }
`;

const TermsText = styled.p`
  ${commonTextStyle}
  font-size: ${theme.font.size.small};
  font-weight: ${theme.font.weight.regular};
  color: ${theme.colors.mutedText};
`;

const StyledLink = styled.span`
  ${commonTextStyle}
  font-size: ${theme.font.size.small};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.colors.accent};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpText = styled.p`
  ${commonTextStyle}
  font-size: ${theme.font.size.small};
  font-weight: ${theme.font.weight.regular};
  color: ${theme.colors.mutedText};
  margin: 0; /* Remove margin */
`;

const SignUpLink = styled.span`
  ${commonTextStyle}
  font-size: ${theme.font.size.small};
  font-weight: ${theme.font.weight.medium};
  color: ${theme.colors.accent};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const iconStyles = css`
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 6px;
  gap: 0px;
  opacity: 1;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

const CloseIcon = styled(FontAwesomeIcon)`
  ${iconStyles}
  top: 10px;
  right: 10px;
  z-index: 1;
`;

export default Login;