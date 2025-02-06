import { Fragment, React, useState} from "react";
import { Button,Drawer} from "antd";
import { useNavigate } from "react-router-dom";
import mainImage from '../../assets/img/logo.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Headerr() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    }; 
    const onClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/')
    }
    const handleGetStart = () => {
        navigate('/account/register')
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row lgoinHead desktop">
                    <div className="col-sm-4">
                        <a href="https://thepoolnest.com/">
                            <img src={mainImage} alt="logo"/>
                        </a>
                    </div>

                    <div className="col-sm-8 headerLinks">
                        <ul>
                            <li><a href="https://thepoolnest.com/blogs/">Blogs</a></li>
                            <li><a href="https://thepoolnest.com/demo/">Demo</a></li>
                            <li><a href="https://thepoolnest.com/pricing/">Pricing</a></li>
                            <li><a href="https://thepoolnest.com/contact/">Contact</a></li>
                            <li><Button className="yellowbtn getStartedHeader" onClick={handleGetStart}>Get Started</Button></li>
                            <li><Button className="whiteButton login" onClick={handleLogin}>Login</Button></li>
                        </ul>
                    </div>
                </div>

                <div className="row lgoinHead mobile">
                    <div className="col-sm-4">

                        <GiHamburgerMenu onClick={showDrawer} style={{color: 'white', fontSize: '20px'}}/>
                    </div>
                    <div className="col-sm-8">
                        <a href="https://thepoolnest.com/">
                            <img src={mainImage} alt="logo"/>
                        </a>
                    </div>
                    <Drawer
                        title={<img src={mainImage} alt="logo" />}
                        placement='left'
                        onClose={onClose}
                        open={open}
                    >
                        <ul>
                            <li><a href="https://thepoolnest.com/blogs/">Blogs</a></li>
                            <li><a href="https://thepoolnest.com/demo/">Demo</a></li>
                            <li><a href="https://thepoolnest.com/pricing/">Pricing</a></li>
                            <li><a href="https://thepoolnest.com/contact/">Contact</a></li>
                            <li><Button className="yellowbtn getStartedHeader" onClick={handleGetStart}>Get Started</Button></li>
                            <li><Button className="whiteButton login" onClick={handleLogin}>Login</Button></li>
                        </ul>
                    </Drawer>
                </div>
            </div>
        </Fragment>
    );
}

export default Headerr;