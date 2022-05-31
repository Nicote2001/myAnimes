export class AnimeUser
{
    constructor(
        public id: string,
        public animeId: string,
        public animeTitle: string,
        public imgUrl: string,
        public uid: string,
        public currentEpisode: number,
        public lastUpdate: string
    ){
    }
}