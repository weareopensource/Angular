import { NgModule, APP_INITIALIZER, ModuleWithProviders, Injectable } from '@angular/core';
import { MenuService } from 'app/core';

@Injectable()
export class ArticlesConfig {
  constructor(private menuService: MenuService){
  }
  addMenu() {
    this.menuService.addMenuItem('sideNav',{
      state: 'articles',
      title: 'Articles',
      icon: 'fa-file',
      roles:['user', 'admin'],
    })
  }
}

export function articlesFactory(config: ArticlesConfig) {
  return () => config.addMenu() ;
}
@NgModule({
  providers: [ ArticlesConfig ]
})

export class ArticlesConfigModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArticlesConfigModule,
      providers: [{ provide: APP_INITIALIZER, useFactory: articlesFactory, deps: [ArticlesConfig], multi: true }]
    }
  }
}
