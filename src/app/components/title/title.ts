import { Output,Inject, Component, OnInit, EventEmitter, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { Organisation } from '../../entities/index';
import { AppSettings } from '../../shared/AppSettings';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { SeoService } from '../../shared/seo.service';


@Component({
  selector: '[apptitle], apptitle',
  template: `<a [routerLink]="getLink('')" >{{organisation?.Name || 'ProvectaPOS'}}</a>`,
  styles: [
    `
a{
  color: white;
  cursor: pointer;
 text-decoration: none;
}`
  ]
})
export class TitleComponent implements OnInit {

  organisation: Organisation;
  @Output('onLoaded')
  loaded: EventEmitter<Organisation> = new EventEmitter<Organisation>();


  constructor(private api: ApiAccessService,
    public router: Router,
    private seoService: SeoService) {

      AppSettings.OrganisationChanged.subscribe(org=>{
        this.applyOrganisation(org);
      })

  }


  applyOrganisation(org:Organisation){
    this.organisation = org;
    const title = this.seoService.getTitle();
    if (!title || !title.length) {
      this.seoService.setTitle(this.organisation.Name);
    }

  }

  ngOnInit() {
    this.organisation = AppSettings.Organisation;
    
    if (this.api.storeId) {

      if(this.organisation && this.organisation.Code == AppSettings.OrganisationCode){
        return;
      }

      this.api.genericRead('organisation')
        .subscribe(o => {
          // this.organisation = o;
          AppSettings.OrganisationSet(o);

          this.loaded.emit(o);

          this.applyOrganisation(o);
        },
        error => {
          console.log(error);
        });
    }
  }

  getLink(path: string): string {
    return `${this.api.storeId || ""}`;
  }

}
