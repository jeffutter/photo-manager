// @flow
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { $$default as GalleryContainer } from "../../galleryContainer.bs.js";

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

export const query = gql`
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
          rating
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

export const rateImage = gql`
  mutation rateImage($slug: String!, $rating: Int!) {
    rateImage(slug: $slug, rating: $rating) {
      id
      name
      path
      slug
      rating
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

const withRateImage = graphql(rateImage, {
  props: ({ ownProps, mutate }) => ({
    submitRating: ({ slug, rating }) => {
      const oldImage = ownProps.queryData.gallery.descendants.find(
        image => image.slug === slug
      );
      mutate({
        variables: { slug: slug, rating: rating },
        optimisticResponse: {
          __typename: "Mutation",
          rateImage: Object.assign({}, oldImage, {
            __typename: "Image",
            // Note that we can access the props of the container at `ownProps` if we
            // need that information to compute the optimistic response
            slug: slug,
            rating: rating
          })
        }
      });
    }
  })
});

export default compose(withQuery, withMore, withRateImage)(GalleryContainer);
