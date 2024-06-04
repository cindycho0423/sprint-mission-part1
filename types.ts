export type ArticleProps = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: null | string;
  content: string;
  title: string;
  id: number;
};

type Writer = {
  nickname: string;
  id: number;
};
