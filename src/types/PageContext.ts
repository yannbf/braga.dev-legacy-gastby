type Pagination = {
  fields: {
    title: string;
    slug: string;
  };
};

export type PageContext = {
  next: Pagination;
  prev: Pagination;
};

export type BlogPageContext = {
  pagination: {
    page: string[];
    nextPagePath: string | null;
    previousPagePath: string | null;
    pageCount: number;
    pathPrefix: string;
    categories: string[];
    activeCategory?: string;
  };
};
