// @flow
import { Component } from "react";
import * as React from "react";
import style from "./style";
import { Link } from "react-router-dom";
import "react-photoswipe/lib/photoswipe.css";
import { PhotoSwipe } from "react-photoswipe";
import BreadCrumbs from "./bread_crumbs";
import GalleryBody from "./body";

type imageArgs = {
  name: string,
  thumbnail: string,
  src: string,
  index: number,
  handleOpen: () => void
};

const Image = ({ name, thumbnail, src, index, handleOpen }: imageArgs) => {
  return (
    <div class={style.item} onClick={handleOpen}>
      <img src={thumbnail} class={style.thumbnail} width="300" height="225" />
      <div class={style.item__details}>
        {name}
      </div>
    </div>
  );
};

const Empty = () => {
  return (
    <div class={style.item}>
      <img src="" class={style.thumbnail} width="300" height="225" />
      <div class={style.item__details}>Loading...</div>
    </div>
  );
};

const GalleryThumb = ({ name, slug }) => {
  const link = "/gallery/" + slug;
  return (
    <Link to={link} class={style.item}>
      <svg viewBox="0 0 8 8" class="icon" width="200px" class={style.icon}>
        <path
          d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
          id="folder"
        />
      </svg>
      <div class={style.item__details}>
        {name}
      </div>
    </Link>
  );
};

type Props = {
  name: string,
  path: Array<string>,
  descendants: Array<any>,
  slug: string,
  total_descendants: number,
  loadNextPage: () => void,
  loading: boolean
};
type State = {
  lightboxIsOpen: boolean,
  currentImage: number
};
export default class Gallery extends Component<Props, State> {
  state = {
    lightboxIsOpen: false,
    currentImage: 0
  };

  openLightbox = (index: number, event: Event) => {
    event && event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };

  render() {
    const {
      name = "",
      path = [],
      slug = "",
      total_descendants = 0,
      descendants = [],
      loadNextPage = () => {},
      loading = false
    }: Props = this.props;

    const sortedDescendants = descendants.slice().sort((a, b) => {
      if ("thumbnail" in a && "thumbnail" in b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if ("thumbnail" in a) return -1;
      if ("thumbnail" in b) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    if (sortedDescendants.length <= 0) return;

    const renderedDescendants = sortedDescendants.map((item, idx) => {
      if (!("thumbnail" in item)) return <GalleryThumb key={idx} {...item} />;
      return (
        <Image
          key={idx}
          handleOpen={this.openLightbox.bind(this, idx)}
          {...item}
        />
      );
    });

    if (!Array.isArray(renderedDescendants)) return;

    const images = descendants
      ? descendants.filter(child => "thumbnail" in child)
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
          children={renderedDescendants}
          loading={loading}
          loadNextPage={loadNextPage}
          total={total_descendants}
        />
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
