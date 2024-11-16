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

type Answers = {"Pass"?: string, "X"?: string, "XX"?: string
    "1C"?: string, "1D"?: string, "1H"?: string, "1S"?: string, "1NT"?: string,
    "2C"?: string, "2D"?: string, "2H"?: string, "2S"?: string, "2NT"?: string,
    "3C"?: string, "3D"?: string, "3H"?: string, "3S"?: string, "3NT"?: string,
    "4C"?: string, "4D"?: string, "4H"?: string, "4S"?: string, "4NT"?: string,
    "5C"?: string, "5D"?: string, "5H"?: string, "5S"?: string, "5NT"?: string,
    "6C"?: string, "6D"?: string, "6H"?: string, "6S"?: string, "6NT"?: string,
    "7C"?: string, "7D"?: string, "7H"?: string, "7S"?: string, "7NT"?: string,
}

export interface Quest {
    spades: string,
    hearts: string,
    diamonds: string,
    clubs: string,
    auction: Call[],
    answers: Answers,
    correct: string,
    board_num: number,
    description?: string
}

export type QuestLib = {[index: string]: Quest[]};