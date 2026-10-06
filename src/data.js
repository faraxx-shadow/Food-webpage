export const categories = [
    {
      id: 1,
      name: "Pizza",
      emoji: "🍕",
    },
    {
      id: 2,
      name: "Burger",
      emoji: "🍔",
    },
    {
      id: 3,
      name: "Biryani",
      emoji: "🍛",
    },
    {
      id: 4,
      name: "Chinese",
      emoji: "🥡",
    },
    {
      id: 5,
      name: "Desserts",
      emoji: "🍰",
    },
    {
      id: 6,
      name: "Drinks",
      emoji: "🥤",
    },
  ];
  
  export const restaurants = [
    {
      id: "r1",
      name: "The Pizza House",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800",
      rating: 4.6,
      deliveryTime: 30,
      priceForTwo: 500,
      cuisines: ["Pizza", "Italian", "Fast Food"],
      location: "Downtown",
      featured: true,
      menu: [
        {
          id: "p1",
          name: "Margherita Pizza",
          description: "Classic pizza with tomato, mozzarella, and basil.",
          price: 249,
          category: "Pizza",
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
          veg: true,
        },
        {
          id: "p2",
          name: "Farmhouse Pizza",
          description: "Loaded with fresh vegetables and cheese.",
          price: 349,
          category: "Pizza",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
          veg: true,
        },
        {
          id: "p3",
          name: "Chicken Pepperoni Pizza",
          description: "Spicy chicken pepperoni with extra cheese.",
          price: 449,
          category: "Pizza",
          image:
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
          veg: false,
        },
      ],
    },
    {
      id: "r2",
      name: "Yaa Mohaidheen Biryani",
      image: "/images/biryani.png",
      rating: 4.8,
      deliveryTime: 35,
      priceForTwo: 600,
      cuisines: ["Biryani", "Indian", "Mughlai"],
      location: "Central Market",
      featured: true,
      menu: [
        {
          id: "b1",
          name: "Chicken Biryani",
          description: "Fragrant basmati rice with tender chicken.",
          price: 299,
          category: "Biryani",
          image:
            "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
          veg: false,
        },
        {
          id: "b2",
          name: "Veg Biryani",
          description: "Aromatic rice cooked with seasonal vegetables.",
          price: 229,
          category: "Biryani",
          image:
            "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500",
          veg: true,
        },
        {
          id: "b3",
          name: "Paneer Tikka",
          description: "Grilled cottage cheese with Indian spices.",
          price: 259,
          category: "Indian",
          image:
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
          veg: true,
        },
      ],
    },
    {
      id: "r3",
      name: "Burger Junction",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
      rating: 4.4,
      deliveryTime: 25,
      priceForTwo: 450,
      cuisines: ["Burger", "Fast Food", "American"],
      location: "Park Street",
      featured: true,
      menu: [
        {
          id: "h1",
          name: "Classic Cheese Burger",
          description: "Juicy patty with cheese, lettuce, and tomato.",
          price: 199,
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
          veg: false,
        },
        {
          id: "h2",
          name: "Veggie Burger",
          description: "Crispy vegetable patty with fresh salad.",
          price: 169,
          category: "Burger",
          image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500",
          veg: true,
        },
        {
          id: "h3",
          name: "French Fries",
          description: "Crispy golden fries with seasoning.",
          price: 99,
          category: "Fast Food",
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
          veg: true,
        },
      ],
    },
    {
      id: "r4",
      name: "Dragon Bowl",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      rating: 4.3,
      deliveryTime: 40,
      priceForTwo: 550,
      cuisines: ["Chinese", "Asian", "Noodles"],
      location: "Lake View",
      featured: false,
      menu: [
        {
          id: "c1",
          name: "Hakka Noodles",
          description: "Stir-fried noodles with vegetables and sauces.",
          price: 219,
          category: "Chinese",
          image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
          veg: true,
        },
        {
          id: "c2",
          name: "Fried Rice",
          description: "Chinese-style rice with vegetables and spices.",
          price: 199,
          category: "Chinese",
          image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
          veg: true,
        },
      ],
    },
  ];
  