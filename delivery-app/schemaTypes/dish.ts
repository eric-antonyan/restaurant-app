import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'dish',
    title: 'Dish',
    type: 'document',
    fields: [
        {
            name: "name",
            type: "string",
            title: "Dish Name",
            validation: (rule) => rule.required()
        },
        {
            name: "description",
            type: "string",
            title: "Dish Description",
            validation: (rule) => rule.required()
        },
        {
            name: "price",
            type: "number",
            title: "Price of the dish",
        },
        {
            name: "image",
            type: "image",
            title: "Image of the dish in USD",
        }
    ],
})
