import { Component } from '@angular/core';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { UserService } from '../../shared/user.service';
import { Person } from '../../entities/index';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})

export class NavMenuComponent {
    collapse: string = "collapse";
    user: Person;

    constructor(public apiAccessService: ApiAccessService,
        private userService: UserService) {

            userService.userChanged.subscribe(user => {
            this.user = user;
        });

    }

    ngOnInit(){
        this.user = this.userService.getUser();
    }

    collapseNavbar(): void {
        if (this.collapse.length > 1) {
            this.collapse = "";
        } else {
            this.collapse = "collapse";
        }
    }

    collapseMenu() {
        this.collapse = "collapse";
    }

    getLink(path: string): string {
        if (this.apiAccessService.storeId) {
            return `${this.apiAccessService.storeId}/${path}`;
        } else {
            return '';
        }
    }
}
