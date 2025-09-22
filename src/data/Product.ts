
export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  oldPrice: number;
  discount: string;
  images: any[];   
  sizes: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Squishmallows Official Kellytoy Plush 12" Maui The Pineapple',
    brand: 'Squishmallows',
    price: 50.0,
    oldPrice: 70.0,
    discount: '28% OFF',
    images: [
      require('../assets/images/Image.png'),
      require('../assets/images/back.png'),
      require('../assets/images/girl.png'),
      require('../assets/images/Img2.png'),
    ],
    sizes: ['5', '8', '12', '24'],
  }

];
