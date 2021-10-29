import React from 'react';
import Button from './Button.js'
import './styles.css'
import {btns, BTN_ACTIONS, ops} from './buttonsConfig'

class Calc extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            memory: 0.0,
            current_val: 0.0,
            value: '0',
            current_operation: ""
        }
    }

    inputChange(e){
        this.setState({value: e.target.value})
    }

    handleClick(item)   {
        if (item.target.className === BTN_ACTIONS.ADD) {
            const value = item.target.innerText
            if (this.state.value === '0') {
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

    render(){

        return(
            <div className='calc'>
                <output value={this.state.current_val + this.state.current_operation}>
                    {this.state.current_val + this.state.current_operation}
                </output>
                <br/>
                <input value={this.state.value} onChange={this.inputChange}/>
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