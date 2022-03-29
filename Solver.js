function build_board(board){
    for(var i=0; i<9; i++){
        const row=new Array(9);
        for(var j=0; j<9; j++){
            row[j]=document.getElementById(i+"-"+j).value;
        }
        board[i]=row;
    }
}
function isZero(board){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if (board[i][j] == 0){
                return [i, j];
            }
        }
    }
    return null;
}
function valid(board, num, posn){
    /*checking row*/
    for(var i=0; i<9; i++){
        if(board[i][posn[1]]==num && posn[0]!=i){
            return false;
        }
    }
    //checking column
    for(var i=0; i<9; i++){
        if(board[posn[0]][i]==num && posn[1]!=i){
            return false;
        }
    }
    //checking sub-grid
    var sb_grd_y=parseInt(posn[1]/3);
    var sb_grd_x=parseInt(posn[0]/3);

    for(var i=sb_grd_x*3; i<sb_grd_x*3 +3; i++){
        for(var j=sb_grd_y*3; j<sb_grd_y*3 + 3; j++){
            if(board[i][j]==num && i!=posn[0] && j!=posn[1]){
                return false;
            }
        }
    }
    return true;

}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function backTrack_solve(board){
    const find = isZero(board);
    if(find==null){
        return true;
    }
    var row =find[0];
    var col=find[1];
    for(var i=1; i<10; i++){
        await sleep(0.5);
        if(valid(board, i, find)){
            document.getElementById(row+"-"+col).value=i;
            document.getElementById(row+"-"+col).style.background = 'lawngreen';
            board[row][col]=i;
            if (await backTrack_solve(board)){
                return true;
            }
            await sleep(0.5);
            board[row][col]=0;
            document.getElementById(row+"-"+col).style.background = 'red';
            document.getElementById(row+"-"+col).value='&nbsp';
        }
    }
    return false;

}

function isValid(board){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(board[i][j]!=0){
                if(!valid(board, board[i][j], [i, j])){
                    return false;
                }
            }
        }
    }
    return true;
} 

function Solve(){
    const board=new Array(9);
    build_board(board);
    if(!isValid(board)){
        window.alert("Invalid Entry!!!");
    }
    //document.getElementById("0-0").value=1;
    else{
        backTrack_solve(board);
    }
}
function Reset(){
    location.reload();
}
//function Open_Github(){
    //window.open(,"_blank");
//}