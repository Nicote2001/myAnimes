import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimeDetailComponent } from "./anime-detail/anime-detail.component";
import { MenuComponent } from "./menu/menu.component";
import { SearchAnimeComponent } from "./search-anime/search-anime.component";

const routes: Routes = 
[
    {path: '', component: MenuComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'anime/:id/:episode', component: AnimeDetailComponent},
    {path: 'anime/search', component: SearchAnimeComponent}
];

@NgModule({
    imports:
    [
        RouterModule.forRoot(routes)
    ],
    exports:
    [
        RouterModule
    ]
})
export class AppRoutingModule {}