import React, { Component } from 'react';
import grocery from './img/grocery.jpg';
import './css/animate.css';
import 'reactstrap';
import logo from './favicon/favicon.png';
import groceryIcon from './img/groceryIcon.png';
import foodwaste from './img/foodwaste.png';
import connect from './img/connect.png';
import foodInsecurity from './img/food-insecurity-percent.png';
import homelessfood from './img/homelessfood.jpg';
import numberOne from './img/number-one.png';
import numberTwo from './img/number-two.png';
import numberThree from './img/number-three.png';
import numberFour from './img/number-four.png';
import data from './make-data/bank_words.json';
import convertWords from './utils/convertWords';
import Fade from 'react-reveal/Fade';
import ScrollAnimation from 'react-animate-on-scroll';
import MapApp from './MapApp.js';
import SignInApp from './SignInApp';
import SignUpapp from './SignUpApp';
import UserBankInfoPage from './UserBankInfoPage';
import firebase from 'firebase/app';


import {Route, Link, Switch, Redirect} from 'react-router-dom'
import WelcomeHeader from './components/WelcomeHeader';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {bankNames: [], loading: true}
    }

    componentWillMount() {
        this.banksRef = firebase.database().ref('banks');
        this.banksRef.on('value', (snapshot) => {
            //this.setState({bankNames: snapshot.val(), loading: false});
            console.log(snapshot.val());
            this.setState({bankNames: snapshot.val(), loading: false});
        })

        // let banksKeys = Object.keys(this.state.bankNames);
        // let bankNames = banksKeys.map((key) => {
        //     let bank = this.state.bankNames[key];
        //     bank.key = key;
        //     return bank.bankInfo.handle;
        // });
    }

    componentWillUnmount() {
        this.banksRef.off();
    }


    render() {
        if (!this.state.loading) {
            console.log(this.state.bankNames);
            return (
                <div>
                    <div>
                        <header>
                            <NavMenu />
                        </header>

                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route path='/app' render={(routerProps) => (
                                <MapApp bankNames={this.state.bankNames} />
                            )} />
                            <Route path='/signup' component={SignUpapp} />
                            <Route path='/signin' component={SignInApp} />
                            <Route path='/info/:foodBank' component={UserBankInfoPage} />
                            <Redirect to='/'/>
                        </Switch>
                    </div>

                    <footer>
                        <Footer />
                    </footer>
                    
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            )
        }
    }
}

// The homepage of our application, contains all the necessary 
// welcome, introduction, and reasons why we are making this application.
class HomePage extends Component {
    render() {
        return (
            <div>
                <main>
                    <div className="main-page">
                        <section className="welcome">
                            <Welcome />
                        </section>

                        <section className="introduction">
                            <Introduction />
                        </section>

                        <section className="foodwaste">
                            <FoodWaste />
                        </section>

                        <section className="hunger-crisis">
                            <HungerCrisis />
                        </section>

                        <section className="foodbank">
                            <FoodBankDescription />
                        </section>

                        <section id="mission">
                            <MissionStatement />
                        </section>

                        <section id="steps">
                            <Steps />
                        </section>
                    </div>
                </main>


            </div>
        );
    }
}

// Topbar nav menu, allows user to navigate via the 
// home and app buttons
class NavMenu extends Component {

    constructor(props) {
        super(props);
        this.myLinks = React.createRef();
        this.mobileMenu = this.mobileMenu.bind(this);
    }

