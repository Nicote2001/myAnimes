

export class AnimeKitus
{
    constructor(
        public slug : string,
        public synopsis: string,
        public titles : {en: string, en_jp: string},
        public averageRating: string,
        public posterImage: {tiny: string, small: string, medium: string, large: string, original: string},
        public coverImage: {tiny: string, small: string, medium: string, large: string, original: string}
    ){
    }
}