/* @flow */
import { h, Component } from "preact";
import style from "./style";
import { route } from "preact-router";
import "react-photoswipe/lib/photoswipe.css";
import { PhotoSwipe } from "react-photoswipe";
import MasonryInfiniteScroller from "react-masonry-infinite";
import BreadCrumbs from "./bread_crumbs";

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

const GalleryThumb = ({ name, handleClick }) => {
  return (
    <div class={style.item} onClick={handleClick}>
      <svg viewBox="0 0 8 8" class="icon" width="200px" class={style.icon}>
        <path
          d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z"
          id="folder"
        />
      </svg>
      <div class={style.item__details}>
        {name}
      </div>
    </div>
  );
};

type galleryArgs = {
  name: string,
  path: any,
  descendants: any,
  slug: string,
  total_descendants: int
};
export default class Gallery extends Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0
  };

  openLightbox = (index: number, event) => {
    event && event.preventDefault();
    //document.getElementById("app").classList.add(style.blur);
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    //document.getElementById("app").classList.remove(style.blur);
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };

  clickGallery = (slug, event) => {
    event && event.preventDefault();
    route("/gallery/" + slug);
  };

  render({
    name,
    path,
    slug,
    total_descendants,
    descendants,
    loadNextPage,
    loading
  }: galleryArgs) {
    const images = descendants
      ? descendants.filter(child => "thumbnail" in child)
      : [];

    const galleries = descendants
      ? descendants.filter(child => !("thumbnail" in child))
      : [];

    if (!(images.length > 0 || galleries.length > 0)) return;

    const renderedImages = images.map((image, idx) => {
      return (
        <Image
          key={galleries.length + idx}
          handleOpen={this.openLightbox.bind(this, idx)}
          {...image}
        />
      );
    });

    const renderedGalleries = galleries.map((gallery, idx) => {
      return (
        <GalleryThumb
          key={idx}
          handleClick={this.clickGallery.bind(this, gallery.slug)}
          {...gallery}
        />
      );
    });

    const combinedList = [...renderedGalleries, ...renderedImages];

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

    const loadMore = loading
      ? () => {}
      : _pg => {
          loadNextPage();
        };
    const hasMore = combinedList.length < total_descendants;

    const imageWidth = 300;
    const baseGutter = 32;

    return (
      <div>
        <BreadCrumbs slug={slug} path={path} name={name} />

        <MasonryInfiniteScroller
          hasMore={hasMore}
          loadMore={loadMore}
          pageStart={1}
          pack={true}
          useWindow={true}
          loader={<div className={style.loader}>Loading ...</div>}
          className={style.gallery}
          sizes={[
            { columns: 1, gutter: baseGutter },
            {
              mq: `${2 * imageWidth + 3 * baseGutter}px`,
              columns: 2,
              gutter: baseGutter
            },
            {
              mq: `${3 * imageWidth + 4 * baseGutter}px`,
              columns: 3,
              gutter: baseGutter
            },
            {
              mq: `${4 * imageWidth + 5 * baseGutter}px`,
              columns: 4,
              gutter: baseGutter
            },
            {
              mq: `${5 * imageWidth + 6 * baseGutter}px`,
              columns: 5,
              gutter: baseGutter
            },
            {
              mq: `${5 * imageWidth + 6 * 2 * baseGutter}px`,
              columns: 5,
              gutter: 2 * baseGutter
            }
          ]}
        >
          {combinedList}
        </MasonryInfiniteScroller>

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
