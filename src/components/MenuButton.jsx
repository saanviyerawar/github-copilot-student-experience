import React, { useState, useEffect, useRef, useContext } from 'react';
import MapIcon from '@mui/icons-material/Map';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ModeContext } from '../contexts/ModeProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HeaderThree from "./HeaderThree";
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

function MenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { mode, setMode } = useContext(ModeContext);

  const toggleColor = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-[2px] left-[2px] md:top-2 md:left-2 z-50" ref={menuRef}>
      <button
        className="bg-blue-500 text-white rounded-full m-4 p-3 flex items-center justify-center text-4xl lg:text-5xl focus:outline-none hover:bg-blue-700 cursor-pointer clickable space-x-2"
        onClick={toggleMenu}
      >
        <MapIcon style={{ color: 'white', fontSize: "2rem" }} />
        <HeaderThree className="hidden md:block text-white text-base lg:text-xl">Map</HeaderThree>
      </button>
      {isMenuOpen && (
        <div 
          className="absolute top-[55px] m-[16px] border border-gray-300 shadow-lg rounded-lg p-2 z-50 inline-block"
          style={{
            background: mode === "dark" ? "#493A7E" : "#D1D5DB"
          }}
        >
          <ul className="list-none p-0 m-0 whitespace-nowrap">
            <li className="p-2 w-48 hover:font-bold">
              <RouterLink to="/" onClick={() => setIsMenuOpen(false)}>Student studio</RouterLink>
            </li>
            <Link classname="cursor-pointer" to="introduction" spy={true} smooth={true} offset={50} duration={1000}
              onClick={() => setIsMenuOpen(false)}
            >
              <li className="p-2 w-48 hover:font-bold flex items-center">
                <AccountBoxIcon className="mr-2" /> Introduction
              </li>
            </Link>
            <Link classname="cursor-pointer" to="work-experience" spy={true} smooth={true} offset={50} duration={1000}
              onClick={() => setIsMenuOpen(false)}
            >
              <li className="p-2 w-48 hover:font-bold flex items-center">
                <WorkIcon className="mr-2" /> Work experience
              </li>
            </Link>
            <Link classname="cursor-pointer" to="projects" spy={true} smooth={true} offset={50} duration={1000}
              onClick={() => setIsMenuOpen(false)}
            >
              <li className="p-2 w-48 hover:font-bold flex items-center">
                  <BuildIcon className="mr-2" /> Projects
              </li>
            </Link>
            <Link classname="cursor-pointer" to="contact" spy={true} smooth={true} offset={50} duration={1000}
              onClick={() => setIsMenuOpen(false)}
            >
              <li className="p-2 w-48 hover:font-bold flex items-center">
                  <ContactMailIcon className="mr-2" /> Contact
              </li>
            </Link>
            <li 
              className="p-2 w-48 hover:font-bold cursor-pointer flex items-center clickable"
              onClick={() => {toggleColor(); setIsMenuOpen(false);}}
            >
              {mode === "dark" ? (
                <>
                  <Brightness7Icon className="mr-2" /> Day
                </>
              ) : (
                <>
                  <Brightness4Icon className="mr-2" /> Evening
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuButton