/* @flow */
import { h, Component } from "preact";
import style from "./style";

import Gallery from "../../components/gallery";

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response;
  else {
    var error = new Error(response.statusText);
    // error.response = response;
    throw error;
  }
};

const parseJSON = response => {
  return response.json();
};

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
    const pg = page && page.length > 0 ? page : "0";

    fetch("http://localhost:4000/graphiql", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/graphql"
      }),
      body: `
        {
          gallery(path: ${pathString}, page: ${pg}) {
            name,
            path,
            page_number,
            page_size,
            total_pages,
            total_entries,
            children {
              ... on Gallery { name, path }
              ... on Image { name, path, size, thumbnail, small_url, medium_url, large_url }
            }
          }
        }
      `
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        this.setStateAsync({ data: data.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillReceiveProps({ subPath, page }) {
    this.fetchGallery(subPath);
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
