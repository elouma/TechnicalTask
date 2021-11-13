import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

class OrderItem extends Component {
    constructor(props){
        super(props)

        this.state={
            isLoading: false,
            
            formData:{
                OrderReqAmt:'',
                Chicago: '0',
                Cincinatti: '0',
                StLouis: '0'
            }, 
            result:""
        };
       
    }
 
handleChange =(event)=>{
const value =event.target.value;
const name = event.target.name;
var formData = this.state.formData;
formData[name]=value
this.setState({formData});

}

handleLocation =(event)=>{
    
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name]= '1';
    this.setState({formData});
    
    }

    handlePredictClick =(event) =>{
     const formData = this.state.formData;
     console.log('formData', formData);
     this.setState({isLoading:true}); 
 fetch('http://127.0.0.1:5000/prediction/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  // console.log('response', response)
  .then(response => {
    this.setState({
      result: response.result,
      isLoading: false
    });
  });
 }

 handleCancelClick = (event) => {
  this.setState({ result: "" });
 }

    render() {
    const isLoading =this.state.isLoading;
    const formData = this.state.formData;
    const result =this.state.result;
    console.log('State:',this.state);
     console.log('result:', result)
     
        return (
            <div className="form-container order-item-container">
                <form className="form" action="#">
                    <h1 className="form-title">Order Item </h1>
                    <input placeholder="Enter amount" 
                    value={formData.OrderReqAmt}  name="OrderReqAmt" onChange={this.handleChange}/>  
                    <div className ="mylabel">
               <input type="checkbox" className="custom-control-input" id="customCheck1"  value={formData.Chicago} name= "Chicago" onChange={this.handleLocation} />
               <div className="slidinggroove"></div>
                 <label className="mylabel" htmlFor="customCheck1" ><p className="labelterm">Chicago </p></label>
            </div>

            <div className ="mylabel">
               <input type="checkbox" className="custom-control-input" id="customCheck2" value={formData.Cincinatti} name ="Cincinatti" onChange={this.handleLocation} />
               <div className="slidinggroove"></div>
                 <label className="mylabel" htmlFor="customCheck2" 
                 ><p className="labelterm">Cincinatti </p></label>
            </div>

            <div className ="mylabel">
               <input type="checkbox" className="custom-control-input" id="customCheck3" value={formData.StLouis} name ="StLouis" onChange={this.handleLocation} />
               <div className="slidinggroove"></div>
                 <label className="mylabel" htmlFor="customCheck3" ><p className="labelterm">St Louis </p></label>
            </div>

                    <button className="form-button" disabled= {isLoading}
                    onClick ={!isLoading? this.handlePredictClick:null}>submit</button>
                    {isLoading ?'': ''}
                </form>

                {result === "" ? null :
        <Row>
          <Col className="result-container">
            <h5 id="result">{result}</h5>
          </Col>
        </Row>
      }
            </div>
        );
    }
}

export default OrderItem;