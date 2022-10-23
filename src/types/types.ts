export interface CardProps {
  image_url: string;
  price: number;
  id: number;
  name: string;
  category: string;
}

export type SortType = {
  title: string;
  sort: string;
};

export type SortProps = {
  title: string;
  name: string;
};
