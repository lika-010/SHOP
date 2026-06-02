import woman1 from "../assets/woman/face/1.jpg";
import woman2 from "../assets/woman/small/1.jpg";
import woman3 from "../assets/woman/small/1-1.jpg";
import woman4 from "../assets/woman/small/1-2.jpg";
import man1 from "../assets/man/face/1.jpg";
import man2 from "../assets/man/small/1.jpg";
import man3 from "../assets/man/small/1-1.jpg";
import man4 from "../assets/man/small/1-2.jpg";
import woman1_1 from "../assets/woman/face/2.jpg";
import woman1_2 from "../assets/woman/small/2.jpg";
import woman1_3 from "../assets/woman/small/2-1.jpg";
import woman1_4 from "../assets/woman/small/2-2.jpg";
import woman2_1 from "../assets/woman/face/3.png";
import woman2_2 from "../assets/woman/small/3.png";
import woman2_3 from "../assets/woman/small/3-1.png";
import woman2_4 from "../assets/woman/small/3-2.jpg";
import woman3_1 from "../assets/woman/face/4.jpg";
import woman3_2 from "../assets/woman/small/4.jpg";
import woman4_1 from "../assets/woman/face/5.jpg";
import woman4_2 from "../assets/woman/small/5.jpg";
import woman4_3 from "../assets/woman/small/5-1.jpg";
import woman4_4 from "../assets/woman/small/5-2.jpg";
import woman5_1 from "../assets/woman/face/6.jpg";
import woman5_2 from "../assets/woman/small/6.png";
import woman5_3 from "../assets/woman/small/6-1.png";
import woman6_1 from "../assets/woman/face/7.png";
import woman6_2 from "../assets/woman/small/7.png";
import woman6_3 from "../assets/woman/small/7-1.png";
import woman6_4 from "../assets/woman/small/7-2.png";
import woman7_1 from "../assets/woman/face/8.png";
import woman7_2 from "../assets/woman/small/8.jpg";
import woman7_3 from "../assets/woman/small/8-1.jpg";
import woman7_4 from "../assets/woman/small/8-2.jpg";
import woman8_1 from "../assets/woman/face/9.jpg";
import woman8_2 from "../assets/woman/small/9.jpg";
import woman8_3 from "../assets/woman/small/9-1.jpg";
import woman8_4 from "../assets/woman/small/9-2.jpg";
import woman9_1 from "../assets/woman/face/10.jpg";
import woman9_2 from "../assets/woman/small/10.jpg";
import woman9_3 from "../assets/woman/small/10-1.jpg";
import woman9_4 from "../assets/woman/small/10-2.jpg";
import man2_1 from "../assets/man/face/2.jpg";
import man2_2 from "../assets/man/small/2.jpg";
import man2_3 from "../assets/man/small/2-1.jpg";
import man2_4 from "../assets/man/small/2-2.jpg";
import man3_1 from "../assets/man/face/3.jpg";
import man3_2 from "../assets/man/small/3.jpg";
import man3_3 from "../assets/man/small/3-1.jpg";
import man3_4 from "../assets/man/small/3-2.jpg";
import man4_1 from "../assets/man/face/4.jpg";
import man4_2 from "../assets/man/small/4.jpg";
import man4_3 from "../assets/man/small/4-1.jpg";
import man5_1 from "../assets/man/face/5.jpg";
import man5_2 from "../assets/man/small/5.jpg";
import man5_3 from "../assets/man/small/5-1.jpg";
import man5_4 from "../assets/man/small/5-2.jpg";
import man6_1 from "../assets/man/face/6.jpg";
import man6_2 from "../assets/man/small/6.jpg";
import man6_3 from "../assets/man/small/6-1.jpg";
import man6_4 from "../assets/man/small/6-2.jpg";






