// @flow
import { Component } from "react";
import * as React from "react";
import style from "./style";
import "react-photoswipe/lib/photoswipe.css";
import { PhotoSwipe } from "react-photoswipe";
import BreadCrumbs from "./bread_crumbs";
import GalleryBody from "./body";
import Waypoint from "react-waypoint";
import { chunk, debounce } from "lodash";
import PropTypes from "prop-types";
import Image from "./image";
import GalleryThumb from "./gallery_thumb";

const fetchBuffer = new Set();

const loadRequestedImages = loadNextPage => {
  const currentBuffer = Array.from(fetchBuffer);
  fetchBuffer.clear();
  if (currentBuffer.length <= 0) return;
  let chunks = chunk(currentBuffer, 20);
  chunks.forEach(chunk => {
    loadNextPage(chunk);
  });
};

const debouncedLoadRequestedImages = debounce(
  debounce(loadRequestedImages, 1000, {
    leading: true,
    trailing: true
  }),
  500,
  {
    trailing: true
  }
);

const fancyLoadNextPage = (loadNextPage, descendants) => {
  const images = descendants.filter(item => item.__typename == "Image");
  const thumbedImages = images.filter(item => "thumbnail" in item);
  const thumbedImageIds = new Set(thumbedImages.map(image => image.id));

  return item => {
    if ("thumbnail" in item) return;
    if (thumbedImageIds.has(item.id)) return;
    fetchBuffer.add(item.id);
    debouncedLoadRequestedImages(loadNextPage);
  };
};

type Props = {
  name: string,
  path: Array<string>,
  descendants: Array<any>,
  slug: string,
  totalDescendants: number,
  loadNextPage: () => void,
  loading: boolean
};
type State = {
  lightboxIsOpen: boolean,
  currentImage: number
};

type withWaypointProps = {
  onEnter: () => {}
};

// eslint-disable-next-line react/display-name
const withWaypoint = (WrappedComponent: React$Element<*>) => ({
  onEnter,
  ...props
}: withWaypointProps): React$Element<*> => {
  return (
    <Waypoint
      onEnter={onEnter}
      bottomOffset="-400px"
      topOffset="200px"
      fireOnRapidScroll={false}
    >
      <WrappedComponent {...props} />
    </Waypoint>
  );
};

const WaypointGalleryThumb = withWaypoint(GalleryThumb);
const WaypointImage = withWaypoint(Image);

/**
 * Component that houses a gallery
 */
export default class Gallery extends Component<Props, State> {
  propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    slug: PropTypes.string.isRequired,
    totalDescendants: PropTypes.number.isRequired,
    descendants: PropTypes.array,
    loadNextPage: PropTypes.func,
    loading: PropTypes.bool
  };

  state = {
    lightboxIsOpen: false,
    currentImage: 0
  };

  /**
   * Opens the Lightbox
   * @param {number} index - the index of the image to open
   * @param {Event} event - a dom Event representing the click
   */
  openLightbox(index: number, event: Event) {
    event && event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  }

  /**
   * Closes the Lightbox
   */
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  /**
   * Renders the component
   * @return {ReactElement}
   */
  render() {
    const {
      name = "",
      path = [],
      slug = "",
      totalDescendants = 0,
      descendants = [],
      loadNextPage = () => {},
      loading = false
    }: Props = this.props;

    const sortedDescendants = descendants.slice().sort((a, b) => {
      if (a.__typename == "Image" && b.__typename == "Image") {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (a.__typename == "Image") return -1;
      if (b.__typename == "Image") return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    if (sortedDescendants.length <= 0) return;

    const bufferedLoadNextPage = fancyLoadNextPage(loadNextPage, descendants);

    const renderedDescendants = sortedDescendants.map((item, idx) => {
      if (item.__typename == "Gallery") {
        return (
          <WaypointGalleryThumb
            key={item.id}
            onEnter={() => bufferedLoadNextPage(item)}
            {...item}
          />
        );
      }
      return (
        <WaypointImage
          key={item.id}
          onEnter={() => bufferedLoadNextPage(item)}
          handleOpen={this.openLightbox.bind(this, idx)}
          {...item}
        />
      );
    });

    if (!Array.isArray(renderedDescendants)) return;

    const images = descendants
      ? descendants.filter(child => "large_url" in child)
      : [];

    const swipeImages = images.map((image, i) => {
      return {
        src: image.large_url,
        msrc: image.small_url,
        w: image.width,
        h: image.height,
        title: image.name
      };
    });

    const swipeOptions = {
      index: this.state.currentImage
    };

    return (
      <div>
        <BreadCrumbs slug={slug} path={path} name={name} />
        <GalleryBody
          loading={loading}
          loadNextPage={loadNextPage}
          total={totalDescendants}
        >
          {renderedDescendants}
        </GalleryBody>
        <PhotoSwipe
          isOpen={this.state.lightboxIsOpen}
          items={swipeImages}
          onClose={this.closeLightbox}
          options={swipeOptions}
        />
      </div>
    );
  }
}
