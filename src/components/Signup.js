import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoImage from '../aseets/images/new_logo.png';
import axios from 'axios';

const theme = {
    colors: {
        primary: "#1a1a1a",
        secondary: "#2a2a2a",
        text: "#e0e0e0",
        mutedText: "#bbb",
        background: "#1a1a1a",
        border: "#333",
        accent: "#f39c12",
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

function Signup({ onClose, toggleForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                email,
                password
            });
            console.log('Signup successful:', response.data);
            // Handle successful signup (e.g., redirect, show message)
            onClose(); // Close the signup form
        } catch (error) {
            console.error('Signup error:', error);
            setError('Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer>
            <FirstContainer>
                <SecondContainer>
                    <CloseIcon icon={faTimes} onClick={onClose} />
                    <ThirdContainer>
                        <Logo src={LogoImage} alt="InkWave" />
                        <Title>InkWave Blog</Title>
                        <SignupForm onSubmit={handleSubmit}>
                            <EmailInput
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <PasswordInput
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <ConfirmPasswordInput
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <StyledButton type="submit" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </StyledButton>
                        </SignupForm>
                        {error && <ErrorText>{error}</ErrorText>}
                        <TermsText>
                            By continuing, you agree to our{" "}
                            <StyledLink>Terms & Conditions</StyledLink>
                        </TermsText>
                        <LoginText>
                            Already have an account?{" "}
                            <LoginLink onClick={toggleForm}>Log in</LoginLink>
                        </LoginText>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
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
  gap: 10px;
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
  margin-bottom: 10px;
`;

const Title = styled.h2`
  ${commonTextStyle}
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.bold};
  margin: 0;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const EmailInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.medium};
  outline: none;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${theme.colors.mutedText};
  }

  &:focus {
    border-color: ${theme.colors.accent};
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.medium};
  outline: none;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${theme.colors.mutedText};
  }

  &:focus {
    border-color: ${theme.colors.accent};
  }
`;

const ConfirmPasswordInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.medium};
  outline: none;
  box-sizing: border-box;
  
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

  &:disabled {
    background-color: ${theme.colors.mutedText};
    cursor: not-allowed;
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

const LoginText = styled.p`
  ${commonTextStyle}
  font-size: ${theme.font.size.small};
  font-weight: ${theme.font.weight.regular};
  color: ${theme.colors.mutedText};
  margin: 0;
`;

const LoginLink = styled.span`
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

const ErrorText = styled.p`
  ${commonTextStyle}
  font-size: ${theme.font.size.small};
  color: #ff0000;
`;

export default Signup;
