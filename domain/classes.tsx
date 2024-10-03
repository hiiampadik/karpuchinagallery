

export class About {
    public constructor(
        public readonly Contact: any,
        public readonly Address: any,
        public readonly Connect: any,
        public readonly Footer: any,
        public readonly Open: any,
        public readonly Bio: any,
        public readonly Logos: any,
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
