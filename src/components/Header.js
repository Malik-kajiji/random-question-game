import React, { useEffect, useState } from "react";
import Logo from'../img/logo.png';
import Status from "./Status";
import {FiSettings,FiVolume2,FiVolumeX,FiPlus,FiMinus} from 'react-icons/fi';
import {FaToggleOff,FaToggleOn} from 'react-icons/fa';
const Header = (props) => {
    const { toggleNav , handleToggleNav ,questionsNum,sound,setSound,handlePlus,handleMines} = props

    return ( 
        <header className="container">
            <img className="main-logo" src={Logo} alt="" />
            <button 
                onClick={()=>handleToggleNav()}
                className="sittings-btn TXT-heading"
                >{FiSettings()}
            </button>
            <nav className={`main-nav ${toggleNav?'active':''}`}>
                <div className='options' role='list'>
                    {sound && <span className="TXT-heading" onClick={setSound}>{FiVolume2()}</span>}
                    {!sound && <span className="TXT-heading" onClick={setSound}>{FiVolumeX()}</span>}
                    <span className="TXT-heading">{questionsNum}</span>
                </div>
                <div className='sittings' role='list'>
                    {sound && <span className=" TXT-heading" onClick={setSound}>{FaToggleOn()}</span>}
                    {!sound &&<span className=" TXT-heading" onClick={setSound}>{FaToggleOff()}</span>}
                    <div>
                        <span className=" TXT-heading" onClick={handleMines}>{FiMinus()}</span>
                        <span className=" TXT-heading" onClick={handlePlus}>{FiPlus()}</span>
                    </div>
                </div>
            </nav>
            <Status /> 
        </header>
    );
}

export default Header;