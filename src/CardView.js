import './styles/card-view.scss'

import React      from 'react'
import classnames from 'classnames'

import Card      from './Card.js'
import ImgGroup  from './ImgGroup.js'
import ImgGroup2 from './ImgGroup2.js'
import ImgGroup3 from './ImgGroup3.js'
import CheckboxContainer from './checkboxes/CheckboxContainer.js'
import checkboxes from './checkboxes/checkboxes.js'


function randomizeImageGroup(group) {
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
  cardImagesGroup: randomizeImageGroup(ImgGroup),
  checkedItems: [ checkboxes[0] ],
  cardInMotion: false,
}

export default class CardView extends React.Component {
  state = { ...initialState }

  handlClick = (imageDescriptor) => {
    setTimeout(() => {  }, 800)
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
    const checkedItems = this.state.checkedItems

    const groups = this.getGroupsByCheckedItems(checkedItems)    

    this.setState({ ...initialState, checkedItems, hiddenCards: [], cardImagesGroup: randomizeImageGroup(groups) }, () => {
      this.props.onClickCount && this.props.onClickCount(this.state.clickCounter)
    }) 
  }

  getGroupsByCheckedItems = (checkedItems) => {
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

    return groups
  }

  handleSelectionChange = (checkedItems) => {
    const groups = this.getGroupsByCheckedItems(checkedItems)

    this.setState({ ...initialState, hiddenCards: [], cardImagesGroup: randomizeImageGroup(groups), checkedItems }, () => {
      console.log(this.state)
    })
  }

  handleCardInMotion = (isMotion) => {
    this.setState({ cardInMotion: isMotion })
  }

  render() {
    const { checkedItems, cardInMotion, card1, card2 } = this.state
  
    const disabled  = cardInMotion || (card1 && card2)
    const className = classnames('card-view', { disabled })

    return (
      <div className={className} >     
        <CheckboxContainer onSelectionChange={this.handleSelectionChange} checkedItems={checkedItems} />

        <button type="button" className="btn btn-primary" onClick={this.resetAll} >Play Again</button>
        
        {/* <h1>you have clicked  {this.state.clickCounter}  times</h1> */}
        <div className="click-counter">
          <div>you have clicked</div>
          <div className="count">{this.state.clickCounter}</div>
          <div>times</div>
        </div>
  
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
                  <Card
                    image={imageDescriptor.image}
                    isOpen={isOpen}
                    onInMotion={this.handleCardInMotion}
                  />
                </div>
            )})
          }

      </div>
    )
  }
}

