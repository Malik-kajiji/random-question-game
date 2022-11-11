import React from "react";
import Logo from'../img/logo.png'
const Footer = () => {
    function handleCopy(){
        const copyMsg = document.querySelector('.copy');
        navigator.clipboard.writeText("contact@malikkajiji.online");
        copyMsg.innerHTML = "copied";
        setTimeout(() => {
            copyMsg.innerHTML = "copy";
        }, 3000);
    }
    return ( 
        <footer>
            <article>
                <img src={Logo} alt="" />
                <p className="TXT-footer">simple questions game</p>
                <p className="TXT-footer">designed and developed by malik kajiji</p>
            </article>
            <article>
                <p className="TXT-footer email" onClick={handleCopy}>Contact@malikkajiji.online</p>
                <p className='copy TXT-normal'> copy </p>
                <p className="TXT-footer">for more details you can visit my</p>
                <a href="https://malikkajiji.online" target='_blank'><button className="TXT-footer">portfolio</button></a>
            </article>
        </footer>
    );
}

export default Footer;