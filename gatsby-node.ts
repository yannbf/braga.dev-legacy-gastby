import path from 'path';
import { GatsbyNode, Actions } from 'gatsby';

const PAGINATION_OFFSET = 20;

export interface Node {
  fields: {
    categories: string[];
    title: string;
    slug: string;
  };
  id: string;
}

interface QueryResult {
  posts: {
    edges: {
      node: Node;
    }[];
  };
  projects: {
    edges: {
      node: Node;
    }[];
  };
}

const pluckCategories = (posts: QueryResult['posts']['edges']): string[] =>
  Object.keys(
    posts.reduce((acc: { [category: string]: string }, value) => {
      value.node.fields.categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = category;
        }
      });

      return acc;
    }, {}),
  );

const groupByCategory = (
  posts: QueryResult['posts']['edges'],
): {
  [category: string]: {
    node: Node;
  }[];
} =>
  posts.reduce((acc: { [category: string]: { node: Node }[] }, value) => {
    value.node.fields.categories.forEach((category) => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(value);
    });
    return acc;
  }, {});

const createPaginatedPages = (
  createPage: Actions['createPage'],
  posts: QueryResult['posts']['edges'],
  pathPrefix: string,
  context: {
    categories: string[];
    activeCategory?: string;
  },
): void => {
  const pages = posts.reduce((acc: string[][], value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET);

    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }

    acc[pageIndex].push(value.node.id);

    return acc;
  }, []);

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`;
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`;

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.tsx`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath: index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    });
  });
};

const createCategoryPages = (createPage: Actions['createPage'], posts: QueryResult['posts']['edges']): void => {
  const categories = pluckCategories(posts);

  const categorizedPosts = groupByCategory(posts);

  Object.keys(categorizedPosts).forEach((category) => {
    createPaginatedPages(createPage, categorizedPosts[category], `/categories/${category}`, {
      categories,
      activeCategory: category,
    });
  });
};

const createPosts = (createPage: Actions['createPage'], posts: QueryResult['posts']['edges']): void => {
  posts.forEach(({ node }, i) => {
    const prev = i === 0 ? null : posts[i - 1].node;
    const next = i === posts.length - 1 ? null : posts[i + 1].node;

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

const createProjects = (createPage: Actions['createPage'], projects: QueryResult['projects']['edges']): void => {
  projects.forEach(({ node }) => {
    createPage({
      path: `/projects${node.fields.slug}`,
      component: path.resolve(`./src/templates/project.tsx`),
      context: {
        id: node.id,
      },
    });
  });
};

const createBlog = (createPage: Actions['createPage'], posts: QueryResult['posts']['edges']): void => {
  const categories = pluckCategories(posts);

  createPaginatedPages(createPage, posts, '/blog', { categories });
};

export const createPages: GatsbyNode['createPages'] = ({ actions, graphql }) =>
  graphql<QueryResult>(`
    query {
      posts: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      ) {
        edges {
          node {
            id
            fields {
              title
              slug
              categories
            }
          }
        }
      }
      projects: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      ) {
        edges {
          node {
            id
            fields {
              title
              slug
              categories
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    // Projects are filtered out at the GraphQL query level
    const { edges: posts } = (data as QueryResult).posts;
    const { edges: projects } = (data as QueryResult).projects;

    createBlog(actions.createPage, posts);
    createPosts(actions.createPage, posts);
    createProjects(actions.createPage, projects);
    createCategoryPages(actions.createPage, posts);
  });

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx` && node.frontmatter !== undefined) {
    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/yannbf/personal-website/edit/master${(node as any).fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    });

    type BlogPostFrontMatter = {
      title?: string;
      description?: string;
      slug?: string;
      date?: string;
      categories?: string[];
      keywords?: string[];
    };

    const {
      title,
      description,
      slug,
      date = '',
      categories = [],
      keywords = [],
    } = node.frontmatter as BlogPostFrontMatter;

    if (title) {
      createNodeField({
        name: 'title',
        node,
        value: title,
      });
    }

    if (description) {
      createNodeField({
        name: 'description',
        node,
        value: description,
      });
    }

    if (slug) {
      createNodeField({
        name: 'slug',
        node,
        value: slug,
      });
    }

    createNodeField({
      name: 'date',
      node,
      value: date,
    });

    createNodeField({
      name: 'categories',
      node,
      value: categories,
    });

    createNodeField({
      name: 'keywords',
      node,
      value: keywords,
    });
  }
};
