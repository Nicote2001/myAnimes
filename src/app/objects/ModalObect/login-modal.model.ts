
export class LoginModal
{
    constructor(
        public email : string,
        public password: string,
        public isTwitter: boolean,
        public isGoogle: boolean,
        public needRegister : boolean
    ){
    }
}