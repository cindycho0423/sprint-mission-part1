import { axiosInstance } from './axios';

type ItemsResponse = {
  updatedAt: string;
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
};

type GetItemResponse = {
  totalCount: number;
  list: ItemsResponse[];
};

export const getItems = async (): Promise<GetItemResponse> => {
  try {
    const response = await axiosInstance.get<GetItemResponse>('/products');
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};

export type ItemResponse = {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string;
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
};

export const getItemsId = async (productId: string): Promise<ItemResponse | undefined> => {
  try {
    const productIdNumber = parseInt(productId);
    const response = await axiosInstance.get<ItemResponse>(`/products/${productIdNumber}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch items: ${error}`);
    console.error(`정보를 불러오는데 실패했습니다`);
  }
};

type WriterResponse = {
  nickname: string;
  image: string;
  id: number;
};

export type GetCommentsResponse = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: WriterResponse;
};

type GetCommentListResponse = {
  nextCursor: number;
  list: GetCommentsResponse[];
};

export const getItemsComments = async (
  productId: string,
  limit: number
): Promise<GetCommentListResponse | undefined> => {
  try {
    const response = await axiosInstance.get<GetCommentListResponse>(`/products/${productId}/comments`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return undefined;
  }
};
