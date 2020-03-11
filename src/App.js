import React from 'react'
import './styles/App.scss'

import classnames from 'classnames'
import CardView from './CardView.js'



export default class App extends React.Component{

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <div> 
          <CardView onClickCount={this.handleClickCount} />
        </div> 
      </div>
    )
  }
}