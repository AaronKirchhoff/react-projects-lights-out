import React, {Component} from 'react'
import "./Cell.css"

// create a child, stateless "dumb" component. all the logic, keeping track of state is in the parent/ larger component, board
class Cell extends Component {
  constructor(props) {
    super(props);
    // always bind the method so when we use This we know what it is referring to.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe();
  }

  render() {
    // isLit is a prop name you can make either true or false. this ternary operator is asking, hey, we have a "cell" that is either true and cell-lit, which will follow its css styling, or its false : and be default styling. 
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    // the className below is dynamic meaning it will change depending on certain factors. classes = either it is cell-lit or nothing.
    return (
        <td className={classes} onClick={this.handleClick} />
    )
  }
}


export default Cell