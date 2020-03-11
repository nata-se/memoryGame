import './styles/checkbox-container.scss'


import React from 'react'

import checkboxes from './checkboxes.js'


 class CheckboxContainer extends React.Component {
    state = {
        checkedItems:  [],
    }
 
    handleChange = (e) => {
        if (e.target.checked) {
            const value = checkboxes.find((checkbox) => {
                return checkbox.key === e.target.name
            })
    
            const checkedItems = this.state.checkedItems.slice()
            checkedItems.push(value)
    
            this.setState({ checkedItems })
            this.props.onSelectionChange(checkedItems)
        } else {
            const checkedItems = this.state.checkedItems.filter((checkbox) => {
                return checkbox.key !== e.target.name
            })

            this.setState({ checkedItems })
            this.props.onSelectionChange(checkedItems)
        }
    }

    render(){
        const { checkedItems } = this.state

        return (
            <div className="checkbox-container">
            {
                checkboxes.map((item) => {
                    const isChecked = checkedItems.includes(item) 

                    return <label key={item.key}>
                        { item.label }

                        <input
                            name={item.key}
                            type="checkbox"
                            checked={isChecked}
                            onChange={this.handleChange}
                        />
                    </label>
                })
            }
            </div>
        )
    }

 }
 export default CheckboxContainer;

 
//  class Foo {
//      bar() {
//          console.log(this)
//      }
//  }

//  const foo = new Foo()
//  foo.bar()

// const bar = foo.bar
// bar() this is undefined