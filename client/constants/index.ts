import { FeaturedType } from "../types/FeaturedType"

export const categories = [
    {
        id: 1,
        name: 'Pizza',
        image: require("../assets/categories/icons8-pizza-96.png")
    },
    {
        id: 2,
        name: 'Burger',
        image: require("../assets/categories/icons8-hamburger-96.png")
    },
    {
        id: 3,
        name: 'Italian',
        image: require("../assets/categories/icons8-spaghetti-96.png")
    },
    {
        id: 4,
        name: 'Chinese',
        image: require("../assets/categories/icons8-takeout-box-96.png")
    },
    {
        id: 5,
        name: 'Noodles',
        image: require("../assets/categories/icons8-cupcake-emoji-96.png")
    }
]

export const featured: FeaturedType = {
    id: 1,
    title: "Hot and spicy",
    description: "Soft and tender fried chicken",
    restaurants: [
        {
            id: 1,
            name: "Baron Restaurant",
            image: require("../assets/restaurants/baron-restaurant.jpg"),
            lng: 40.181633648075156, 
            lat: 44.51106684775562,
            address: "28/75 Yeznik Koghbatsi St, Yerevan 0002",
            stars: 4,
            reviews: 133,
            category: "Fast Food",
            dishes: [
                {
                    id: 1,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 2,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                },{
                    id: 3,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 4,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                }
            ]
        },
        {
            id: 2,
            name: "Baron Restaurant",
            image: require("../assets/restaurants/baron-restaurant.jpg"),
            lng: 40.181633648075156, 
            lat: 44.51106684775562,
            address: "28/75 Yeznik Koghbatsi St, Yerevan 0002",
            stars: 4,
            reviews: 133,
            category: "Fast Food",
            dishes: [
                {
                    id: 1,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 2,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                },{
                    id: 3,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 4,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                }
            ]
        },
        {
            id: 3,
            name: "Baron Restaurant",
            image: require("../assets/restaurants/baron-restaurant.jpg"),
            lng: 40.181633648075156, 
            lat: 44.51106684775562,
            address: "28/75 Yeznik Koghbatsi St, Yerevan 0002",
            stars: 4,
            reviews: 133,
            category: "Fast Food",
            dishes: [
                {
                    id: 1,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 2,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                },{
                    id: 3,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 4,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                }
            ]
        },
        {
            id: 4,
            name: "Baron Restaurant",
            image: require("../assets/restaurants/baron-restaurant.jpg"),
            lng: 40.181633648075156, 
            lat: 44.51106684775562,
            address: "28/75 Yeznik Koghbatsi St, Yerevan 0002",
            stars: 4,
            reviews: 133,
            category: "Fast Food",
            dishes: [
                {
                    id: 1,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 2,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                },{
                    id: 3,
                    name: "Pizza",
                    description: "cheezy garlic pizza",
                    price: 10,
                    image: require("../assets/dishes/pizza.jpeg")
                },
                {
                    id: 4,
                    name: "Burger",
                    description: "Burger",
                    price: 10,
                    image: require("../assets/dishes/burger.jpeg")
                }
            ]
        }
    ]
}