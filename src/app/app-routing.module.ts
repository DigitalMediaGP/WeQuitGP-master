import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './start/start.module#StartPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home',loadChildren: './home/home.module#HomePageModule'},
  { path: 'journal', loadChildren: './journal-details/journal-details.module#JournalDetailsPageModule' },
  { path: 'journal/:id/:name/:notes/:user', loadChildren: './journal-details/journal-details.module#JournalDetailsPageModule' },
  { path: 'journalEntryList', loadChildren: './journal/journal.module#JournalPageModule' },
  { path: 'facts', loadChildren: './facts/facts.module#FactsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'quit-form', loadChildren: './quit-form/quit-form.module#QuitFormPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
