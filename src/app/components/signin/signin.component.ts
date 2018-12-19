import { EventEmitter,Component, ViewChild, Output, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiAccessService } from "../../shared/apiAccess.service";
import { TranslateService } from "@ngx-translate/core";
import { FacebookService, InitParams, LoginResponse } from 'ng2-facebook-sdk';
import { Person, User, PersonSexType, Token } from "../../entities/index";
import { CommonHelper } from "../../helpers/CommonHelper";
import { UserService } from "../../shared/user.service";



@Component({
    selector: 'signin',
    styleUrls: ['./signin.component.scss'],
    templateUrl: './signin.component.html'

})
export class SignInComponent {

    @ViewChild('loginForm') loginForm: any;
    @ViewChild('registerForm') registerForm: any;
    person: Person = new Person();
    login: string;
    password: string;
    loading: boolean;
    backRef: string;

    @Input('navDisable') navDisable: boolean;

    @Output('onPersonChanged') personChanged = new EventEmitter<Person>();


    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public apiAccessService: ApiAccessService,
        public translate: TranslateService,
        private fb: FacebookService,
        private userService: UserService
    ) {

        let initParams: InitParams = {
            appId: '1467480953351182',
            xfbml: true,
            version: 'v2.8'
        };

        fb.init(initParams);

        this.route.params.subscribe(params => {
            this.backRef = params['backref'];
        });
    }



    loginWithFacebook(): void {

        this.fb.login()
            .then((response: LoginResponse) => {


                this.fb.api(response.authResponse.userID + "/?fields=id,email,name,birthday,gender").then(personInfo => {

                    //                    debugger;

                    let person = new Person();

                    if (personInfo) {


                        person.Code = "Facebook_" + response.authResponse.userID;

                        if (personInfo.name) {
                            let splitName = personInfo.name.split(' ');
                            if (splitName.length > 1) {

                                person.FirstName = splitName[0];
                                splitName.splice(0, 1);
                                person.LastName = splitName.join(' ').trim();
                            }

                        } else {
                            person.FirstName = personInfo.name;
                        }

                        let uniqueKey = CommonHelper.generateGuid();


                        person.User = new User();
                        person.User.FacebookId = response.authResponse.userID;
                        person.User.Code = person.Email || uniqueKey + '@provectapos.com';
                        person.User.Password = uniqueKey;


                        if (personInfo.gender) {
                            person.PersonSexType = personInfo.gender == "male" ? PersonSexType.Male : PersonSexType.Female;
                        }
                    }

                    this.loading = true;
                    this.userService.socialLogIn('Facebook', response.authResponse.accessToken, response.authResponse.userID, person)
                        .then(res => {
                            this.loading = false;
                            this.accountResultSuccess();

                        })
                        .catch(err => {
                            console.log(err);
                            this.loading = false;
                        })

                }).catch((error: any) => console.error(error));

            })
            .catch((error: any) => console.error(error));

    }

    private accountResultSuccess() {
        if (!this.navDisable) {
            if (this.backRef) {
                this.router.navigate([this.backRef]);
            } else {
                this.router.navigate(['/account']);
            }
        }

    }

    doRegister() {
        if (this.registerForm.form.valid) {

            this.person.User = new User();
            this.person.User.Code = this.person.Email;
            this.person.User.Password = this.password;


            this.loading = true;
            this.apiAccessService.genericPost<Token>(`account/signup`, this.person, true)
                .subscribe(res => {
                    this.loading = false;
                    this.accountResultSuccess();
                }, err => {
                    debugger;
                    console.log(err);
                    this.loading = false;
                })

        }
    }

    doLogin() {

        if (this.loginForm.form.valid) {

            this.loading = true;

            this.userService.logIn(this.login, this.password)
                .then(res => {
                    this.loading = false;
                    this.accountResultSuccess();
                })
                .catch(err => {

                    console.log(err);
                    this.loading = false;
                })

            // this.apiAccessService.genericGet<Token>(`account/login`, `login=${this.login}&password=${this.password}`, true)
            //     .subscribe(res => {
            //         debugger;
            //         this.loading = false;
            //     }, err => {
            //         debugger;
            //         console.log(err);
            //         this.loading = false;
            //     })

        }

    }
}
