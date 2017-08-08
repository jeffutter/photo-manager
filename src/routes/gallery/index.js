/* @flow */
import { h, Component } from "preact";
import { graphql } from "react-apollo";
import style from "./style";

import Gallery from "../../components/gallery";

class GalleryContainer extends Component {
  render({ data }) {
    return (
      <div class={style.home}>
        {data && data.gallery && <Gallery {...data.gallery} />}
      </div>
    );
  }
}

const query = gql`
  query gallery($path: [String]!, $page: Int!) {
    gallery(path: $path, page: $page) {
      name
      path
      page_number
      page_size
      total_pages
      total_entries
      descendants {
        ... on Gallery {
          name
          path
        }
        ... on Image {
          name
          path
          size
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
  options: ({ subPath, page }) => {
    const p = subPath == "" ? [] : subPath.split("/");
    const pg = page && page.length > 0 ? parseInt(page) : 0;

    return {
      variables: {
        path: p,
        page: pg
      },
      fetchPolicy: "cache-first"
    };
  }
})(GalleryContainer);
