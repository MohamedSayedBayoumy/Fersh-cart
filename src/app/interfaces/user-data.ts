export interface UserData {
    name:       string;
    email:      string;
    password:   string;
    rePassword: string;
    phone:      string;
}

export interface UserLoginData {
    id:       string;
    name:     string;
    role:     string;
    iat:      number;
    exp:      number;
}

