async function fetchAPI(query, { variables } = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed to fetch API");
    }

    return json.data;
}

export async function getAllPostsWithSlug() {
    const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);

    return data?.allPosts;
}

export async function getAllPostsForHome() {
    const data = await fetchAPI(
        `
    query Posts {
      posts(sort: "date:desc", limit: 10) {
        title
        slug
        excerpt
        date
        coverImage {
          url
          width
          height
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `
    );

    return data?.posts;
}

export async function getPostAndMorePosts(slug) {
    const data = await fetchAPI(
        `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
      coverImage {
        url
        width
        height
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      coverImage {
        url
        width
        height
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
        {
            variables: {
                where: {
                    slug,
                },
                where_ne: {
                    slug_ne: slug,
                },
            },
        }
    );

    return data;
}
