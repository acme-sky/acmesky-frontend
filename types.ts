export interface User {
    id: number;
    created_at: string;
    username: string;
    password: string;
    name: string;
    email: string;
    address: string | null;
    prontogram_username: string | null;
    is_admin: boolean;
};

export interface Interest {
    id: number;
    created_at: string;
    flight1_departure_time: string | null;
    flight1_departure_airport: string | null;
    flight1_arrival_time: string | null;
    flight1_arrival_airport: string | null;
    flight2_departure_time: string | null;
    flight2_departure_airport: string | null;
    flight2_arrival_time: string | null;
    flight2_arrival_airport: string | null;
    user: User;
};


export interface Flight_info {
    id: number;
    arrival_airport: string;
    arrival_time: string;
    departure_airport: string;
    departure_time: string;
    cost: number;
    airline: string;
    token: string;
};

export interface Journey_info {
    id : number;
    flight1_id: number;
    flight1: Flight_info;
    flight2_id: number;
    flight2: Flight_info;
    cost: number;
    user_id: number
}

