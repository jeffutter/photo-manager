// @flow
import React, { Component } from "react";
import Bricks from "bricks.js";
import InfiniteScroll from "react-infinite-scroller";

type Props = {
  children: Array<any>,
  className: string,
  element: string,
  hasMore: boolean,
  loadMore: () => void,
  loader: any,
  pack: boolean,
  packed: string,
  pageStart: number,
  position: boolean,
  sizes: Array<any>,
  style: any,
  threshold: number,
  useWindow: boolean
};
type State = {
  instance: any
};
export default class MasonryInfiniteScroller extends Component<Props, State> {
  masonryContainer: any;

  static defaultProps = {
    className: "",
    pack: false,
    packed: "data-packed",
    position: true,
    sizes: [
      { columns: 1, gutter: 20 },
      { mq: "768px", columns: 2, gutter: 20 },
      { mq: "1024px", columns: 3, gutter: 20 }
    ],
    style: {},
    threshold: 250,
    element: "div"
  };

  componentDidMount() {
    const { packed, sizes, children, position } = this.props;

    const instance = Bricks({
      container: this.masonryContainer,
      packed: packed,
      sizes: sizes,
      position: position
    });

    instance.resize(true);

    if (children.length > 0) {
      instance.pack();
    }

    // eslint-disable-next-line
    this.setState(() => ({ instance }));

    this.forcePack();
  }

  componentDidUpdate(prevProps: Props) {
    const { children } = this.props;

    if (prevProps.children.length === 0 && children.length === 0) return;

    if (prevProps.children.length === 0 && children.length > 0)
      return this.state.instance.pack();

    if (prevProps.children.length !== children.length) {
      if (this.props.pack) return this.state.instance.pack();
      else return this.state.instance.update();
    }
  }

  componentWillUnmount() {
    this.state.instance.resize(false);
  }

  setContainerRef = (component: any) => {
    this.masonryContainer = component;
  };

  forcePack = () => {
    if (this.masonryContainer) this.state.instance.pack();
  };

  forceUpdate = () => {
    if (this.masonryContainer) this.state.instance.update();
  };

  render() {
    const {
      children,
      className,
      element,
      hasMore,
      loadMore,
      loader,
      pageStart,
      style,
      threshold,
      useWindow
    } = this.props;

    return (
      <InfiniteScroll
        element={element}
        hasMore={hasMore}
        loadMore={loadMore}
        loader={loader}
        pageStart={pageStart}
        threshold={threshold}
        useWindow={useWindow}
      >
        <div ref={this.setContainerRef} className={className} style={style}>
          {children}
        </div>
      </InfiniteScroll>
    );
  }
}
