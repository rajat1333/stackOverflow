import React, {Component, useEffect} from 'react';
import {Nav,NavBarLogoImage,NavbarSearch,NavbarLink,NavMenu,NavButton,NavButtonLink,SearchInput,SearchHelp,Top,Bottom,ColumnOne,ColumnTwo} from './NavbarElements';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {check:false}
        // window.addEventListener('click',(e)=>this.hideComponent(e));  
    }

    hideComponent(e){
        if(this.state.check===true){
            this.setState({check:false})
        }

    }
    render(){
        let loggedInDiv = null;
        let loggedOutDiv = null;
        if (localStorage.getItem("token")) {
            loggedOutDiv = 
            <NavButton>
            <NavButtonLink to="/logout">Logout</NavButtonLink>
        </NavButton>
            ;
        } else {
            loggedOutDiv = (
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <NavButton>
                        <NavButtonLink to="/login">Login</NavButtonLink>
                    </NavButton>
                    <NavButton>
                        <NavButtonLink to="/register">Register</NavButtonLink>
                    </NavButton>
                </div>
            );
        }
    return (
        <Nav>
            <NavbarLink to='/'>
                <NavBarLogoImage src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"></NavBarLogoImage>
            </NavbarLink>
            <NavMenu>
                <NavbarLink to='/profile'>Profile</NavbarLink>
                <NavbarLink to='/messages'>My Messages</NavbarLink>
            </NavMenu>
            <NavbarSearch onClick={(e)=>this.setState(prevState=>({check: !prevState.check}))}>
                <SearchInput></SearchInput>
                {this.state.check? <SearchHelp>
                    <Top>
                        <ColumnOne>
                        <p>[tag] search within a tag</p>
                        <p>user: 1234 search by author</p>
                        <p>"Words here" exact phrase</p>
                        <p>collective:"Name" collective content</p>
                        </ColumnOne>    
                        <ColumnTwo>
                        <p>answers: 0 unanswered questions</p>
                        <p>score: 3 posts with a 3+ score</p>
                        <p>is: question type of post</p>
                        <p>isaccepted:yes search within status</p>
                        </ColumnTwo>
                    </Top>
                    <Bottom>
                        <NavButton>
                            <NavButtonLink to="/ask">Ask a Question</NavButtonLink>
                        </NavButton>
                    </Bottom>
                </SearchHelp> : ""}
            </NavbarSearch>
            {loggedInDiv}
            {loggedOutDiv}
        </Nav>
        )
    }
}

export default Navbar;