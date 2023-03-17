var origboard;
const huplayer ='0';
const aiplayer ='X';
const wincombos =
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
var i;

const cells = document.querySelectorAll('.cell');
StartGame();

function StartGame()
{
    document.querySelector(".endgame").style.display = "none";
    origboard = Array.from(Array(9).keys());
    for(i=0;i<cells.length;i++)
    {
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    }
}

function turnClick(square)
{
    if(!checkTie())
    {
    if(typeof origboard[square.target.id]=='number')
    {
        turn(square.target.id,huplayer);
        
        
            turn(bestSpot(),aiplayer);
    } 
    }
}
function turn(squareId,player)
{
    origboard[squareId]=player;
    document.getElementById(squareId).innerText=player;
    let gameWon=checkWin(origboard,player);
    if(gameWon)
    {  
         gameOver(gameWon);
    }
    
}


function checkWin(board,player)
{
    let plays=board.reduce((a,e,i)=>(e===player)?a.concat(i):a,[]);
    let gameWon = null;
    for (let [index,win] of wincombos.entries())
    {
        if(win.every(elem => plays.indexOf(elem)>-1))
        {
            gameWon={index:index,player:player};
            break;
        }
    }
    return gameWon;
}   

function declareWinner(who)
{
    document.querySelector(".endgame").style.display="block";
    document.querySelector(".endgame .text").innerText=who;
}



function gameOver(gameWon)
{
    for(let index of wincombos[gameWon.index])
    {
        document.getElementById(index).style.backgroundColor = gameWon.player==huplayer ? "blue" : "red";
    }
    for ( var i=0; i<cells.length;i++)
    {
        cells[i].removeEventListener('click',turnClick,false);

    }
    declareWinner(gameWon.player == huplayer ? "You Win!" : "You Lose!");
}

function bestSpot()
{
    return emptySqaures()[0];
}

function emptySqaures()
{
    return origboard.filter(s=> typeof s=='number');
}

function checkTie()
{
    if(emptySqaures().length==0)
    {
        for(var i;i<cells.length;i++)
        {
            cells[i].style.backgroundColor="green";
            cells[i].removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game");
        return true;
    }
}



/* function minimax(newBoard,player)
{
    var availSpots = emptySqaures(newBoard);
}
    if(checkWin(newBoard,huplayer))
    {
        return {score:-10};
    }
    else if(checkWin(newBoard,aiplayer))
    {
        return {score:20};
    }
    else if(availSpots.length===0)
    {
        return {score:0};
    }
    var moves =[];
    for(i=0;i<availSpots.length;i++)
    {
        var move ={};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        
        if(huplayer==aiplayer)
        {
            var result = minimax(newBoard,huplayer);
            move.score=result.score;
        }
        else
        {
            var result = minimax(newBoard,aiplayer);
            move.score=result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }


    var bestMove;
    if(player===aiplayer)
    {
        var bestScore = -10000;
        for(i=0;i<moves.length;i++)
        {
            if(moves[i].score>bestScore)
            {
                bestScore = moves[i].score;
                bestMove=i;
            }
        }
    }
    else
    {
        var bestScore = 10000;
        for(i=0;i<moves.length;i++)
        {
            if(moves[i].score<bestScore)
            {
                bestScore = moves[i].score;
                bestMove=i;
            }
        }
    }
    return moves(bestMove);
    */