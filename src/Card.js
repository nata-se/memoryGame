import React from 'react';

import bground from './images/bg.jpg'
import './Card.scss';

export default class Card extends React.Component {
    state = {
        turning: false,

    }

    onclickturn = (event) => {
        event.preventDefault()

        this.setState({
            turning: true,
          })
        }
       


    }

    render() {
        const  turningnow = this.turning ? 'turning' : ' '
        return (
            <a href="#" onClick={this.onclickturn} >
                <div className="card {turningnow}">
                
                </div> 
            </a>
        )
    }
}