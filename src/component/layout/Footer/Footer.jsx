import React from 'react'
import playstore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <>
    <footer className="footer">
<div className="leftFooter">
    <h4>DOWNLOAD OUR APP</h4>
    <p>Download App for Android and IOS mobile phone</p>
    <img src={playstore} alt="playstore" />
    <img src={appStore} alt="Appstore" />
</div>
<div className="midFooter">
    <h1>ECOMMERCE</h1>
    <p>High Quality is our first priority</p>

    <p>Copyrights 2021 &copy; Team</p>
</div>

<div className="rightFooter">
<h4>Follow Us</h4>
<a href="https://instagram.com/">Instagram</a>
<a href="https://youtube.com/">youtube</a>
<a href="https://facebook.com/">Facebook</a>

</div>


    </footer>
    
    
    </>
  );
};

export default Footer