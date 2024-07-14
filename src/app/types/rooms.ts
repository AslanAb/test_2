export interface IFormRoom {
  room_type_id: string;
  gallery_images: string[];
  comforts: string[];
  food_types: string[];
  price: string;
  quantity: string;
  square: string;
  min_booking_period: string;
  smoking: boolean;
  cot_quantity: string;
  cot_price: string;
  fine: string;
  cancellation_id: string;
  check_in: Date;
  check_out: string;
  ru_title: string;
  kz_title: string;
  en_title: string;
  ru_description: string;
  kz_description: string;
  en_description: string;
}
