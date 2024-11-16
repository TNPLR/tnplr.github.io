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

export type NameOfCall = "Pass" | "X" | "XX"
    | "1C" | "1D" | "1H" | "1S" | "1NT"
    | "2C" | "2D" | "2H" | "2S" | "2NT"
    | "3C" | "3D" | "3H" | "3S" | "3NT"
    | "4C" | "4D" | "4H" | "4S" | "4NT"
    | "5C" | "5D" | "5H" | "5S" | "5NT"
    | "6C" | "6D" | "6H" | "6S" | "6NT"
    | "7C" | "7D" | "7H" | "7S" | "7NT"

export interface Answers {"Pass"?: string, "X"?: string, "XX"?: string
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
    correct: NameOfCall,
    board_num: number,
    description?: string
}

export type QuestLib = {[index: string]: Quest[]};