import './styles/card.scss'

import React      from 'react'
import PropTypes  from 'prop-types'
import classnames from 'classnames'

import bground from './images/bg.jpg'

const TRANSITION_DELAY = 200

export default class Card extends React.Component {
    static propTypes = {
        onInMotion: PropTypes.func.isRequired,
    }

    state = {
        turning:     false,
        turningBack: false,
        turned:      false,
        urlImage:    bground,
    }

    componentDidUpdate(prevProps){
        if (prevProps.isOpen !== this.props.isOpen){
            this.toggleTurn()
        }
    }

    toggleTurn = () => {
        this.props.onInMotion(true)

        if (this.state.turned) {
            this.setState({
                turned:  false,
                turning: true,
            })
    
            setTimeout(() => {
                this.setState({ urlImage: bground, turned:  false, })
            }, TRANSITION_DELAY)
            setTimeout(() => {
                this.setState({ turningBack: true, turning: false,})
            }, TRANSITION_DELAY)
            setTimeout(() => {
                this.setState({ turningBack: false }, () => {
                    this.props.onInMotion(false)
                })
            }, 800)
        } else {
            this.setState({
                turning: true,
            })

            setTimeout(() => {
                this.setState({ urlImage: this.props.image, turned: true, turning: false }, () => {
                    this.props.onInMotion(false)
                })
            }, TRANSITION_DELAY)
        }
    }

    render() {
        const { turning, turned, turningBack, urlImage } = this.state

        const cardClass  = classnames('card-content', { turning, turned, turningBack })

        return (
            <div className="cardx">
                <div className={cardClass}>
                    <img className="card-image" src={urlImage} />
                </div>
            </div>
        )
    }
}