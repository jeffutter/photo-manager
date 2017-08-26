// @flow
import React, { Component } from "react";
import { graphql } from "react-apollo";
import style from "./style";

import Gallery from "../../components/gallery";
import Spinner from "../../components/full_page_spinner";

const GalleryContainer = ({ loading, gallery, loadNextPage }) => {
  if (loading && !gallery) return <Spinner />;

  return (
    <div class={style.home}>
      {gallery &&
        <Gallery loading={loading} loadNextPage={loadNextPage} {...gallery} />}
    </div>
  );
};

const query = gql`
  query gallery($slug: String!, $offset: Int!) {
    gallery(slug: $slug, offset: $offset) {
      name
      path
      slug
      total_descendants
      descendants {
        ... on Gallery {
          name
          path
          slug
        }
        ... on Image {
          name
          path
          slug
          size
          width
          height
          thumbnail
          small_url
          medium_url
          large_url
        }
      }
    }
  }
`;

export default graphql(query, {
  options: ({ match: { params: { slug } }, location: { search } }) => {
    const params = new URLSearchParams(search);
    const offset = params.get("offset");
    const s = slug || "root";
    const of = offset && offset.length > 0 ? parseInt(offset) : 0;

    return {
      variables: {
        slug: s,
        offset: of
      },
      fetchPolicy: "cache-first"
    };
  },
  props: ({ data: { gallery, loading, fetchMore } }) => {
    return {
      gallery,
      loading,
      loadNextPage() {
        return fetchMore({
          variables: {
            offset: gallery.descendants.length
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
})(GalleryContainer);
