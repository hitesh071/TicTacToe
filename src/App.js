import './App.css';
import React from 'react';

function App() {
  return (
    <div >
      <Header/>
      <Grid/>
      
    </div>
    
  )
}
const Header = ()=>{
  return (<div style={{background:'#f34d4d'}}>
    <h1>Tic Tac Toe</h1>
  </div>)
}

const Grid = () => {
  const [turn,setTurn] = React.useState('X');
  const [winner,setWinner]=React.useState('');
  const [gridValue,setGridValue]=React.useState([[0,0,0],[0,0,0],[0,0,0]]);
  const resetGrid =() =>{
    setWinner('');
    setGridValue([[0,0,0],[0,0,0],[0,0,0]]);
  }
  const checkIfGridFilled = () =>{
    for(let i=0;i<2;i++){
      for(let j=0;j<2;j++){
        if(gridValue[i][j]===0){
          return false;
        }
      }
    }
    return true;
  }
  const updateGrid = (first,second,value) =>{
    if(winner || checkIfGridFilled(gridValue) || checkIfBlockAlreadyFilled(gridValue,first,second)){
      return;
    }

    var newGrid = [...gridValue];
    newGrid[first][second]=value;
    setGridValue(newGrid);
    //Check the result
    const result=checkMatch(newGrid);
    console.log(result);
    if(result.match===true){
      //Set winner
      setWinner(result.char);
    }

    //Update Turn 
    turn === 'X' ? setTurn('O') : setTurn('X');
  }
  //CHeck if the block is already having value
  const checkIfBlockAlreadyFilled = (gridValue,first,second) =>{
    if(gridValue[first][second]==='X' || gridValue[first][second]==='O')
    {
      return true;
    }else
    {
      return false;
    }
  }
  
  return(
    <div className='backGround'>
    <h1 style={{display:'Flex',placeItems:'centre',color:'#fff'}}>{turn}'s Turn</h1>
      <div className='centre'>
      <div className='Outer'>
      <div style={{display:'Flex'}}>{gridValue[0].map((singleValue,index)=>{
        return <Squares updateGrid={updateGrid} first={0} second={index} value={singleValue} turn={turn}/>
        })}</div>
        <div style={{display:'Flex'}}>{gridValue[1].map((singleValue,index)=>{
        return <Squares updateGrid={updateGrid} first={1} second={index} value={singleValue} turn={turn}/>
        })}</div>
        <div style={{display:'Flex'}}>{gridValue[2].map((singleValue,index)=>{
        return <Squares updateGrid={updateGrid} first={2} second={index} value={singleValue} turn={turn}/>
        })}</div>
      </div>
      </div>
      
      {winner!==''&&<h1 style={{display:'Flex',placeItems:'centre',color:'#fff'}}>The winner is {winner}</h1>}
      <button className='pulseEffect' onClick={()=>resetGrid()}>Reset</button>
    </div>
    
    
  )
}

const Squares =({updateGrid,first,second,value,turn})=>{
  return (<div className='block' onClick={()=>updateGrid(first,second,turn)}>
    {value===0?'':value}
  </div>)
}

const checkMatch =(grid) =>{
  var isMatched;
  // 00,01,02
  isMatched = threePlaceCheck(grid[0][0],grid[0][1],grid[0][2]);
  if(isMatched.match === true){
    return isMatched;
  }
    // 10,11,12
  isMatched = threePlaceCheck(grid[1][0],grid[1][1],grid[1][2]);
  if(isMatched.match === true){
    return isMatched;
  }
  // 20,21,22
  isMatched = threePlaceCheck(grid[2][0],grid[2][1],grid[2][2]);
  if(isMatched.match === true){
    return isMatched; 
  } 
  // 00,10,20
  isMatched = threePlaceCheck(grid[0][0],grid[1][0],grid[2][0]);
  if(isMatched.match === true){
    return isMatched;
  }
  // 01,11,21
  isMatched = threePlaceCheck(grid[0][1],grid[1][1],grid[2][1]);
  if(isMatched.match === true){
    return isMatched;
  }
  // 02,12,22
  isMatched = threePlaceCheck(grid[0][2],grid[1][2],grid[2][2]);
  if(isMatched.match === true){
    return isMatched;
  }
  // 20,11,02
  isMatched = threePlaceCheck(grid[2][0],grid[1][1],grid[0][2]);
  if(isMatched.match === true){
    return isMatched;
  }
  // 00,11,22
  isMatched = threePlaceCheck(grid[0][0],grid[1][1],grid[2][2]);
  if(isMatched.match === true){
    return isMatched;
  }
  return false;

}

const threePlaceCheck = (item1,item2,item3)=>{
  //Check if they are not 0 and return false
  if(item1===0 || item2===0 || item3===0) 
  {
    return {match:false};
  }
  //Check if they match , return true and the character in case yes
  if(item1===item2 && item2===item3){
    return {match:true,
    char:item1};
  }
  return {
    match : false
  };
}
export default App;
