import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAccessService } from "../../shared/apiAccess.service";
import { TranslateService } from "@ngx-translate/core";
import { FacebookService, InitParams, LoginResponse } from 'ng2-facebook-sdk';
import { Person, User, PersonSexType, Token } from "../../entities/index";
import { CommonHelper } from "../../helpers/CommonHelper";
import { UserService } from "../../shared/user.service";
import { Subscription } from "rxjs/Subscription";
import { MessageService } from "../../shared/message.service";


@Component({
    selector: 'account',
    styleUrls: ['./account.component.scss'],
    templateUrl: './account.component.html'

})
export class AccountComponent {

    person: Person = new Person();
    login: string;
    loading: boolean;
    subscriptions: Array<Subscription> = [];

    constructor(
        public router: Router,
        public apiAccessService: ApiAccessService,
        public translate: TranslateService,
        private userService: UserService,
        private messaging: MessageService
    ) {

        this.subscriptions.push(this.userService.userChanged.subscribe(user => {
            this.person = user;
        }))


    }

    ngOnInit() {

        this.person = this.userService.getUser();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(element => {
            element.unsubscribe();
        });
    }

    getOrders(event: any) {

    }

    logOut() {

        this.messaging.showDialog('Log out', 'Sign out of your account','?')
            .then(res => {
                if (res) {
                    this.userService.logout();
                }
            })

    }



}
