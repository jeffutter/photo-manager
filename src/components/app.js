import { h, Component } from "preact";
import { Router, route } from "preact-router";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} from "react-apollo";

import Header from "./header";
import Gallery from "../routes/gallery";
// import Home from 'async!./home';
// import Profile from 'async!./profile';

import style from "./style";

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

class Redirect extends Component {
  componentWillMount() {
    route(this.props.to);
  }

  render() {
    return null;
  }
}

export default class App extends Component {
  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="app" class={style.app}>
          <Header />
          <Router onChange={this.handleRoute}>
            <Redirect path="/" to="/gallery" />
            <Gallery path="/gallery:params?" slug="" />
            <Gallery path="/gallery/:slug*/:params?" />
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
