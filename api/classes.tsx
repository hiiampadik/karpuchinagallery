import {PortableTextBlock} from '@portabletext/types';


export class Homepage {
    public constructor(
        public readonly OnDisplay: Exhibition,
        public readonly Upcoming: Exhibition,
    ) {}

    public static fromPayload(payload: any, locale: string): Homepage {
        return new Homepage(
            Exhibition.fromPayload(payload.onDisplay, locale),
            Exhibition.fromPayload(payload.upcoming, locale),
        );
    }
}



export class About {
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
    public constructor(
        public readonly Id: string,
        public readonly Name: string,
        public readonly Slug: string,
        public readonly Bio: PortableTextBlock,
        public readonly Cover: any, // required
    ) {}

    public static fromPayload(payload: any, locale: string): Artist {
        return new Artist(
            payload._id,
            payload.name,
            payload.slug.current,
            payload.bio[locale],
            payload.cover,
        );
    }
}

export class Exhibition {
    public constructor(
        public readonly Id: string,
        public readonly Title: string,
        public readonly Slug: string,
        public readonly Artists: {Id: string, Name: string}[] | undefined | null,
        public readonly StartDate: string,
        public readonly EndDate: string | undefined,
        public readonly Color: string | undefined,
        public readonly Cover: any, // todo
        public readonly Document: any | undefined, // todo
        public readonly Curator: string,
        public readonly CuratorsText: PortableTextBlock,

    ) {}

    public static fromPayload(payload: any, locale: string): Exhibition {
        return new Exhibition(
            payload._id,
            payload.title[locale],
            payload.slug.current,
            payload.artists.map((artist: any) => ({Id: artist._id, Name: artist.name})),
            payload.startDate,
            payload.endDate,
            payload.color !== undefined && payload.color.hex,
            payload.cover,
            payload.document,
            payload.curator,
            payload.curatorsText[locale],
        );
    }
}


export class Artwork {
    public constructor(
        public readonly Id: string,
        public readonly Title: string,
        public readonly ArtistsId: string,
        public readonly ShowInSelection: boolean,
        public readonly Cover: any, // todo
            ) {}

    public static fromPayload(payload: any, locale: string): Artwork {
        return new Artwork(
            payload._id,
            payload.title,
            payload.artist._ref,
            payload.showInSelection,
            payload.cover,
        );
    }
}