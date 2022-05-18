import { IAnime } from "./anime.model";
import { Episode } from "./episode.model";
import { Images } from "./images.model";

export class RecentAnimeMenu
{
    constructor(
        public entry : IAnime[],
        public episodes : Episode[]
    ){
    }
}