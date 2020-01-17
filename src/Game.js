import React, {Component} from 'react';
import Cells from './Cells';
import Keys from './Keys';
import {START, BODY, KEYS, COLS, ROWS, FOOD, DIRS} from './const';
import './style.css';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            board: [],
            snake: [],
            direction: null,
            gameOver: false
        }

        this.start = this.start.bind(this);
        this.frame = this.frame.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidMount(){
        this.start()
    }


    start(){
        const board = [];
        const snake = [START];
        board[START] = BODY;

        this.setState({
            board,
            snake,
            direction: KEYS.right
        }, this.frame());
    }

    frame() {
        let { snake, board, direction} = this.state;
        //wyznaczamy pozycję głowy snake i kierunek
        //głowa to jest pierwsza pozycja w tablicy snake (snake[0])
        const head = this.getNextIndex(snake[0], direction)

        const food = board[head] === FOOD || snake.length === 1;

        if(snake.indexOf(head) !== -1){
            this.setState({
                gameOver: true
            })
             return alert("GameOver");
        }

        if(food){
            const maxCeels = ROWS * COLS 

            let i;

            do {
                i = Math.floor(Math.random() * maxCeels)
            }while(board[i])
            board[i] = FOOD;

        } else {
                   //Usówamy ostatni element z tablicy board i generujemy nową tablicę metodą pop
        board[snake.pop()] = null;
        }

        //Przypisujemy nową pozycję głowy snake
        board[head] = BODY;

        //dodajemy nową pozycję do snake, unshift dodaje nową pozycjęna początek tablicy
        snake.unshift(head);

        if(this.nextDirection){
            direction = this.nextDirection;
            this.nextDirection = null;
        }
 

        this.setState({
            board,
            snake,
            direction
        }, () => {
            setTimeout(this.frame, 200)
        })

    }

    handleKey = (e) => {
        const direction = e.nativeEvent.keyCode;
        const diff = Math.abs(this.state.direction - direction)

        if(DIRS[direction] && diff !== 0 && diff !== 2){
            this.nextDirection = direction;
        }
    }

    handleButton = () => {
        document.querySelector('.up').addEventListener('click', () => {
            console.log("up")
            this.nextDirection = KEYS.up
            
        })

        document.querySelector('.left').addEventListener('click', () => {
            console.log("left")
            this.nextDirection = KEYS.left
        })

        document.querySelector('.right').addEventListener('click', () => {
            console.log("right")
            this.nextDirection = KEYS.right
        })

        document.querySelector('.down').addEventListener('click', () => {
            console.log("down")
            this.nextDirection = KEYS.down
        })

        

    }

    
    getNextIndex(head, direction){
        let x = head % COLS;
        let y = Math.floor(head / COLS);

        switch (direction){
            case KEYS.up: y = y <= 0 ? ROWS -1 : y - 1; break;
            case KEYS.down: y = y >= ROWS ? 0 : y + 1; break;
            case KEYS.left: x = x <= 0 ? COLS -1 : x -1; break;
            case KEYS.right: x = x >= COLS -1 ? 0 : x + 1; break;
            default: return;
        }
        return (COLS * y) + x;
    }

    render() {
        const {board} = this.state
        return (
            <>
        <Cells 
        handleKey={this.handleKey}
        board={board} 
       />
        <Keys 
            handleButton={this.handleButton}
        />
        
        </>
    )
  }
}

export default Game; 