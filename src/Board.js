import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

// first we set some default props
class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };

  // initialize state
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  // this function is creating the board, the initial state, a nested array of boolean values. a board with a certain number of rows in it. you start with an empty board [], create your rows and puch them to board. 

  // math.random gives us a value betoween 0-1. and if it is less than .25 it will be true, and we push the cell-lit into the row.
  createBoard() {
    let board = [];
    for (let y=0;  y < this.props.nrows; y++) {
      let row = []
      for( let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)

      }
      board.push(row);
    }
    return board
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // increasing or decreasing the x,y coordinate calls flipcell function, this is flipping a cell, and all 4 around it too
    flipCell(y, x);
    // flipCell(y, x - 1);
    // flipCell(y, x + 1);
    // flipCell(y - 1, x);
    // flipCell(y + 1, x);

    // after you flipcells, check everytime if every cell if off/ false this will tell us if we have won. checking every cell, in every row should be false
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board: board, hasWon: hasWon });
  }

  makeTable() {
    // this function is creating a nested array of boolean true/false values. y = horzontal axis varaible. x = the viertical/ column variable axis.
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for (let x = 0; x < this.props.ncols; x++){
        let coord = `${y}-${x}`
        row.push(
          <Cell 
            key={coord} 
            isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {/* this ternary operator is checking, is this.state.hasWon = true? if it is dispay the winner div. then if not : display board-title div and the this.makeTable function. */}
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>
        ) : (
          <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            {this.makeTable()}
          </div>
        )}
      </div>
    );
  }
}


export default Board;
