import {defineQuery} from "next-sanity";

export const QUERY_ALL_SLUGS = defineQuery(`
    *[defined(slug.current)][].slug.current
`)

export const QUERY_SEARCH = defineQuery(`
*[_type in ["exhibitions", "fairs", "artistsEvents"] && (
    title.cs match $queryString ||
    title.en match $queryString ||
    artists[] match $queryString
)] {
    ..., 
    _id, 
    title, 
    slug, 
    artists, 
    openingDate, 
    fromDate, 
    toDate, 
    color, 
    cover
}
`)

// Main pages

export const QUERY_HOMEPAGE = defineQuery(`
    *[_type == 'homepage'][0]{
    onDisplay->{
        ...
    },
    upcoming->{
        ...
    }
}`)

export const QUERY_ABOUT = defineQuery(`
    *[_type == 'about'][0]
`)

// Pages with overview

export const QUERY_ALL_ARTISTS = defineQuery(`*[_type == "artists"] | order(orderRank){
    _id,
    name,
    slug,
    cover,
}`)

export const QUERY_ALL_ARTWORKS = defineQuery(`*[_type == "artworks"] | order(orderRank) {
    _id,
    title,
    year,
    artist->{
        _id,
        name,
        slug
    },
    showInSelection,
    cover,
    info,
    gallery
}`)

export const QUERY_ALL_EXHIBITIONS = defineQuery(`*[_type == "exhibitions"] | order(orderRank) {
    _id,
    _type,
    title,
    slug,
    artists[0...3],
    openingDate,
    fromDate,
    toDate,
    color,
    cover,
}`)

export const QUERY_ALL_FAIRS = defineQuery(`*[_type == "fairs"] | order(orderRank) {
    _id,
    _type,
    title,
    slug,
    artists,
    openingDate,
    fromDate,
    toDate,
    color,
    cover,
}`)



// Dynamic pages

export const QUERY_ARTIST_SLUGS = defineQuery(`
*[_type == "artists" && defined(slug.current)][].slug.current`)

export const QUERY_ARTIST = defineQuery(`
{"artist": *[_type == "artists" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ...,
     events[]->{
        ...
    },
}}`)

export const QUERY_ARTISTS_EVENTS_SLUGS = defineQuery(`
*[_type == "artistsEvents" && defined(slug.current)][].slug.current
`)
export const QUERY_ARTISTS_EVENTS = defineQuery(`
{"event": *[_type == "artistsEvents" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ...,
    artworks[]-> | order(orderRank){
        _id,
        title,
        year,
        artist->{
            _id,
            name,
            slug
        },
        showInSelection,
        cover,
        gallery
    },
    documents[]{
        ...,
        documentCover{
            ...,
        },
        file{
            ...,
            asset->{
                ...
            }
        }
    }
    }}
`)

export const QUERY_EXHIBITION_SLUGS = defineQuery(`
*[_type == "exhibitions" && defined(slug.current)][].slug.current
`)
export const QUERY_EXHIBITION = defineQuery(`
{"event": *[_type == "exhibitions" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ...,
    artworks[]-> | order(orderRank){
        _id,
        title,
        year,
        artist->{
            _id,
            name,
            slug
        },
        showInSelection,
        cover,
        gallery
    },
    documents[]{
        ...,
        documentCover{
            ...,
        },
        file{
            ...,
            asset->{
                ...
            }
        }
    }
}}`)

export const QUERY_FAIR_SLUGS = defineQuery(`
*[_type == "fairs" && defined(slug.current)][].slug.current
`)
export const QUERY_FAIR = defineQuery(`
{"event": *[_type == "fairs" && slug.current == $slug] | order(_updatedAt desc) [0] {
                        ...,
                        artworks[]-> | order(orderRank){
                            _id,
                            title,
                            year,
                            artist->{
                                _id,
                                name,
                                slug
                            },
                            showInSelection,
                            cover,
                            gallery
                        },
                        documents[]{
                            ...,
                            documentCover{
                                ...,
                            },
                            file{
                                ...,
                                asset->{
                                    ...
                                }
                            }
                        }
                        }}
`)