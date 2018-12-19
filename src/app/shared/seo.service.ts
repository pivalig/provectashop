import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {

    constructor(private title: Title, private meta: Meta) {}

    getTitle(): string {
        return this.title.getTitle();
    }

    setTitle(title: string): SeoService {
        if (title) {
            title = title.trim();
        }
        this.title.setTitle(title);
        this.meta.updateTag({ property: "og:title", content: title });
        this.setMetaItemProp('title', title).setMetaName('twitter:title', title);
        return this;
    }

    setMetaItemProp(property: string, content: string): SeoService {
        if (content) {
            content= content.trim();
        }
        this.meta.updateTag({ itemprop: property, content: content });
        return this;
    }
    setMetaName(property: string, content: string): SeoService {
        if (content) {
            content= content.trim();
        }
        this.meta.updateTag({ name: property, content: content });
        return this;
    }
    setMeta(property: string, content: string): SeoService {
        if (content) {
            content= content.trim();
        }
        this.meta.updateTag({ property: property, content: content });

        if (property == 'og:image') {
            this.setMetaItemProp('image', content).setMetaName('twitter:image', content);
        }
        return this;
    }

    setDescription(description: string): SeoService {

        if (description && description.length && description != 'undefined') {
            description = description.replace(/<(?:.|\n)*?>/gm, '');

            this.meta.updateTag({
                name: 'description',
                content: description
            });

            this.meta.updateTag({
                name: 'og:description',
                content: description
            });

            this.setMetaItemProp('description', description);
        }

        return this;
    }
}
