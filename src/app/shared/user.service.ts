import { Injectable, Output, EventEmitter, Inject } from "@angular/core";
import { Article, Document, ArticleMeasureType, Lot, Token, Person } from "../entities/index";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from '@angular/core';
import { DocumentOperationType, DocumentActionType } from "../entities/stock/Document";
import { ApiAccessService } from "./apiAccess.service";
import { AppSettings } from "./AppSettings";



@Injectable()
export class UserService {
    private person: Person;
    private token: Token;

    @Output() userChanged: EventEmitter<Person> = new EventEmitter<Person>();

    constructor(
        private api: ApiAccessService,
        @Inject(PLATFORM_ID) private platformId: Object) {

        if (isPlatformBrowser(this.platformId)) {

            let tokenCode = localStorage.getItem(`token`);

            if (tokenCode && tokenCode.length) {
                this.token = {
                    Code: tokenCode
                } as Token

                AppSettings.AccessToken = tokenCode;

            }


            let p = localStorage.getItem(`user`);

            if (p && p.length) {
                this.person = JSON.parse(p) as Person;
            }
        }
    }

    updateUser(person: Person) {
        if (isPlatformBrowser(this.platformId) && person) {
            this.person = person;
            localStorage.setItem(`user`, JSON.stringify(this.person));
        }
    }

    getUser(): Person {
        if (!this.person) {
            if (isPlatformBrowser(this.platformId)) {
                let p = localStorage.getItem(`user`);

                if (p && p.length) {
                    this.person = JSON.parse(p) as Person;
                }
                this.userChanged.emit(this.person);
            }
        }
        return this.person;
    }

    getTokenCode(): string {
        return this.token ? this.token.Code : undefined;
    }

    logIn(login: string, password: string): Promise<Token> {

        return new Promise((resolve, reject) => {

            this.api.genericGet<Token>(`account/login`, `login=${login}&password=${password}`, true)
                .subscribe(res => {

                    this.applyToken(res);

                    resolve(res);

                }, err => {
                    reject(err);
                })
        })

    }

    socialLogIn(provider: string, accesToken: string, userId: string, person: Person): Promise<Token> {

        return new Promise((resolve, reject) => {


            this.api.genericPost<Token>('account/social/signin', {
                provider: provider,
                accessToken: accesToken,
                userId: userId,
                person: person
            }, true).subscribe(res => {
                this.applyToken(res);
                resolve(res);
            }, err => {
                reject(err);
            })
        })

    }

    private applyToken(token: Token) {
        if (!token) { return; }

        this.token = { Code: token.Code } as Token;
        this.person = token.Person;

        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(`user`, JSON.stringify(this.person));
            localStorage.setItem(`token`, token.Code);
        }
        this.userChanged.emit(this.person);

        AppSettings.AccessToken = token.Code;

    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(`user`);
            localStorage.removeItem(`token`);
        }

        this.userChanged.emit(null);
        AppSettings.AccessToken = undefined;


    }

}

