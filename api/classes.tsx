import {PortableTextBlock} from '@portabletext/types';


export class Homepage {
    public constructor(
        public readonly OnDisplay: Event,
        public readonly Upcoming: Event,
    ) {}

    public static fromPayload(payload: any, locale: string): Homepage {
        return new Homepage(
            Event.fromPayload(payload.onDisplay, locale),
            Event.fromPayload(payload.upcoming, locale),
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
        public readonly Logos: Image[] | null,
        public readonly Gallery: Image[] | null,
    ) {}

    public static fromPayload(payload: any, locale: string): About {
        return new About(
            payload.contact[locale],
            payload.address[locale],
            payload.connect[locale],
            payload.footer[locale],
            payload.open[locale],
            payload.bio[locale],
            payload.logos?.map((logo: any) => Image.fromPayload(logo, locale)) ?? null,
            payload.gallery?.map((logo: any) => Image.fromPayload(logo, locale)) ?? null,
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
        public readonly SoloExhibitions: ArtistItem[] | null,
        public readonly GroupExhibitions: ArtistItem[] | null,
        public readonly Education: ArtistItem[] | null,
        public readonly Awards: ArtistItem[] | null,

    ) {}

    public static fromPayload(payload: any, locale: string): Artist {
        return new Artist(
            payload._id,
            payload.name,
            payload.slug.current,
            payload.bio[locale],
            payload.cover,
            payload.soloExhibitions?.map((exhibition: any) => ArtistItem.fromPayload(exhibition, locale)) ?? null,
            payload.groupExhibitions?.map((exhibition: any) => ArtistItem.fromPayload(exhibition, locale)) ?? null,
            payload.education?.map((edu: any) => ArtistItem.fromPayload(edu, locale)) ?? null,
            payload.awards?.map((award: any) => ArtistItem.fromPayload(award, locale)) ?? null,
        );
    }
}

export class Event {
    public constructor(
        public readonly Id: string,
        public readonly Title: string,
        public readonly Slug: string,
        public readonly Artists: {Id: string, Name: string, Slug: string}[] | null,
        public readonly StartDate: string,
        public readonly EndDate: string | null,
        public readonly Color: string | null,
        public readonly Cover: any, // todo
    ) {}

    public static fromPayload(payload: any, locale: string): Event {
        return new Event(
            payload._id,
            payload.title[locale],
            payload.slug.current,
            payload.artists?.map((artist: any) => ({Id: artist._id, Name: artist.name})) ?? null,
            payload.startDate,
            payload.endDate ?? null,
            payload.color?.hex ?? null,
            payload.cover,
        );
    }
}

export class EventDetail {
    public constructor(
        public readonly Id: string,
        public readonly Title: string,
        public readonly Slug: string,
        public readonly Artists: {Id: string, Name: string, Slug: string}[] | null,
        public readonly StartDate: string,
        public readonly EndDate: string | null,
        public readonly Color: string | null,
        public readonly Cover: any, // todo
        public readonly Documents: Document[] | null,
        public readonly CuratorsText: PortableTextBlock,
        public readonly Artworks: Artwork[] | null,
        public readonly Gallery: Image[] | null,
    ) {}

    public static fromPayload(payload: any, locale: string): EventDetail {
        return new EventDetail(
            payload._id,
            payload.title[locale],
            payload.slug.current,
            payload.artists?.map((artist: any) => ({Id: artist._id, Name: artist.name})) ?? null,
            payload.startDate,
            payload.endDate ?? null,
            payload.color?.hex ?? null,
            payload.cover,
            payload.documents?.map((document: any) => Document.fromPayload(document)) ?? null,
            payload.curatorsText[locale],
            payload.artworks?.map((artwork: any) =>  Artwork.fromPayload(artwork, locale)) ?? null,
            payload.gallery?.map((logo: any) => Image.fromPayload(logo, locale)) ?? null,
        );
    }
}


export class Artwork {
    public constructor(
        public readonly Id: string,
        public readonly Title: string,
        public readonly Year: string | null,
        public readonly Artist: {Id: string, Name: string, Slug: string},
        public readonly ShowInSelection: boolean,
        public readonly Cover: any, // todo,
        public readonly Info: PortableTextBlock | null

        // todo gallery
            ) {}

    public static fromPayload(payload: any, locale: string): Artwork {
        return new Artwork(
            payload._id,
            payload.title,
            payload.year ?? null,
            {Id: payload.artist._id, Name: payload.artist.name, Slug: payload.artist.slug.current },
            payload.showInSelection,
            payload.cover,
            payload.info ? payload.info[locale] : null,
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


export class Document {
    public constructor(
        public readonly Id: string,
        public readonly Url: string,
        public readonly Alt: string,
        public readonly Cover: any, // todo
    ) {}

    public static fromPayload(payload: any): Document {
        return new Document(
            payload._key,
            payload.file.asset.url,
            payload.alt,
            payload.documentCover,
        );
    }
}
