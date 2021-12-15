import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
        }
    }

    render() {
        return(
            <button onClick={this.props.onClick}>
                {this.props.symbol}
            </button>
        )
    }
}

export default Button