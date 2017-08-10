/* @flow */
import { h, Component } from "preact";
import style from "./style";
import { route } from "preact-router";
import { Link } from "preact-router/match";
import ReactPaginate from "react-paginate";
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipe} from 'react-photoswipe';

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
      <img src={thumbnail} class={style.thumbnail} />
      <div class={style.item__details}>
        {name}
      </div>
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

const BreadCrumbs = ({ path, slug, name }) => {
  if (slug == "root") {
    return (
      <div class={style.galleryHeader}>
        <Link activeClassName="active" href="/gallery">
          Gallery
        </Link>
      </div>
    );
  }

  const splitSlug = slug.split("/").slice(0, -1);

  const pathObjs = splitSlug.reduce((acc, section, idx) => {
    let s = splitSlug.slice(0, idx);
    console.log(path, idx, path[idx]);
    let name = path[idx];
    s.push(section);
    acc.push({
      name: name,
      path: `/gallery/${s.join("/")}`
    });
    return acc;
  }, []);

  const links = pathObjs.map(({ name, path }, idx) => {
    return (
      <span key={idx}>
        <Link activeClassName="active" href={path}>
          {name}
        </Link>{" "}
        /
      </span>
    );
  });

  return (
    <div class={style.galleryHeader}>
      <Link activeClassName="active" href="/gallery">
        Gallery
      </Link>{" "}
      /
      {links} {name}
    </div>
  );
};

type galleryArgs = {
  name: string,
  path: any,
  descendants: any,
  slug: string,
  page_number: int,
  total_pages: int
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

  handlePageClick = (slug, { selected }) => {
    if (selected == undefined) return;
    route(`/gallery/${slug}?page=${selected + 1}`);
  };

  buildPaginationLink = (path, name, page) => {
    return "#";
  };

  gotoPrevious = () =>
    this.setState({
      currentImage: this.state.currentImage - 1
    });

  gotoNext = () =>
    this.setState({
      currentImage: this.state.currentImage + 1
    });

  gotoImage = (index: number) =>
    this.setState({
      currentImage: index
    });

  render({
    name,
    path,
    slug,
    total_pages,
    page_number,
    descendants
  }: galleryArgs) {
    const images = descendants
      ? descendants.filter(child => "thumbnail" in child)
      : [];
    const galleries = descendants
      ? descendants.filter(child => !("thumbnail" in child))
      : [];

    const lightboxImages = images.map((image, i) => {
      return {
        src: image.large_url,
        srcset: [
          `${image.small_url} 800w`,
          `${image.medium_url} 1280w`,
          `${image.large_url} 1920w`
        ],
        thumbnail: image.thumbnail,
        name: image.name,
        index: i
      };
    });

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
    }

    if (!(images.length > 0 || galleries.length > 0)) return;

    let pagination = null;
    if (total_pages && total_pages > 1) {
      pagination = (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={total_pages}
          initialPage={page_number - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(null, slug)}
          disableInitialCallback={true}
          containerClassName={style.pagination}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          hrefBuilder={this.buildPaginationLink.bind(null, slug)}
        />
      );
    }

    return (
      <div>
        <BreadCrumbs slug={slug} path={path} name={name} />
        {pagination}
        <div class={style.gallery}>
          {galleries.map((gallery, idx) =>
            <GalleryThumb
              key={idx}
              handleClick={this.clickGallery.bind(this, gallery.slug)}
              {...gallery}
            />
          )}
          {lightboxImages.map(image =>
            <Image
              key={image.index}
              handleOpen={this.openLightbox.bind(this, image.index)}
              {...image}
            />
          )}
        </div>
        {pagination}
        <PhotoSwipe isOpen={this.state.lightboxIsOpen} items={swipeImages} onClose={this.closeLightbox} options={swipeOptions} />
      </div>
    );
  }
}
