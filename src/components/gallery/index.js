// @flow
import { Component } from "react";
import * as React from "react";
import "react-photoswipe/lib/photoswipe.css";
import { PhotoSwipe } from "react-photoswipe";
import { $$default as BreadCrumbs } from "../../BreadCrumbs.re";
import GalleryBody from "./body";
import Waypoint from "react-waypoint";
import { chunk, debounce, sortBy } from "lodash";
import PropTypes from "prop-types";
import { $$default as Image } from "../../galleryImage.re";
import { $$default as GalleryThumb } from "../../galleryThumb.re";

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

    if (!Array.isArray(descendants) && descendants.length <= 0) return;

    const images = sortBy(
      descendants.filter(item => item.__typename == "Image"),
      [o => o.name]
    );
    const galleries = sortBy(
      descendants.filter(item => item.__typename == "Gallery"),
      [o => o.name]
    );

    const sortedDescendants = [...galleries, ...images];

    const bufferedLoadNextPage = fancyLoadNextPage(loadNextPage, descendants);

    const renderedGalleries = galleries.map(item => {
      return (
        <WaypointGalleryThumb
          key={item.id}
          onEnter={() => bufferedLoadNextPage(item)}
          {...item}
        />
      );
    });

    const renderedImages = images.map((item, idx) => {
      return (
        <WaypointImage
          key={item.id}
          onEnter={() => bufferedLoadNextPage(item)}
          handleOpen={this.openLightbox.bind(this, idx)}
          {...item}
        />
      );
    });

    const renderedDescendants = [...renderedGalleries, ...renderedImages];

    const swipeImages = images.map(image => {
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
          onClose={this.closeLightbox.bind(this)}
          options={swipeOptions}
        />
      </div>
    );
  }
}