const products = [
    {
    id: 1,
    name: "STRIPED SHIRT",
    category: "Women",
    type: "shirt",
    tag: "new",
    price: 35,
    salePrice: 29,
    image: woman1,
    images: [
      woman1,
      woman2,
      woman3,
      woman4,
    ],
    featured: true
  },
  {
    id: 2,
    name: "LEGACY T-SHIRT",
    category: "Men",
    type: "Tshirt",
    tag: "best",
    price: 22,
    salePrice: null,
    image: man1,
    images: [
      man1,
      man2,
      man3,
      man4,
    ],
    featured: true
  },
  {
    id: 3,
    name: "INTROVERSE DOUBLE ZIP HOODIE",
    category: "Women",
    type: "Hoodie",
    tag: "discount",
    price: 40,
    salePrice: 34,
    image: woman1_1,
    images: [
      woman1_1,
      woman1_2,
      woman1_3,
      woman1_4,
    ],
    featured: true
  },
  {
    id: 4,
    name: "VIE MIDI SKIRT",
    category: "Women",
    type: "Skirt",
    tag: null,
    price: 50,
    salePrice: null,
    image: woman2_1,
    images: [
      woman2_1,
      woman2_2,
      woman2_3,
      woman2_4,
    ],
    featured: true
  },
  {
    id: 5,
    name: "BALANCE BASIC HOODIE",
    category: "Men",
    type: "Hoodie",
    tag: "new",
    price: 28,
    salePrice: 24,
    image: man2_1,
    images: [
      man2_1,
      man2_2,
      man2_3,
      man2_4,
    ],
    featured: true
  },
  {
    id: 6,
    name: "Wide Leg Denim Jeans",
    category: "Men",
    type: "Pants",
    tag: null,
    price: 60,
    salePrice: 50,
    image: man3_1,
    images: [
      man3_1,
      man3_2,
      man3_3,
      man3_4,
    ],
    featured: true
  },
  {
    id: 7,
    name: "LEGACY LONGSLEEVE",
    category: "Women",
    type: "Shirt",
    tag: "best",
    price: 30,
    salePrice: null,
    image: woman3_1,
    images: [
      woman3_1,
      woman3_2,
    ],
    featured: true
  },
  {
    id: 8,
    name: "WASHED BABYTEE",
    category: "Women",
    type: "Shirt",
    tag: null,
    price: 25,
    salePrice: null,
    image: woman4_1,
    images: [
      woman4_1,
      woman4_2,
      woman4_3,
    ],
    featured: false
  },
  {
    id: 9,
    name: "JOY CORSET TOP",
    category: "Women",
    type: "Shirt",
    tag: "new",
    price: 45,
    salePrice: 39,
    image: woman5_1,
    images: [
      woman5_1,
      woman5_2,
    ],
    featured: true
  },
  {
    id: 10,
    name: "TTP BOXY PLAID SHIRT",
    category: "Men",
    type: "Shirt",
    tag: "best",
    price: 55,
    salePrice: null,
    image: man4_1,
    images: [
      man4_1,
      man4_2,
    ],
    featured: true
  },
  {
    id: 11,
    name: "NAGA DIVISION HOODIE",
    category: "Women",
    type: "Hoodie",
    tag: "new",
    price: 35,
    salePrice: 29,
    image: man5_1,
    images: [
      man5_1,
      man5_2,
      man5_3,
      man5_4,
    ],
    featured: true
  },
  {
    id: 12,
    name: "WASHED SHORT",
    category: "Men",
    type: "Pants",
    tag: "discount",
    price: 45,
    salePrice: null,
    image: man6_1,
    images: [
      man6_1,
      man6_2,
      man6_3,
      man6_4,
    ],
    featured: true
  },
  {
    id: 13,
    name: "GRACE PANTS",
    category: "Women",
    type: "Pants",
    tag: "best",
    price: 20,
    salePrice: 17,
    image: woman6_1,
    images: [
      woman6_1,
      woman6_2,
      woman6_3,
      woman6_4,
    ],
    featured: true
  },
  {
    id: 14,
    name: "SOUL TOP",
    category: "Women",
    type: "Shirt",
    tag: null,
    price: 20,
    salePrice: 17,
    image: woman7_1,
    images: [
      woman7_1,
      woman7_2,
      woman7_3,
      woman7_4,
    ],
    featured: true
  },
  {
    id: 15,
    name: "Satin Long Sleeves Shirt",
    category: "Women",
    type: "Shirt",
    tag: "discount",
    price: 25,
    salePrice: 20,
    image: woman8_1,
    images: [
      woman8_1,
      woman8_2,
      woman8_3,
      woman8_4,
    ],
    featured: true
  },
  {
    id: 16,
    name: "Midi Dress",
    category: "Women",
    type: "Dress",
    tag: "discount",
    price: 45,
    salePrice: null,
    image: woman9_1,
    images: [
      woman9_1,
      woman9_2,
      woman9_3,
      woman9_4,
    ],
    featured: true
  }
];

export default products;