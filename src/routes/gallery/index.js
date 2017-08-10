/* @flow */
import { h, Component } from "preact";
import { graphql } from "react-apollo";
import style from "./style";

import Gallery from "../../components/gallery";
import Spinner from "../../components/full_page_spinner";

class GalleryContainer extends Component {
  render({ data }) {
    if (data.loading) return <Spinner />;

    return (
      <div class={style.home}>
        {data && data.gallery && <Gallery {...data.gallery} />}
      </div>
    );
  }
}

const query = gql`
  query gallery($slug: String!, $page: Int!) {
    gallery(slug: $slug, page: $page) {
      name
      path
      page_number
      page_size
      slug
      total_pages
      total_entries
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
  options: ({ slug, page }) => {
    const s = slug || "root";
    const pg = page && page.length > 0 ? parseInt(page) : 0;

    return {
      variables: {
        slug: s,
        page: pg
      },
      fetchPolicy: "cache-first"
    };
  }
})(GalleryContainer);
