import React from 'react';
import Button from './Button.js'
import './styles.css'
import {btns, BTN_ACTIONS, ops, specialKeys, nums, operations} from './buttonsConfig'

class Calc extends React.Component {
    
    
    state = {
        memory: 0.0,
        currentVal: 0.0,
        value: '0',
        currentOperation: ""
    }
    

    handleClick = (item, btnType) => {
        console.log("we're handling click")
        console.log(btnType)
        if (btnType === BTN_ACTIONS.ADD) {
            const value = item.target.innerText
            if (this.state.value === '0') {
                this.setState({value: item.target.value === '0' ? this.state.value : value});
            } else {
                this.setState({value: (this.state.value + value)});
            }
        }
        if (btnType === BTN_ACTIONS.MEMORY) {
            if (item.target.innerText === 'M+') {
                this.setState({memory: this.state.memory + parseFloat(this.state.value)})
            } else if (item.target.innerText === 'M-') {
                this.setState({memory: this.state.memory - parseFloat(this.state.value)})
            } else {
                this.setState({value: this.state.memory.toString()})
            }
        }

        if (btnType === BTN_ACTIONS.OP) {
            if (this.state.currentOperation !== '') {
                this.setState({
                    currentVal: ops[this.state.currentOperation](this.state.currentVal, parseFloat(this.state.value)),
                    value:'0',
                    currentOperation: item.target.innerText !== 'x^y' ? item.target.innerText : '^'
                })
            } else {
                this.setState({
                    currentVal: parseFloat(this.state.value),
                    value: '0',
                    currentOperation: item.target.innerText !== 'x^y' ? item.target.innerText : '^'
                })
            }
        }

        if (btnType === BTN_ACTIONS.CALC) {
            if (this.state.currentOperation !== '') {
                const newVal = ops[this.state.currentOperation](this.state.currentVal, parseFloat(this.state.value))
                this.setState({
                    currentVal: newVal,
                    value: newVal,
                    currentOperation: '' 
                })
            } else {
                this.setState({currentVal: parseFloat(this.state.value)})
            }
        }

        if (btnType === BTN_ACTIONS.DELETE) {
            if (item.target.innerText === 'clear') {
                this.setState({
                    value: '0',
                    currentVal: 0.0,
                    currentOperation: ''
                })
            } else {
                this.setState({
                    value: '0',
                    currentVal: 0.0,
                    currentOperation: '',
                    memory: 0.0
                })
            }
        }
    }

    inputChange = (e) => {
        
        const value = e.target.value;
        const inSymbol = value.charAt(value.length - 1);
        //TODO make autofocus on end

        console.log("we're in inputChange")

        if (inSymbol === '=') {
            this.handleClick({
                target: {id: BTN_ACTIONS.CALC}
            }, BTN_ACTIONS.CALC)
        } else if (operations.test(inSymbol.toString())) {
            this.setState({value: this.state.value.toString().substr(0, this.state.value.length - 1)});
            this.handleClick({
                target: {
                    id: BTN_ACTIONS.OP,
                    innerText: inSymbol.toString()
                }
            }, BTN_ACTIONS.OP);
        } else if(!nums.test(inSymbol)) {
            this.setState({value: this.state.value.toString().substr(0, this.state.value.length - 1)});
        } else {
            this.handleClick ({
                target: {
                    id: BTN_ACTIONS.ADD,
                    innerText: inSymbol
                }
            }, BTN_ACTIONS.ADD)
            //this.setState({value: value});
        }
    }

    specialButtons = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            e.preventDefault();
            this.handleClick({
                target: {id: BTN_ACTIONS.CALC}
            }, BTN_ACTIONS.CALC)
        }
        if (key === 'Backspace') {
            e.preventDefault()
            this.setState({value: this.state.value.length === 1 ? '0' : this.state.value.toString().substr(0, this.state.value.length - 1)});
        }
        if (!specialKeys.includes(key) && !operations.test(key) && !nums.test(key)) {
            e.preventDefault()
        }
    }

    render(){

        return(
            <div id='calc'>
                <output value={this.state.currentVal + this.state.currentOperation}>
                    {this.state.currentVal + this.state.currentOperation}
                </output>
                <br/>
                <input value={this.state.value} onKeyDown={this.specialButtons} onChange={this.inputChange}/>
                <div className='wrapper'>
                    {
                        btns.map((item, index) => (
                            <Button
                            key={index}
                             
                            symbol={item.display}
                            onClick={(i) => this.handleClick(i, item.action)}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Calc