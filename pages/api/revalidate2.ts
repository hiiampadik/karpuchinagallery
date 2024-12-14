import { isValidRequest } from "@sanity/webhook"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    message: string
}

const secret = process.env.SANITY_WEBHOOK_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST") {
        console.error("R2 Must be a POST request")
        return res.status(401).json({ message: "R2 Must be a POST request" })
    }

    if (!isValidRequest(req, secret as string)) {
        res.status(401).json({ message: "R2 Invalid signature" })
        return
    }

    try {
        const {
            body: { type, slug },
        } = req

        switch (type) {
            case "exhibitions":
                await res.revalidate(`/exhibition/${slug}`)
                return res.json({ message: `R2 Revalidated "${type}" with slug "${slug}"` })
            case "fairs":
                await res.revalidate(`/fair/${slug}`)
                return res.json({ message: `R2 Revalidated "${type}" with slug "${slug}"` })
            case "artists":
                await res.revalidate(`/artist/${slug}`)
                return res.json({ message: `R2 Revalidated "${type}" with slug "${slug}"` })
            case "artistsEvents":
                await res.revalidate(`/artistEvent/${slug}`)
                return res.json({ message: `R2 Revalidated "${type}" with slug "${slug}"` })
        }

        return res.json({ message: "R2 No managed type" })
    } catch (err) {
        return res.status(500).send({ message: "R2 Error revalidating" })
    }
}