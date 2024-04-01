function createBoard(rows:number, columns:number){

    return Array(rows).fill(0).map((_,row)=>{

        return Array(columns).fill(0).map((_,column)=>{
            return{
                row,
                column,
                opened:false,
                flagged:false,
                mined:false,
                exploded:false,
                nearMines:0
            }
        })

    }) 
}


function spreadMines(board:BoardInterface[][],minesAmount:number){
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while(minesPlanted < minesAmount){

        const rowSel = parseInt(String(Math.random() * rows),10)
        const columnSel = parseInt(String(Math.random() * columns),10)

        if(!board[rowSel][columnSel].mined){

            board[rowSel][columnSel].mined = true
            minesPlanted++

        }

    }

}

export function createMinedBoard(rows:number,columns:number,minesAmount:number){


    const board = createBoard(rows,columns)

    spreadMines(board,minesAmount)

    return board

}

export function cloneBoard(board:BoardInterface[][]){
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

function getNeighbors(board:BoardInterface[][],row:number,column:number){

    const neighbors : BoardInterface[] = []
    const rows = [row -1, row , row + 1]
    const columns = [column - 1, column, column + 1]

    rows.forEach(r => {
        columns.forEach(c => {

            const diferent = r !== row || c !== column

            const validRow = r >=0 && r < board.length

            const validColunm = c >=0 && r < board[0].length

            if(diferent && validRow && validColunm){
                neighbors.push(board[r][c])
            }

        })
    })

    return neighbors
    
}

export function openField(board:BoardInterface[][],row:number,column:number){

    const field = board[row][column]

    if(!field.opened){
        field.opened=true

        if(field.mined){

            field.exploded=true

        }else if(safeNeighborhood(board,row,column)){

            getNeighbors(board,row,column).forEach(n => openField(board,n.row,n.column))

        } else {

            const neighbors = getNeighbors(board,row,column) as BoardInterface[]

            field.nearMines = neighbors.filter((n:BoardInterface) =>{

                if(!n?.mined){
                    return false
                }

                return n.mined
            }).length
            
        }
    }

}

function safeNeighborhood(board:BoardInterface[][],row:number,column:number){

    const safes = (result:boolean, neighbor:BoardInterface) => {

        if(!neighbor){
            return false
        }

        return result && !neighbor.mined
    }

    return getNeighbors(board,row,column).reduce(safes,true)

}

function fields(board:any) {
    return [].concat(...board)
}

export function hadExplosion(board:BoardInterface[][]){
  
    const copyBoard = fields(board)

    return copyBoard.filter((field:BoardInterface) => field.exploded).length > 0

}

function pendding(field:BoardInterface){
    return (field.mined && !field.flagged) || (!field.mined && !field.opened)
}

export function wonGame(board:BoardInterface[][]){

    return fields(board).filter(pendding).length === 0

}

export function showMines(board:BoardInterface[][]){

    fields(board).filter((field:BoardInterface) => field.mined).forEach((field:BoardInterface)=> field.opened=true)

}

export function invertFlag(board:BoardInterface[][],row:number,column:number) : void{

    const field = board[row][column]

    field.flagged = !field.flagged

}

export function flagsUsed(board:BoardInterface[][]){

    return fields(board).filter((field:BoardInterface) => field.flagged).length

}