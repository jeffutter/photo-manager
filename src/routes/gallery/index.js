/* @flow */
import { h, Component } from "preact";
import style from "./style";

import ApolloClient, {
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "apollo-client";
import gql from "graphql-tag";

import Gallery from "../../components/gallery";

const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Child",
          possibleTypes: [{ name: "Gallery" }, { name: "Image" }]
        }
      ]
    }
  }
});

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "/graphiql"
  }),
  fragmentMatcher: myFragmentMatcher
});

export default class Home extends Component {
  state = {};

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  fetchGallery(subPath, page) {
    const path = subPath == "" ? [] : subPath.split("/");
    const pathString = JSON.stringify(path);
    const pg = page && page.length > 0 ? parseInt(page) : 0;

    client
      .query({
        query: gql`
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
        `,
        variables: {
          path: path,
          page: pg
        },
        fetchPolicy: "cache-first"
      })
      .then(data => {
        this.setStateAsync({ data: data.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillReceiveProps({ subPath, page }) {
    this.fetchGallery(subPath, page);
  }

  componentDidMount() {
    const { subPath, page } = this.props;
    this.fetchGallery(subPath, page);
  }

  render() {
    return (
      <div class={style.home}>
        {this.state.data &&
          this.state.data.gallery &&
          <Gallery {...this.state.data.gallery} />}
      </div>
    );
  }
}
