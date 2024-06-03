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
