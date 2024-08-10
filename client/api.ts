import sanityClient from "./sanity"

const sanityQuery = (query: string, params?: any) => sanityClient.fetch(query, params);

export const getFeaturedRestaurants = () => {
    return sanityQuery(`
            *[_type=="featured"] {
            ...,
            name,
            description,
            image,
            lat,
            lng,
            address,
            reviews,
            rating,
            type,
            
            restaurants[] -> {
                ...,
                dishes[] -> {
                ...
                },
                type -> {
                    ...
                }
            }
        }
    `)
}

export const getCategories = () => {
    return sanityQuery(`
        *[_type=="category"]    
    `)
}

export const getFeaturedByResturantId = (id: string) => {
    return sanityQuery(`
        *[_type=="featured" && _id == $id] {
            ...,
            restaurants[] -> {
                ...,
                dishes[] ->,
                type -> {
                    name
                }
            }
        }[0]
        `, { id })
}