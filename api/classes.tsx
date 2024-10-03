import {PortableTextBlock} from '@portabletext/types';


export class About {

    // todo anys
    public constructor(
        public readonly Contact: PortableTextBlock,
        public readonly Address: PortableTextBlock,
        public readonly Connect: PortableTextBlock,
        public readonly Footer: PortableTextBlock,
        public readonly Open: PortableTextBlock,
        public readonly Bio: PortableTextBlock,
        public readonly Logos: PortableTextBlock,
    ) {}

    public static fromPayload(payload: any, locale: string): About {
        return new About(
            payload.contact[locale],
            payload.address[locale],
            payload.connect[locale],
            payload.footer[locale],
            payload.open[locale],
            payload.bio[locale],
            payload.logos
        );
    }
}

export class Artist {

    // todo anys
    public constructor(
        public readonly Name: string,
        public readonly Slug: string,
        public readonly Bio: PortableTextBlock,
    ) {}

    public static fromPayload(payload: any, locale: string): Artist {
        return new Artist(
            payload.name,
            payload.slug.current,
            payload.bio[locale],
        );
    }
}

export class Exhibition {

    // todo anys
    public constructor(
        public readonly Title: string,
        public readonly Slug: string,
        public readonly Artists: any[],
    ) {}

    public static fromPayload(payload: any, locale: string): Exhibition {
        return new Exhibition(
            payload.title[locale],
            payload.slug.current,
            payload.artists,
        );
    }
}
