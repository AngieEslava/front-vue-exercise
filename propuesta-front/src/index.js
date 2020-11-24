import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FaTimesCircle } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";

//  FaTimesCircle      
var O = <FaDotCircle />
var X = <FaTimesCircle  />
// FaDotCircle

function Cuadro (props) {//componente hijo
    return (
     
        <button id="square" onClick={props.onClick}>
          {props.value}
        </button>
    
    );
  //mostramos el numero que en tablero lleva cada cuadro
}

class Tablero extends React.Component {//componente padre

  // handleClick(i) {
  //   const squares = this.state.squares.slice();//crear copia --> inmutabilidad sin modificar el objeto sino reemplazando los datos con una nueva copia con los datos deseados// mutable cambiando los valores de sus datos, asignar valor a variable, 
    
  //   if (Ganador(squares) || squares[i]) {
  //     return;
  //   }

  //   squares[i] = this.state.x ? 'X' : 'O';
  //   this.setState({
  //     squares : squares,
  //     x : !this.state.x,
  //   });
  // }

  renderCuadro(i) {
    return (
      <Cuadro 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }//pasamos los prop con value al metodo render cuadro
  //leemos el arreglo desde el constructor de tablero ->[cambia el estado]

  render() {
    // const gana = Ganador(this.state.squares);
    // let status;
    // if (gana) {
    //   status = 'Ganador: ' + gana;
    // } else {
    //   status = 'Siguiente jugador: ' + (this.state.x ? 'X' : 'O');
    // }

    return (
      <div >
        {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderCuadro(0)}
            {this.renderCuadro(1)}
            {this.renderCuadro(2)}
          </div>
          <div className="board-row square-left">
            <div className="board-row">
              {this.renderCuadro(3)}
              {this.renderCuadro(4)}
              {this.renderCuadro(5)}
            </div>
          </div>
          <div className="board-row square-left">
            <div className="board-row">
              {this.renderCuadro(6)}
              {this.renderCuadro(7)}
              {this.renderCuadro(8)}
            </div>
          </div>
      </div>
    );
  }
}

class Juego extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      historial: [
        {
          squares: Array(9).fill(null)
      }
    ],
      stepNumber: 0,
      x:true
    };
  }

  handleClick(i) {
    const historial = this.state.historial.slice(0, this.state.stepNumber + 1);
    const estadoActual = historial[historial.length - 1];
    const squares = estadoActual.squares.slice();//crear copia --> inmutabilidad sin modificar el objeto sino reemplazando los datos con una nueva copia con los datos deseados// mutable cambiando los valores de sus datos, asignar valor a variable, 
    
    if (Ganador(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.x ? 'X' : 'O';
    this.setState({
      historial: historial.concat([{
        squares: squares
      }]),
      stepNumber : historial.length,
      x: !this.state.x,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber:step,
      x: (step % 2) === 0
    });
  }

  render() {
    const historial = this.state.historial;
    const estadoActual = historial[this.state.stepNumber];
    const gana = Ganador(estadoActual.squares);
    
    const movimientos = historial.map((step, movimiento) => {
      const lista = movimiento ?
        'Ir al movimiento : ' + movimiento : 
        'Reiniciar el juego';
      return (
        <li key={movimiento}>
          <button onClick={() => this.jumpTo(movimiento)}>{ lista }</button>
        </li>
      );
    });

    let status;
    if (gana) {
      status = 'Ganador: ' + gana;
    } else {
      status = 'Siguiente jugador: ' + (this.state.x ? 'X' : 'O' );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Tablero 
            squares = {estadoActual.squares}
            onClick = {i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ movimientos }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Juego />,
  document.getElementById('root')
);

function Ganador (squares) {
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
    const [ a, b, c] = lines[i];
    if (squares[a] && squares[a]  === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


