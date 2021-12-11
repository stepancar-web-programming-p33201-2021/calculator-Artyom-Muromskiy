import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
        }
    }

    render() {
        const type = this.state.type
        return(
            <button className={this.props.type} onClick={this.props.onClick}>
                {this.props.symbol}
            </button>
        )
    }
}

export default Button