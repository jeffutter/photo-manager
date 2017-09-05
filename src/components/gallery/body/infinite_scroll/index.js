// @flow
import React, { Component } from "react";
import Bricks from "bricks.js";
import PropTypes from "prop-types";

type Props = {
  children: Array<any>,
  className: string,
  element: string,
  pack: boolean,
  packed: string,
  position: boolean,
  sizes: Array<any>,
  style: any,
  threshold: number
};
type State = {
  instance: any
};

/**
 * MasonryInfiniteScroller Component
 * @param {ReactElement} component
 */
export default class MasonryInfiniteScroller extends Component<Props, State> {
  masonryContainer: any;

  propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
    className: PropTypes.string,
    element: PropTypes.string,
    pack: PropTypes.bool,
    packed: PropTypes.string,
    position: PropTypes.bool,
    sizes: PropTypes.arrayOf(PropTypes.any).isRequired,
    style: PropTypes.any,
    threshold: PropTypes.number
  };

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

  /**
   * Executes when the comonent has mounted
   */
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

  /**
   * Executes when the component has updated
   * @param {object} prevProps
   * @return {void}
   */
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

  /**
   * Executes when the component is unmounted
   */
  componentWillUnmount() {
    this.state.instance.resize(false);
  }

  /**
   * Sets the container Ref
   * @param {ReactComponent} component
   */
  setContainerRef(component: any) {
    this.masonryContainer = component;
  }

  /**
   * Forces Brick Packing
   */
  forcePack() {
    if (this.masonryContainer) this.state.instance.pack();
  }

  /**
   * Forces Brciks to update
   */
  forceUpdate() {
    if (this.masonryContainer) this.state.instance.update();
  }

  /**
   * Renders the MasonryInfiniteScroller Component
   * @return {ReactElement}
   */
  render() {
    const { children, className, style } = this.props;

    return (
      <div ref={this.setContainerRef} className={className} style={style}>
        {children}
      </div>
    );
  }
}
