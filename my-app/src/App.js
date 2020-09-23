import React from "react";
import Snake from './components/Snake';
import "./App.css";
import Food from './components/Food';

//cordenadas
const Coordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

//inicio
const initialState = {
  food: Coordinates(),
  speed: 300,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

class App extends React.Component {

  state = initialState;
  

  componentDidMount(){
    setInterval(this.moveSnake, this.state.speed); //seteamos un intervalo para el movimiento de la serpiente
    document.onkeydown = this.onKeyDown; //recogemos la tecla presionada
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders(); //salir del area
    this.checkIfCollapsed(); //serpiente golpeada
    this.checkIfEat(); //comer
  }

  onKeyDown = (e) => {
    e = e || window.event;//cogemos la tecla que pulsamos comprobamos que no presionemos al sentido contrario 
                        //para no perder automaticamente cuando damos a la flecha contraria

  //flecha arriba
  if (e.keyCode === 38 && this.state.direction !== 'DOWN') {
    this.setState({ direction: 'UP' }); 
//flecha abajo
  } else if (e.keyCode === 40 && this.state.direction !== 'UP') {
    this.setState({ direction: 'DOWN' }); 
//flecha izquierda
  } else if (e.keyCode === 37 && this.state.direction !== 'RIGHT') {
    this.setState({ direction: 'LEFT' }); 
//flecha derecha
  } else if (e.keyCode === 39 && this.state.direction !== 'LEFT') {
    this.setState({ direction: 'RIGHT' }); 
  }
  
  }

  moveSnake = () => {
    //guardar los puntitos del cuerpo de la serpiente
    let dots = [...this.state.snakeDots];
    //cabeza de la serpiente (array length -1 que equivale al último elemento)
    let head = dots[dots.length - 1];

//switch de sleccion de movimiento segun la dirección, el primer array de cabeza contiene el valor x y el segundo el valor de y
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]; //para ir a la derecha aumentamos x
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]; //para ir a la izquierda disminuimos x
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]; //para ir abajo aumentamos y
        break;
      case 'UP':
        head = [head[0], head[1] - 2]; //para ir arriba disminuimos y
        break;

        default:break;
    }
    dots.push(head); //metemos el nuevo valor en el array para la cabeza para indicar el movimiento
    dots.shift();//eliminamos el primer elemento del array (la cola de la serpiente)
    this.setState({
      snakeDots: dots
    })
  }


//funcion para comprobar si se sale del area la serpiente
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

//funcion que comprueba si la serpiente se ha golpeado a si misma
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      //comprobamos si la serpiente se golpea a si misma en cada uno de sus puntos
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

//funcion de comer
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({  //actualizamos la posicion de la fruta antes de aumentar el tamaño de la serpiente, si no se crea un bucle infinito
        food: Coordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  } 
//alargar la serpiente
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

//aumentar la velociadad
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }


  render(){
  return (
    <div className="game-area">
      <Snake  snakeDots={this.state.snakeDots}/>
      <Food dot={this.state.food} />
   </div>
  );
 }
}

export default App;