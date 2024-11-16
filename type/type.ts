export interface TocElement {
    name: string,
    class: string,
    text: string
}

export interface Call {
    name: string,
    explanation: string,
    alert: boolean
}

export interface Quest {
    spades: string,
    hearts: string,
    diamonds: string,
    clubs: string,
    auction: Call[],
    answers: {[index: string]: string},
    correct: string,
    board_num: number
}