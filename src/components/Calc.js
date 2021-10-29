import React from 'react';
import Button from './Button.js'
import './styles.css'
import {btns, BTN_ACTIONS, ops, specialKeys, nums, operations} from './buttonsConfig'

class Calc extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.specialButtons = this.specialButtons.bind(this);
        this.state = {
            memory: 0.0,
            current_val: 0.0,
            value: '0',
            current_operation: ""
        }
    }

    handleClick(item) {
        if (item.target.className === BTN_ACTIONS.ADD) {
            const value = item.target.innerText
            if (this.state.value == '0') {
                this.setState({value: item.target.value == '0' ? this.state.value : value});   
            } else {
                this.setState({value: (this.state.value + value)});
            }
        }
        if (item.target.className === BTN_ACTIONS.MEMORY) {
            if (item.target.innerText === 'M+') {
                this.setState({memory: this.state.memory + parseFloat(this.state.value)})
            } else if (item.target.innerText === 'M-') {
                this.setState({memory: this.state.memory - parseFloat(this.state.value)})
            } else {
                this.setState({value: this.state.memory.toString()})
            }
        }

        if (item.target.className === BTN_ACTIONS.OP) {
            if (this.state.current_operation != '') {
                this.setState({
                    current_val: ops[this.state.current_operation](this.state.current_val, parseFloat(this.state.value)),
                    value:'0',
                    current_operation: item.target.innerText !== 'x^y' ? item.target.innerText : '^'
                })
            } else {
                this.setState({
                    current_val: parseFloat(this.state.value),
                    value: '0',
                    current_operation: item.target.innerText !== 'x^y' ? item.target.innerText : '^'
                })
            }
        }

        if (item.target.className == BTN_ACTIONS.CALC) {
            if (this.state.current_operation != '') {
                const new_val = ops[this.state.current_operation](this.state.current_val, parseFloat(this.state.value))
                this.setState({
                    current_val: new_val,
                    value: new_val,
                    current_operation: '' 
                })
            } else {
                this.setState({current_val: parseFloat(this.state.value)})
            }
        }

        if (item.target.className === BTN_ACTIONS.DELETE) {
            if (item.target.innerText === 'clear') {
                this.setState({
                    value: '0',
                    current_val: 0.0,
                    current_operation: ''
                })
            } else {
                this.setState({
                    value: '0',
                    current_val: 0.0,
                    current_operation: '',
                    memory: 0.0
                })
            }
        }
    }

    inputChange(e) {
        
        const value = e.target.value;
        const inSymbol = value.charAt(value.length - 1);
        //TODO make autofocus on end


        if (inSymbol == '=') {
            this.handleClick({
                target: {className: BTN_ACTIONS.CALC}
            })
        } else if (operations.test(inSymbol.toString())) {
            this.setState({value: this.state.value.toString().substr(0, this.state.value.length - 1)});
            this.handleClick({
                target: {
                    className: BTN_ACTIONS.OP,
                    innerText: inSymbol.toString()
                }
            });
        } else if(!nums.test(inSymbol)) {
            this.setState({value: this.state.value.toString().substr(0, this.state.value.length - 1)});
        } else {
            this.handleClick ({
                target: {
                    className: BTN_ACTIONS.ADD,
                    innerText: inSymbol
                }
            })
            //this.setState({value: value});
        }
    }

    specialButtons(e) {
        const key = e.key;
        if (key === 'Enter') {
            e.preventDefault();
            this.handleClick({
                target: {className: BTN_ACTIONS.CALC}
            })
        }
        if (key == 'Backspace') {
            e.preventDefault()
            this.setState({value: this.state.value.length == 1 ? '0' : this.state.value.toString().substr(0, this.state.value.length - 1)});
        }
        if (!specialKeys.includes(key) && !operations.test(key) && !nums.test(key)) {
            e.preventDefault()
        }
    }

    render(){

        return(
            <div className='calc'>
                <output value={this.state.current_val + this.state.current_operation}>
                    {this.state.current_val + this.state.current_operation}
                </output>
                <br/>
                <input value={this.state.value} onKeyDown={this.specialButtons} onChange={this.inputChange}/>
                <div className='wrapper'>
                    {
                        btns.map((item, index) => (
                            <Button
                            key={index}
                            type={item.action} 
                            symbol={item.display}
                            onClick={(item) => this.handleClick(item)}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Calc