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
        public readonly Logos: Image[],
    ) {}

    public static fromPayload(payload: any, locale: string): About {
        return new About(
            payload.contact[locale],
            payload.address[locale],
            payload.connect[locale],
            payload.footer[locale],
            payload.open[locale],
            payload.bio[locale],
            payload.logos.map((logo: any) => Image.fromPayload(logo, locale)),
        );
    }
}

export class Image {
    public constructor(
        public readonly Id: string,
        public readonly Image: PortableTextBlock,
        public readonly Alt: string,
    ) {}

    public static fromPayload(payload: any, locale: string): Image {
        return new Image(
            payload._key,
            payload.image,
            payload.alt,
        );
    }
}

export class ArtistItem {
    public constructor(
        public readonly Id: string,
        public readonly Year: string,
        public readonly Title: PortableTextBlock,
    ) {}

    public static fromPayload(payload: any, locale: string): ArtistItem {
        return new ArtistItem(
            payload._key,
            payload.year,
            payload.title[locale],
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
        public readonly SoloExhibitions?: ArtistItem[],
        public readonly GroupExhibitions?: ArtistItem[],
        public readonly Education?: ArtistItem[],
        public readonly Awards?: ArtistItem[],

    ) {}

    public static fromPayload(payload: any, locale: string): Artist {
        return new Artist(
            payload._id,
            payload.name,
            payload.slug.current,
            payload.bio[locale],
            payload.cover,
            payload.soloExhibitions?.map((exhibition: any) => ArtistItem.fromPayload(exhibition, locale)),
            payload.groupExhibitions?.map((exhibition: any) => ArtistItem.fromPayload(exhibition, locale)),
            payload.education?.map((edu: any) => ArtistItem.fromPayload(edu, locale)),
            payload.awards?.map((award: any) => ArtistItem.fromPayload(award, locale)),
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
        public readonly Year: string | null,
        public readonly ArtistsId: string,
        public readonly ShowInSelection: boolean,
        public readonly Cover: any, // todo
            ) {}

    public static fromPayload(payload: any, locale: string): Artwork {
        return new Artwork(
            payload._id,
            payload.title,
            payload.year ?? null,
            payload.artist._ref,
            payload.showInSelection,
            payload.cover,
        );
    }
}