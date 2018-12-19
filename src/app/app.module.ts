import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap';
import {
  MatDialogModule, MatSidenavModule, MatTabsModule, MatTableModule, MatListModule, MatExpansionModule,
  MatCheckboxModule, MatPaginatorModule,
  MatGridListModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule,
  MatToolbarModule, MatProgressSpinnerModule, MatPaginatorIntl
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AgmCoreModule } from '@agm/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  navigation: true,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true
  },
  centeredSlides: true,
  keyboard: true
};

// i18n support
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_BASE_HREF, Location } from '@angular/common';


import { FacebookModule } from 'ng2-facebook-sdk';

export function createTranslateLoader(http: HttpClient, baseHref) {
  // Temporary Azure hack
  if (baseHref === null && typeof window !== 'undefined') {
    baseHref = window.location.origin;
  }
  // i18n files are in `wwwroot/assets/`
  //return new TranslateHttpLoader(http, `./assets/i18n/`, '.json?' + new Date().valueOf());
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

//Directives
import { ShowImage } from './directives/showImage';

//Helpers
import { CommonHelper } from './helpers/CommonHelper';

//Pipes
import { FilestreamPipe } from './pipes/filestream';
import { SafePipe } from './pipes/safePipe';
import { DatatranslatePipe } from './pipes/datatranslatepipe';
import { SettingsPipe } from './pipes/SettingPipe';


//Component
import { LoadingPanelComponent } from './components/loading-panel/loading-panel.component';
import { VariantsDescriptionComponent } from './components/variants-description/variants-description.component';
import { CartButtonComponent } from './components/cartbutton/cartbutton.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { BranchComponent } from './components/branch/branch';
import { ProductsComponent, DialogOverviewExampleDialog } from './components/products/products';
import { ProductComponent } from './components/product/product';
import { SliderComponent } from './components/slider/slider';
import { TitleComponent } from './components/title/title';
import { BlogComponent } from './components/blog/blog';
import { OrdersComponent } from './components/orders/orders';
import { DialogSimple } from './components/dialog/dialog-simple';
import { SignInComponent } from './components/signin/signin.component';



//Containers
import { AccountComponent } from './containers/account/account.component';
import { LoginComponent } from './containers/login/login.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { HomeComponent } from './containers/home/home.component';
import { BranchesComponent } from './containers/branches/branches.component';
import { BranchDetailsComponent } from './containers/branch-details/branch-details.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { BlogsComponent } from './containers/blog/blogs.component';
import { BlogDetailsComponent } from './containers/blog-details/blog-details.component';
import { ShoppingCartComponent } from './containers/shopping-cart/shopping-cart.component';


import { AppComponent } from './app.component';
import { getBaseLocation } from './shared/common-functions.util';
import { MyMatPaginatorIntl } from './intl/MyMatPaginatorIntl';
// import { HomeComponent } from './home/home.component';

//SERVICES
import { LinkService } from './shared/link.service';
import { SeoService } from './shared/seo.service';
import { ApiAccessService } from './shared/apiAccess.service';
import { CartService } from './shared/cart.service';
import { UserService } from './shared/user.service';
import { MessageService } from './shared/message.service';
import { TokenInterceptor } from './shared/token.interceptor';


@NgModule({
  declarations: [
    ShowImage,
    FilestreamPipe,
    SafePipe,
    DatatranslatePipe,
    SettingsPipe,
    
    LoadingPanelComponent,
    VariantsDescriptionComponent,
    CartButtonComponent,
    SliderComponent,
    BranchComponent,
    TitleComponent,
    BlogComponent,
    OrdersComponent,
    

    AccountComponent,
    LoginComponent,
    SignInComponent,
    ProductsComponent,
    ProductComponent,
    DialogOverviewExampleDialog,
    DialogSimple,
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavMenuComponent,
    BranchesComponent,
    BranchComponent,
    BranchDetailsComponent,
    BlogComponent,
    BlogsComponent,
    BlogDetailsComponent,
    ProductDetailsComponent,
    ShoppingCartComponent
  ],
  entryComponents: [DialogOverviewExampleDialog,DialogSimple],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  imports: [
    FacebookModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnIqYzbTFgev0cF-f6kRjypni7-UYoyaY'
    }),
    SwiperModule,
    PaginationModule,
    NouisliderModule,
    MatSidenavModule, MatTabsModule, MatToolbarModule, MatListModule, MatCheckboxModule, MatExpansionModule,
    MatGridListModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
    MatMenuModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule,

    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule, // (Optional) for linkedIn and tumblr share counts
    ShareButtonsModule.forRoot(),
    // i18n support
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    // App Routing
    RouterModule.forRoot([
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: ':storeId',
        component: HomeComponent,
      },
      {
        path: ':storeId/branches',
        component: BranchesComponent
      },
      {
        path: ':storeId/branch-details/:branchCode',
        component: BranchDetailsComponent
      },
      {
        path: ':storeId/product-details/:productCode',
        component: ProductDetailsComponent
      },
      {
        path: ':storeId/blog',
        component: BlogsComponent
      },
      {
        path: ':storeId/blog-details/:blogCode',
        component: BlogDetailsComponent
      },
      {
        path: ':storeId/cart',
        component: ShoppingCartComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ],
      {
        // Router options
        useHash: false,
        preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled'
      })
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent, pathMatch: 'full' },
    //   { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
    //   { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' }
    // ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MatPaginatorIntl, useClass: MyMatPaginatorIntl, deps: [TranslateService] },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation
    },
    TranslateModule,
    PaginationConfig,
    CommonHelper,
    LinkService,
    ApiAccessService,
    SeoService,
    CartService,
    UserService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
