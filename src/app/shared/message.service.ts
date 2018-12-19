import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogSimple } from "../components/dialog/dialog-simple";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MessageService {
    constructor(public dialog: MatDialog,
        private translation: TranslateService) {

    }

    showDialog(title: string, message: string, msgSuffix: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.translation.get([title, message]).subscribe(res => {

                let dialogRef = this.dialog.open(DialogSimple, {
                    width: '250px',
                    data: { title: res[title], message: res[message] + msgSuffix }
                });

                dialogRef.afterClosed().subscribe(result => {
                    resolve(result);
                });
            })
        })

    }
}