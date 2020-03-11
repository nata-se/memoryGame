import React from 'react';
import classnames from 'classnames'

import bground from './images/bg.jpg'
import './styles/Card.scss';

export default class Card extends React.Component {
    state = {
        turning:  false,
        turningBack:  false,
        turned:   false,
        urlImage: bground,
    }

    componentDidUpdate(prevProps){
        if (prevProps.isOpen !== this.props.isOpen){
            this.toggleTurn()
        }
        
    }

    toggleTurn = () => {
        // let image = `./images/game1/cat.jpg`        

        if (this.state.turned) {
            this.setState({
                turned:  false,
                turning: true,
            })
    
            setTimeout(() => {
                this.setState({ urlImage: bground, turned:  false, })
            }, 1000)
            setTimeout(() => {
                this.setState({ turningBack: true, turning: false,})
            }, 1000)
            setTimeout(() => {
                this.setState({ turningBack: false,})
            }, 1000)
            
        } else {
            this.setState({
                turning: true,
            })

            setTimeout(() => {
                this.setState({ urlImage: this.props.image, turned: true, turning: false, })            
            }, 1000)    
        }

      
    }

   

    render() {
        const { turning, turned, turningBack, urlImage  } = this.state

        const cardClass = classnames('card-content', { turning, turned, turningBack })

        return (
            <div className="card">
                <img className={cardClass}  src={urlImage}>
                </img>
            </div>
        )
    }
}