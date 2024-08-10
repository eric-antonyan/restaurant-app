import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'restaurant',
    title: 'Restaurants',
    type: 'document',
    fields: [
        {
            name: "name",
            type: "string",
            title: "Restaurant Name",
            validation: (rule) => rule.required()
        },
        {
            name: "description",
            type: "string",
            title: "Restaurant Description",
            validation: (rule) => rule.required()
        },
        {
            name: "image",
            type: "image",
            title: "image of the restaurant",
        },
        {
            name: "lat",
            type: "number",
            title: "latitude of the restaurant",
        },
        {
            name: "lng",
            type: "number",
            title: "longitude of the restaurant",
        },
        {
            name: "address",
            type: "string",
            title: "Restaurant address",
        },
        {
            name: "reviews",
            type: "number",
            title: "Reviews",
        },
        {
            name: "rating",
            type: "number",
            title: "Enter a number between 1 to 5",
            validation: (rule) => rule.required().min(1).max(5).error("Please enter value petween 1 to 5")
        },
        {
            name: "type",
            type: "reference",
            title: "Category",
            validation: (rule) => rule.required(),
            to: [{
                type: 'category'
            }]
        },
        {
            name: "dishes",
            type: "array",
            title: "Dishes",

            of: [{
                type: 'reference',
                to: [{
                    type: 'dish'
                }]
            }]
        }
    ],
})
