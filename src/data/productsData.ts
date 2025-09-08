export type Product = {
  id: number;
  price: number;
  brand: string;
  category: string;
  title: string;
  description: string;
  rating?: number;
  image: string;
};

import MacBook1 from "../assets/featured/Macbook.png";
import Digital_Lens from "../assets/featured/Digital_Lens.png";
import MacBook2 from "../assets/featured/MacBook2.png";
import Iphone15 from "../assets/featured/Iphone3.png";
import Sumsung from "../assets/featured/phone2.png";
import Laptop from "../assets/featured/laptop.png";
import Laptop2 from "../assets/featured/MacBook3.png";
import Iphone4 from "../assets/featured/iphone4.png";

export const productsData: Product[] = [
  {
    id: 1,
    price: 949.99,
    brand: "Apple",
    category: "Laptops",
    title: "Apple MacBook Pro 2020 | 13.3 | TouchBar ",
    description:
      "RAM 16.0 GB  | Memory 512 GB  Keyboard layout Eng (English)  ",
    rating: 4.8,
    image: Laptop2,
  },
  {
    id: 2,
    price: 449.99,
    brand: "Apple",
    category: "Phones",
    title: "iPhone 15",
    description: "128 GB | Dual SIM | blue Unlocked",
    rating: 4.5,
    image: Iphone15,
  },
  {
    id: 3,
    price: 449.99,
    brand: "Sony",
    category: "Cameras",
    title: "Sony Alpha 7 III with28-70mm zoom lens, 24.2MP* 35mm ",
    description: "Full-frame Exmor R CMOS sensor with 24.2 MP for BIONZ",
    rating: 4.6,
    image: Digital_Lens,
  },
  {
    id: 4,
    price: 349,
    brand: "Sony",
    category: "Watches",
    title: "",
    description: "",
    rating: 4.7,
    image: Iphone4,
  },
  {
    id: 5,
    price: 999,
    brand: "Apple",
    category: "Computers",
    title: "HP EliteBook 840 G5 | i5-8350U | 14",
    description:
      "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | silver | SE",
    rating: 4.9,
    image: MacBook2,
  },
  {
    id: 6,
    price: 1299,
    brand: "Apple",
    category: "Phones",
    title: "iPad 9 (2021) | 10.2",
    description: "64GB | silver",
    rating: 4.4,
    image: Sumsung,
  },
  {
    id: 7,
    price: 449.99,
    brand: "Samsung",
    category: "Phones",
    title: "Samsung Galaxy S22 Ultra 5G",
    description: "8GB | 128 GB | Dual-SIM | Phantom Black",
    rating: 4.5,
    image: Sumsung,
  },
  {
    id: 8,
    price: 449.99,
    brand: "Lenovo",
    category: "Laptops",
    title: "Lenovo Thinkpad T14 G1 | i7-10610U | 14",
    description:
      "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | ND",
    rating: 4.5,
    image: Laptop,
  },
  {
    id: 9,
    price: 749.99,
    brand: "Apple",
    category: "Laptops",
    title: "Apple MacBook Pro 2019 | 16",
    description:
      "RAM 16.0 GB  | Memory 512 GB  Keyboard layout Eng (English)  ",
    rating: 4.5,
    image: MacBook1,
  },
];
