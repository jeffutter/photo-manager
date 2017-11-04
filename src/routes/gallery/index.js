// @flow
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { $$default as GalleryContainer } from "../../galleryContainer.re";

const queryOptions = ({ match: { params: { slug } } }) => {
  const s = slug || "root";

  return {
    variables: {
      slug: s
    },
    fetchPolicy: "cache-first"
  };
};

const moreOptions = ({ match: { params: { slug } }, location: { search } }) => {
  const s = slug || "root";

  return {
    variables: {
      slug: s,
      slugs: []
    },
    fetchPolicy: "cache-first"
  };
};

const query = gql`
  query gallery($slug: String!) {
    gallery(slug: $slug) {
      id
      name
      path
      slug
      total_descendants
      descendants {
        ... on Gallery {
          id
          name
          path
          slug
        }
        ... on Image {
          id
          name
          path
          slug
          size
          width
          height
          small_url
          medium_url
          large_url
        }
      }
    }
  }
`;

const more = gql`
  query gallery($slug: String!, $slugs: [String]!) {
    gallery(slug: $slug) {
      id
      name
      path
      slug
      descendants(slugs: $slugs) {
        ... on Gallery {
          id
          name
          path
          slug
        }
        ... on Image {
          id
          name
          path
          slug
          thumbnail
        }
      }
    }
  }
`;

const withQuery = graphql(query, { name: "queryData", options: queryOptions });
const withMore = graphql(more, {
  name: "moreData",
  options: moreOptions,
  props: p => {
    let { moreData: { variables, gallery, loading, fetchMore } } = p;
    return {
      moreGallery: gallery,
      moreLoading: loading,
      loadNextPage: slugs => {
        return fetchMore({
          variables: {
            slug: variables.slug,
            slugs: slugs || []
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult;
            }

            return Object.assign({}, previousResult, {
              gallery: Object.assign({}, previousResult.gallery, {
                descendants: [
                  ...previousResult.gallery.descendants,
                  ...fetchMoreResult.gallery.descendants
                ]
              })
            });
          }
        });
      }
    };
  }
});

const withData = compose(withQuery, withMore);

export default withData(GalleryContainer);