    mobileMenu() {
        var x = this.myLinks.current;
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    render() {
        return (
            <div className="main_menu">
                <div className="topnav">
                    <a id="nav-title">
                        <span className="logo" aria-hidden="true">&nbsp;</span>
                        FoodBank Express
                    </a>
                    
                    <div id="myLinks" ref={this.myLinks}>
                        <div className="list-item">    
                            <Link to='/' id="active">Home</Link>
                        </div>

                        <div className="list-item">
                            <Link to='/app' >Find</Link>
                        </div>

                        <div className="list-item">
                            <Link to='/signup' >Sign Up</Link>
                        </div>

                        <div className="list-item">
                            <Link to='/signin' >Sign In</Link>
                        </div>

                    </div>

                    <a href="javascript:void(0);" className="icon" onClick={this.mobileMenu}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div>
        )
    }
}

//Opening title and photo
class Welcome extends Component {
    render() {
        return (
            <div>
                <div className="welcome-photo">
                    <img src={grocery} />
                </div>
                <div className="welcome-text">
                    <p>Providing Healthy Groceries</p>
                    <p>for Our Neighbors</p>
                </div>
            </div>
        ); 
    }
}

//Introduction to our app
class Introduction extends Component {
    render() {
        return (
            <div>
                    {/* Animate when the user scrolls nearby */}
                    <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={400}>
                    <div className="intro-content-container">
                        <div className="intro-logo-div">
                            <div className="intro-logo animate-box">
                                <img src={logo} alt="foodBank logo" />
                            </div>
                        </div>
                        <div className="intro-text-div">
                            <div className="intro-h1 animate-box">
                                <h1>Welcome to FoodBank Express</h1>
                            </div>

                            <div className="intro-p animate-box">
                                <p>
                                    We are FoodBank Express, an online platform that connects everyone to local foodbanks.
                                    We want you to help us make sure that everyone has access to healthy food options
                                    and fight against food waste and hunger!
                                </p>
                            </div> 
                        
                        <div className="intro-card animate-box">
                            <div className="card">
                                <img className="card-img-top" src={groceryIcon} alt="Grocery Icon" />
                                <div className="card-body">
                                    <p className="card-text">Provide Healthy Food</p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src={foodwaste} alt="food waste" />
                                <div className="card-body">
                                    <p className="card-text">Reduce Food Waste</p>
                                </div>
                            </div>
                        
                            <div className="card">
                                <img className="card-img-top" src={connect} alt="connect" />
                                <div className="card-body">
                                    <p className="card-text">Minimize Donation Gap</p>
                                </div>
                            </div> 
                        </div>
                        </div>     
                        </div>
                    </ScrollAnimation>  
            </div>
        )
    }
}

//The section on FoodWaste
class FoodWaste extends Component {
    render() {
        return (
            <div className="foodwaste-container">
            <div className="foodwaste-text-div">            
                <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={700}>
                    <div>
                        <div className="description">
                            <h1>Food Waste Problem</h1>
                            <p>Between <b><a href="https://www.usda.gov/oce/foodwaste/faqs.htm">30-55%</a></b> of all food produced globally is never eaten, and the value of 
                            this wasted food is worth over <b><a href="http://www.fao.org/save-food/resources/keyfindings/en/">1 trillion dollar</a></b>. Food waste is a massive market inefficiency.</p>
                            <p>Meanwhile, approximately <b><a href="https://www.npr.org/sections/thesalt/2013/06/06/189192870/when-you-waste-food-youre-wasting-tons-of-water-too">25%</a></b> of all fresh water consumption globally goes to the production of wasted food.
                                Not only are all the resources went into creating the uneaten food wasted, but the decomposition of food waste
                                creates massive amount of air pollution.
                            </p>
                            <p>It is easy for many people to dismiss food waste as someone else's problem as they argue that they do not waste food.
                                However, The reality is that in the developed contries, more than <b><a href="http://www.fao.org/save-food/resources/keyfindings/en/">40%</a></b> of food waste takes place in our homes.
                            </p>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
            <div className="foodwaste-card-div">    
                <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                    <div>
                        <div className="foodwaste-card">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">1/3</h3>
                                    <p className="card-text">of all food produced globally goes to waste</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">1.3 billion tons</h3>
                                    <p className="card-text">of food are thrown away without being eaten</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">The 3rd largest</h3>
                                    <p className="card-text">emitter of greenhouse gases is food waste</p>
                                </div>
                            </div>     
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
            </div>
        ) 
    }
}

//Section discussing the current HungerCrisis
class HungerCrisis extends Component {
    render() {
        return(
            <div className="hunger-container">
                <div className="hunger-text-div">
                    <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                        <div className="description">
                            <h1>Hunger Crisis</h1>    
                            <p>In addition to the world-wide food waste problem, food insecurity is a way of life for almost <b><a href="https://olioex.com/food-waste/the-problem-of-food-waste/">800 million</a></b> people.
                                That is 1 in 9 human beings on the planet who are going to bed with an empty stomach every night.
                            </p>
                            <p>In the US only, estimated <b><a href="https://www.cnn.com/2017/06/09/health/champions-for-change-child-hunger-in-america/index.html">13.1 million</a></b> children live in food insecure households.
                                Southern area has more percentage of households suffering from food insecurity. In some are, the percentage of households do not 
                                have food security is as high as 20%.
                            </p>
                        </div>
                    </ScrollAnimation>
                </div>
                <div className="hunger-img-div">
                    <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                        <div className="hunger-img">
                            <img src={foodInsecurity} alt="food insecurity percentage"/>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>    
        )
    }
}

//Section describing what FoodBanks are
class FoodBankDescription extends Component {
    render() {
        return (
            <div className="foodbank-container">
            <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                <div className="description">
                    <h1>Food Banks</h1>
                    <p>Food banks are at the forefront of the day-to-day fight against food waste. For more than 30 years, European food banks have
                        provided, and continue to provide, solutions to solve poverty, hunger and food waste challenges. 
                    </p>
                    <p>Food banks collect edible food from companies, including manufacturers, retailers, as well as individuals. The food is then stored and sorted 
                        to prepare nutritionally balanced mean packages. 
                    </p>
                    <p>Thanks to food donations, a large quantity of edible food that would have gone to a landfill, creating emissions
                        and wasting water and energy, is now being consumed by thoes most in need. 
                    </p>
                    <p>However, many local food banks are experiencing low volume of donations. And food donations, in general, have been 
                        declining. One of the primary sources of food donation has gone down over the year. Food donations that come in 
                        via the postal service have been on the decline. Local food banks in Washington State cannot keep up the demand.
                    </p>
                </div>
            </ScrollAnimation>
            </div>
        )
    }
}

//The mission statement of FoodBank express
class MissionStatement extends Component {
    render() {
        return(
            <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                <div className="mission-content">
                    <div className="mission-text-div">
                    <div className="description">
                        <h1>Our Mission</h1>
                        <p>Our mission is to help the people who want to contribute to the effort and donate surplus food, 
                            but don't know where to start. With our joint efforts, hopefully there will be less children going to bed with an empty stomach.</p>
                        <p>FoodBank Express will inform you which nearby local food banks have demand for what kinds of food. 
                            And we will let you know how you can easily donate your extra food based on your location and time constraints.</p>
                    </div>
                    <div className="app-button">
                        <Link to='/app' className="learnMore-button" >Learn More</Link>
                    </div>
                    </div>
                    <div className="mission-img">
                        <img src={homelessfood} alt="people eating food" />
                    </div> 
                </div>
            </ScrollAnimation>
        )
    }
}

//Steps of the FoodBank express application
class Steps extends Component {
    render() {
        return(
                <div className="app-page">
                    <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                        <section className="introduction"> 
                            <div className="intro-logo">
                                <img src={numberOne} alt="number one" />
                            </div>
                            <div className="intro-content-container">
                            <div className="intro-h1">
                                <h1>Step 1:  Input Information</h1>
                            </div>
                            <div className="intro-p">
                                <p>First, you will type in all the information needed for us to look for a list of matching locations</p>
                                <p>The information include user name, zip code, type of food, expiration date, radius, methods of donation and estimated arriving date.</p>
                            </div>    
                            </div>
                        </section>
                    </ScrollAnimation>

                    <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                        <section className="introduction">    
                            <div className="intro-logo">
                                <img src={numberTwo} alt="number two" />
                            </div>
                            <div className="intro-content-container">
                            <div className="intro-h1">
                                <h1>Step 2:  Select Location</h1>
                            </div>
                            <div className="intro-p">
                                <p>After receiving your information, we will compile a list of matching food banks location accordingly. We will also provide all the information about matching locations.</p>
                                <p>Then, you can select your ideal location and method of donations.</p>
                            </div>    
                            </div>
                        </section>
                    </ScrollAnimation>

                    <ScrollAnimation animateOnce={true} animateIn="fadeIn" offset={600}>
                        <section className="introduction">    
                            <div className="intro-logo">
                                    <img src={numberThree} alt="number three" />
                                </div>
                                <div className="intro-content-container">
                                <div className="intro-h1">
                                    <h1>Step 3:  Reserve Timeslot (Coming soon)</h1>
                                </div>
                                <div className="intro-p">
                                    <p>After being selected, the food bank will receive your information about food donation.</p>
                                    <p>Then, you will receive the confirmation email and your travel information or select postal service will be sent to you.</p>
                                </div>    
                                </div>                         
                        </section>
                    </ScrollAnimation>
                    
                </div>
        )
    }
}

//final Footer of the application
class Footer extends Component {
    render() {
        return(
            <Fade>
                <div className="footer-container">
                    <div className="row">
                        <div className="about-us-container">
                            <h2>ABOUT US</h2>
                            <p>We are FoodBank Express, an online platform that connects food donors with food banks.
                            We believe in healthy food for all!</p>
                        </div>
                        <div className="contact-us-container">
                            <h2>CONTACT US</h2>
                            <address>
                                    <a href="mailto:me@here.com">contact@foodbankexpress.com</a><br/>
                                    <a href="tel:555-123-4567">(555)123-4567</a>
                            </address>
                        </div>
                    </div>
                    <div className="row-bottom">
                        <p>
                            Copyright ©2018 All rights reserved | This webpage is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by Zhuo Shan
                        </p>
                    </div>
                </div>
            </Fade>
        )
    }
}
export default App;
