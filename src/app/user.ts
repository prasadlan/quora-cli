/**
 * User class for signup.
 */
export class User {
    constructor(
        public name: string = '',
        public username: string = '',
        public password: string = '',
        public email   : string = '',
    ) {}
}