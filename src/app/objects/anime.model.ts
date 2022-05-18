import { Images } from "./images.model";

export class IAnime
{
    constructor(
        public title : string,
        public images : Images,
        public episodes: number,
        public score: number,
        public popularity: number,
        public synopsis: string,
        public backgroud: string
    ){
    }
}