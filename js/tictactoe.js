
var Board = ['-','-','-','-','-','-','-','-','-'];
var flag = true;

const wins = [
              [0,1,2],
              [3,4,5],
              [6,7,8],
              [0,4,8],
              [2,4,6],
              [0,3,6],
              [1,4,7],
              [2,5,8],
             ];

const emptySquares = function (array)
{
  let array_empty = [];

  for (let i = 0; i < 9; i++ )
  {
    if (Board[i] === '-')
      array_empty.push(i);
  }
  return array_empty;
}


const checkForWinner = function() {

  for (let i = 0; i < wins.length; i++)
  {
    if (Board[wins[i][0]] === Board[wins[i][1]]  && Board[wins[i][1]] === Board[wins[i][2]] && Board[wins[i][1]]!=='-')
    {
      return Board[wins[i][0]];
    }
  }
  return 0;
}


const minimax = function (player,ii,ij)
{
  let spots = emptySquares();
  let maxval = -1000;
  let minval = 1000;
  let move = {index:'',score:''};

  let n = checkForWinner();


  if (n != 0)
  {
      if (n === 'X') return {score:-10};
      if (n === 'O') return {score:10};
  }
  else
  {
    if (spots.length === 0)
    {
      return {score:0};
    }
  }

	for (let i = 0; i < spots.length; i++) {

    let indexj = spots[i] % 3;
    let indexi = (spots[i] - indexj)/3;

		if (player === 'computer')
    {
      Board[spots[i]] = 'O';

			var result = minimax('human',indexi,indexj);

      if (result.score > maxval)
      {
        maxval = result.score;
        move.score = maxval;
        move.index = spots[i];
      }
		}
    else
    {
      Board[spots[i]] = 'X';

    	var result = minimax('computer',indexi,indexj);

      if (result.score < minval)
      {
        minval = result.score;
        move.score = minval;
        move.index = spots[i];
      }
		}
    Board[spots[i]] = '-';
	}

	return move;
}


$(document).ready(function(){

    var player = 1;
    var turns = 1;

    $("#board tr td").click(function() {

      let string = $(this)[0].classList[0];
      let index_i = parseInt(string[4]);
      let index_j = parseInt(string[5]);

      if (Board[index_i*3+index_j] === '-' && flag){
      /*if ($(this).text()==="" && flag) {

        let string = $(this)[0].classList[0];
        let index_i = parseInt(string[4]);
        let index_j = parseInt(string[5]);*/
       $(this).append("<i class='fa fa-times' style='20px'></i>");

        Board[index_i*3+index_j] = 'X';
    ///      $('td').eq(index_i*3+index_j).append("X");\\




        let n = minimax('computer',0,0);

        let indexj = n.index% 3;
        let indexi = (n.index - indexj)/3;


        $('td').eq(indexi*3+indexj).append("<i class='fa fa-circle-thin' style='20px'></i>");
          Board[indexi*3+indexj] = 'O';
      //    $('td').eq(index_i*3+index_j).append("O");


        let m = checkForWinner();
        if (m!==0) {
          flag = false;
          if (m==='X') alert("Player 1 won");
          else alert("CPU won");
        }
        else
        {
          if (Board.indexOf('-') === -1)
          {
            flag = false;
            alert('Tie');
          }
        }
      }
    });


    $('#reset').click(function()
    {
      flag = true;
      $('td').empty();
      for (let i = 0;i < 9; i++)
      {
        Board[i] = '-';
      }
    }
  )

});
