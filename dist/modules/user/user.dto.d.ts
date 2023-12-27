export declare class CreateFirmDTO {
    name: string;
    description: string | null;
}
export declare abstract class CreateUserDTO {
    username: string;
    password: string;
    type: 'administrator' | 'customer' | 'forwarder';
}
export declare class CreateAdministratorDTO extends CreateUserDTO {
    type: 'administrator';
}
export declare class CreateCustomerDTO extends CreateUserDTO {
    type: 'customer';
    telephone: string | null;
    email: string | null;
}
export declare class CreateForwarderDTO extends CreateUserDTO {
    type: 'forwarder';
    telephone: string | null;
    email: string | null;
    firm: string;
}
