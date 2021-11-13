import React, { Component } from 'react';

class Overlay extends Component {



    render() {
        const { handleClickSignUpButton, handleClickSignInButton, HandleCancelClick} = this.props;
        return (
            
            <div className="overlay-container">
            <div className="overlay">
                
                <div className="overlay-panel overlay-right">
                    <h1>Click to order</h1>
                    
                    <button
                        className="ghost form-button"
                        id="orderItem"
                        onClick={handleClickSignUpButton}
                    >Order</button>
                </div>



                <div className="overlay-panel overlay-left">
           

                    <button onChange={HandleCancelClick}
                        className="ghost form-button"
                        id="order"
                        onClick={handleClickSignInButton}
                    >Cancel</button>
                </div>


                
            </div>
        </div>
        )
    }
}

export default Overlay;

