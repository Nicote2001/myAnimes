import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditAccountComponent } from "./account/edit-account/edit-account.component";
import { ForgotPasswordComponent } from "./account/forgot-password/forgot-password.component";
import { AnimeDetailComponent } from "./anime-detail/anime-detail.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { FaqComponent } from "./faq/faq.component";
import { MenuComponent } from "./menu/menu.component";
import { OnGoingAnimesComponent } from "./on-going-animes/on-going-animes.component";
import { PopularAnimesComponent } from "./popular-animes/popular-animes.component";
import { SearchAnimeComponent } from "./search-anime/search-anime.component";

const routes: Routes = 
[
    {path: '', component: MenuComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'anime/:id/:episode', component: AnimeDetailComponent},
    {path: 'anime/search', component: SearchAnimeComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'profil', component: EditAccountComponent},
    {path: 'populars', component: PopularAnimesComponent},
    {path: 'season/:moment', component: OnGoingAnimesComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'faq', component: FaqComponent},
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