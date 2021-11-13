import React, {Component} from 'react';
import './App.css';
import OrderItem from './OrderItem';
import Order from './Order';
import Overlay from './Overlay';


class App extends Component {
    constructor() {
       
        super();
        this.state = {
            rightPanelActive: false,
        }
    }

    handleClickSignUpButton = () => this.setState({
        rightPanelActive: true,
    });

    handleClickSignInButton = () => this.setState({
        rightPanelActive: false,
    });

   HandleCancelClick = () => this.setState( { 
         rightPanelActive: false,
   });

    render() {
        const { handleClickSignUpButton, handleClickSignInButton } = this;
        const { rightPanelActive } = this.state;
        return (
            <div className="App">
                <div
                    className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
                    id="container"
                >
<OrderItem/>
                    <Order />
                    
                    <Overlay
                        handleClickSignInButton={handleClickSignInButton}
                        handleClickSignUpButton={handleClickSignUpButton}
                    />
                </div>
            </div>
        );
    }
}

export default App;