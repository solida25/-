import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaLightbulb,
  FaBuilding,
  FaInfoCircle,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0066cc;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
`;

const NavLink = styled(Link)`
  margin-left: 1.5rem;
  text-decoration: none;
  color: #333333;
  display: flex;
  align-items: center;

  &:hover {
    color: #0066cc;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const NavIcon = styled.span`
  margin-right: 0.5rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const AreaClientiButton = styled(Link)`
  background-color: #0066cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-left: 1.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0055aa;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo>Solida-Energia</Logo>

        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/">
            <NavIcon>
              <FaHome />
            </NavIcon>
            Home
          </NavLink>
          <NavLink to="/offerte-luce">
            <NavIcon>
              <FaLightbulb />
            </NavIcon>
            Offerte Luce
          </NavLink>
          <NavLink to="/offerte-gas">
            <NavIcon>
              <FaLightbulb />
            </NavIcon>
            Offerte Gas
          </NavLink>
          <NavLink to="/offerte-business">
            <NavIcon>
              <FaBuilding />
            </NavIcon>
            Business
          </NavLink>
          <NavLink to="/chi-siamo">
            <NavIcon>
              <FaInfoCircle />
            </NavIcon>
            Chi Siamo
          </NavLink>
          <NavLink to="/contatti">
            <NavIcon>
              <FaPhone />
            </NavIcon>
            Contatti
          </NavLink>
          <AreaClientiButton to="/area-clienti">
            <NavIcon>
              <FaUser />
            </NavIcon>
            Area Clienti
          </AreaClientiButton>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
