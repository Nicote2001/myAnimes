import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimeDetailComponent } from "./anime-detail/anime-detail.component";
import { MenuComponent } from "./menu/menu.component";

const routes: Routes = 
[
    {path: '', component: MenuComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'anime/:id/:episode', component: AnimeDetailComponent}
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