import React from "react";





function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });

    } 

    
    render() {
       
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
    //   let squaress = document.querySelectorAll(".square")
      let status;
      console.log(current.squares.innerText !== "")
    //   squaress.forEach(() => {
          
    //     if(!winner && current.squares.innerText !== ""){  
    //         alert("beraber")
    //     }
    // });
      if (winner) {
        setTimeout(() => {
            alert('Winner: ' + winner)
            document.querySelector(".game-board").style.display="none";
            document.querySelector(".game").style.marginLeft="0"
            document.querySelector(".text").style.marginRight="0"
            document.querySelector(".gs").style.display="flex"
           }, 500);

       status= 'Winner: ' + winner
       document.querySelector(".gs").addEventListener('click',()=>{
        window.location.reload();
       })

      }
      else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

          

      
  
      return (
        
  <>
  <div className="bg">
        <div className="lg">  
  <h1 className='text'>React- Tic Tac Toe</h1>
  <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
          
        </div>
        <button className="gs">Game Restart</button>
        </div>
  </div>
  </>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  export default Game;