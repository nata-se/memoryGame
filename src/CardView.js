import './styles/card-view.scss'

import React      from 'react'
import classnames from 'classnames'

import Card      from './Card.js'
import ImgGroup  from './ImgGroup.js'
import ImgGroup2 from './ImgGroup2.js'
import ImgGroup3 from './ImgGroup3.js'
import CheckboxContainer from './checkboxes/CheckboxContainer.js'



function getCardImageGroup(group) {
  return group.sort(() => {
    return Math.random() > .5
      ? 1
      : -1
  })
}


const initialState = {
  card1: null,
  card2: null,
  hiddenCards:[],
  clickCounter: 0,
  cardImagesGroup: getCardImageGroup(ImgGroup),
}



export default class CardView extends React.Component {
  state = { ...initialState }

 

  handlClick = (imageDescriptor) => {
    this.setState({ clickCounter: ++this.state.clickCounter }, () => {
      this.props.onClickCount && this.props.onClickCount(this.state.clickCounter)
    })

    if (imageDescriptor === this.state.card1 || imageDescriptor === this.state.card2) {
      return
    }

    if (this.state.card1 && this.state.card2) {
      return
    }

    if (!this.state.card1) {
      this.setState({ card1: imageDescriptor }, this.checkTwoOpenCards)
    } else {
      this.setState({ card2: imageDescriptor }, this.checkTwoOpenCards)
    }    
  }

  checkTwoOpenCards = () => {
    if (this.state.card1 && this.state.card2){
      if (this.state.card1.compareId === this.state.card2.compareId){
        setTimeout(() => {
          const hiddenCards = this.state.hiddenCards
          hiddenCards.push(this.state.card1)
          hiddenCards.push(this.state.card2)
          this.setState({ hiddenCards, card1: null, card2: null })
        }, 3000)
       

      } else {
        setTimeout(() =>{
          this.setState({ card1: null, card2: null})
        }, 2000)
      }
    }
  }

  resetAll = () => {
    this.setState({ ...initialState, hiddenCards: [], cardImagesGroup: getCardImageGroup() }, () => {
      this.props.onClickCount && this.props.onClickCount(this.state.clickCounter)
    }) 
  }

  handleSelectionChange = (checkedItems) => {
    console.log(checkedItems)

    let groups = []

    for (let i=0; i<checkedItems.length; i++) {
      if (checkedItems[i].key === 'toys1') {
        groups = groups.concat(ImgGroup)
      } else if (checkedItems[i].key === 'toys2') {
        groups = groups.concat(ImgGroup2)
      } else if (checkedItems[i].key === 'letters') {
        groups = groups.concat(ImgGroup3)
      }
    }

    this.setState({ ...initialState, hiddenCards: [], cardImagesGroup: getCardImageGroup(groups) }, () => {
      console.log(this.state)
    })
  }

  render() {
    return (
      <div className="card-view" >     
        <CheckboxContainer onSelectionChange={this.handleSelectionChange} myProps={2} />

        <button onClick={this.resetAll}>Play Againe</button>
        
        <h1>you have clicked  {this.state.clickCounter}  times</h1>
  
          {
            this.state.cardImagesGroup.map((imageDescriptor) => {
              const onClick = () => {
                this.handlClick(imageDescriptor)
              }

              const isOpen = imageDescriptor === this.state.card1 || imageDescriptor === this.state.card2

              const hidden = this.state.hiddenCards.includes(imageDescriptor)

              const className = classnames('card-content', { hidden, open: isOpen })

              return (
              <div className={className} key={imageDescriptor.id} onClick={onClick}>
                <Card image={imageDescriptor.image} isOpen={isOpen}/>
              </div>
            )})
          }

      </div>
    )
  }
}

