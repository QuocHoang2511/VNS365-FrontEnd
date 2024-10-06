import { IBaseMaster } from "./common";
import { IUser } from "./user";

export interface IShop {
  id: number;
  name: string;
  description: string;
  address: string;
  phone_number: string;
  image: string;

  rating: number;

  status: string;

  region_id: number;
  region: IRegion;

  province_id: number;
  province: IRegion;

  shopFoods: IShopFood[];

  created_at: string;
  updated_at: string;
}

export interface IStory {
  id: number;
  featured_image: string;
  title: string;
  description: string;
  content: string;
  cooking_method: string;

  user_id: number;
  user: IUser;

  region_id: number;
  region: IBaseMaster;

  comments: IComment[];

  status: string;
  views: number;

  created_at: string;
  updated_at: string;

  userLikeStory: IUserLikeStory[];

  _count: {
    comments: number;
    userLikeStory: number;
  };
}

export interface IComment {
  id: number;

  comment_content: string;
  comment_timestamp: string;
  user_id: number;

  user: IUser;

  created_at: string;
  updated_at: string;
}

export interface IRegion {
  id: number;
  name: string;

  created_at: string;
  updated_at: string;
}

export interface IUserLikeStory {
  id: number;
  user_id: number;
  story_id: number;

  created_at: string;
  updated_at: string;
}

export interface IShopFood {
  id: number;
  food: string;
  shop_id: number;

  created_at: string;
  updated_at: string;
}
