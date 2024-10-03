

export class About {
    public constructor(
        public readonly Contact: any,
        public readonly Address: any,
        public readonly Connect: any,
        public readonly Footer: any,
        public readonly Open: any,
        public readonly Bio: any,
        public readonly logos: any,
    ) {}

    public static fromPayload(payload: any, locale: string): About {
        return new About(
            payload.Contact[locale],
            payload.Address[locale],
            payload.Connect[locale],
            payload.Footer[locale],
            payload.Open[locale],
            payload.Bio[locale],
            payload.logos
        );
    }
}
