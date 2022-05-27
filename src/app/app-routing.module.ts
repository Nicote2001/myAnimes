import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditAccountComponent } from "./account/edit-account/edit-account.component";
import { ForgotPasswordComponent } from "./account/forgot-password/forgot-password.component";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { AnimeDetailComponent } from "./anime-detail/anime-detail.component";
import { AnimeEpisodeErrorComponent } from "./errors/anime-episode-error/anime-episode-error.component";
import { MenuComponent } from "./menu/menu.component";
import { SearchAnimeComponent } from "./search-anime/search-anime.component";

const routes: Routes = 
[
    {path: '', component: MenuComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'anime/:id/:episode', component: AnimeDetailComponent},
    {path: 'anime/search', component: SearchAnimeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'error/anime', component: AnimeEpisodeErrorComponent},
    {path: 'profil', component: EditAccountComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
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