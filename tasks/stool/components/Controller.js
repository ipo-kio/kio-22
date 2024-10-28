import React, { Component } from "react";
import "../styles/Button.css"
import "react-toggle/style.css"
import Toggle from 'react-toggle'

class Controller extends Component{

    constructor(props) {
        super(props);
        this.state = {
            transparentChecked: false,
            hR: 2
        };

        this.hR = 2
    }

    drop = () =>{
        this.props.onDrop()
    }

    dropAndShow = () => {
        this.props.onDropAndShow()
    }

    leftButton = () => {
        this.props.onLeftMoveButton()
    }

    rightButton = () => {
        this.props.onRightMoveButton()
    }

    backButton = () => {
        this.props.onBackMoveButton()
    }

    forwardButton = () => {
        this.props.onForwardMoveButton()
    }

    RestartButton = () =>{
        this.props.onRestartButton()
    }


    TransparentSwitch = e => {
        this.setState({ transparentChecked: e.target.checked });
        if(e.target.checked){
            this.props.onTransparentButtonOn()
        }
        else{
            this.props.onTransparentButtonOff()
        }
    }

    RightRotationButton = () =>{
        this.props.onRightRotationButton()
    }

    LeftRotationButton = () =>{
        this.props.onLeftRotationButton()
    }

    RotateOn01Degree = () =>{
        this.setState({hR: 0.1})
        this.hR = 0.1
        this.props.RotateOn01Degree();
    }

    RotateOn05Degree = () =>{
        this.setState({hR: 0.5})
        this.hR = 0.5
        this.props.RotateOn05Degree();
    }

    RotateOn1Degree = () =>{
        this.setState({hR: 1})
        this.hR = 1
        this.props.RotateOn1Degree()
    }

    RotateOn2Degree = () =>{
        this.setState({hR: 2})
        this.hR = 2
        this.props.RotateOn2Degree();
    }

    RotateOn5Degree = () =>{
        this.setState({hR: 5})
        this.hR = 5
        this.props.RotateOn5Degree();
    }

    RotateOn10Degree = () =>{
        this.setState({hR: 10})
        this.hR = 10
        this.props.RotateOn10Degree();
    }

    render() {
        return(
            <div>
                <input className="DropButton" type='button' onClick={this.drop} value="TEST"/>
                <input className="DropAndShowButton" type='button' onClick={this.dropAndShow} value="SLOW"/>
                <input className="LeftMoveButton" type='button' onClick={this.leftButton} value="←"/>
                <input className="RightMoveButton" type='button' onClick={this.rightButton} value="→"/>
                <input className="BackMoveButton" type='button' onClick={this.backButton} value="↑"/>
                <input className="ForwardMoveButton" type='button' onClick={this.forwardButton} value="↓"/>
                <input className="RestartButton" type='button' onClick={this.RestartButton} value="LIFT BACK"/>
                <input className="RightRotationButton" type='button' onClick={this.RightRotationButton} value="↷"/>
                <input className="LeftRotationButton" type='button' onClick={this.LeftRotationButton} value="↶"/>
                <div className="TransparentButton">
                    <Toggle
                        defaultChecked={this.state.transparentChecked}
                        icons={false}
                        className='Toggle'
                        onChange={this.TransparentSwitch} />
                </div>

                <input style = {{backgroundColor: this.state.hR === 0.1 ? '#fffff0' : ''}} className="degree01Button" type='button' onClick={this.RotateOn01Degree} value="0.1°"/>
                <input style = {{backgroundColor: this.state.hR === 0.5 ? '#fffff0' : ''}} className="degree05Button" type='button' onClick={this.RotateOn05Degree} value="0.5°"/>
                <input style = {{backgroundColor: this.state.hR === 1 ? '#fffff0' : ''}} className="degree1Button" type='button' onClick={this.RotateOn1Degree} value="1°"/>
                <input style = {{backgroundColor: this.state.hR === 2 ? '#fffff0' : ''}} className="degree2Button" type='button' onClick={this.RotateOn2Degree} value="2°"/>
                <input style = {{backgroundColor: this.state.hR === 5 ? '#fffff0' : ''}} className="degree5Button" type='button' onClick={this.RotateOn5Degree} value="5°"/>
                <input style = {{backgroundColor: this.state.hR === 10 ? '#fffff0' : ''}} className="degree10Button" type='button' onClick={this.RotateOn10Degree} value="10°"/>

            </div>
        )
    }
}

export default Controller
