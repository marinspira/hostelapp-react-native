// export interface User {
//     _id: string;
//     name: string;
// }

export interface Message {
    _id: string;
    text: string;
    createdAt: Date;
}

export interface ChatState {
    messages: Message[];
}