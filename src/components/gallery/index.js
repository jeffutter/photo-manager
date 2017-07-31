/* @flow */
import { h, Component } from "preact";
import style from "./style";
import Lightbox from "react-images";
import { route } from "preact-router";
import { Link } from 'preact-router/match';

type imageArgs = {
  name: string,
  thumbnail: string,
  src: string,
  index: number,
  handleOpen: () => void
};
class Image extends Component {
  render({ name, thumbnail, src, index, handleOpen }: imageArgs) {
    const openFunc = event => handleOpen(index, event);
    return (
      <div class={style.item} onClick={openFunc}>
        <div>
          <img src={thumbnail} class={style.thumbnail} />
        </div>
        <div class={style.item__details}>
          {name}
        </div>
      </div>
    );
  }
}

class GalleryThumb extends Component {
  render({ name, path, handleClick }) {
    const clickFunc = event => handleClick(path, name, event);
    return (
      <div class={style.item} onClick={clickFunc}>
        <svg viewBox="0 0 8 8" class="icon" width="200px" class={style.icon}>
          <path d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z" id="folder"></path>
        </svg>
        <div class={style.item__details}>
          {name}
        </div>
      </div>
    )
  }
}

const BreadCrumbs = ({ path, name }) => {
  if (path.length == 0 && name == "root") {
    return (
      <div class={style.galleryHeader}>
        <Link activeClassName="active" href="/gallery">Gallery</Link>
      </div>
    );
  }

  const pathObjs = path.reduce((acc, section, idx) => {
    let p = path.slice(0, idx);
    p.push(section);
    acc.push({
      name: section,
      path: p.join('/')
    });
    return acc;
  }, []);

  const links = pathObjs.map(({ name, path }, idx) => {
    return (
      <span key={idx}>
        <Link activeClassName="active" href={path}>{name}</Link> /
      </span>
    )
  })

  return (
    <div class={style.galleryHeader}>
      <Link activeClassName="active" href="/gallery">Gallery</Link> /
      {links} {name}
    </div>
  );
}

type galleryArgs = { name: string, path: any, images: any };
export default class Gallery extends Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0
  };

  clickGallery = (path, name, event) => {
    event && event.preventDefault();
    path.unshift("gallery");
    path.push(name);
    const joinedPath = path.join("/");
    route("/" + joinedPath);
  }

  openLightbox = (index: number, event) => {
    event && event.preventDefault();
    document.getElementById("app").classList.add(style.blur);
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    document.getElementById("app").classList.remove(style.blur);
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
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

  render({ name, path, children }: galleryArgs) {
    const images = children ? children.filter(child => "thumbnail" in child) : [];
    const galleries = children ? children.filter(child => !("thumbnail" in child)) : [];

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

    if (!(images.length > 0 || galleries.length > 0)) return;

    return (
      <div>
        <BreadCrumbs path={path} name={name} />
        <div class={style.gallery}>
          {galleries.map((gallery, idx) =>
            <GalleryThumb
              key={idx}
              handleClick={this.clickGallery}
              {...gallery}
            />
          )}
          {lightboxImages.map(image =>
            <Image
              key={image.index}
              handleOpen={this.openLightbox}
              {...image}
            />
          )}
        </div>
        <Lightbox
          images={lightboxImages}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickImage={this.gotoPrevious}
          currentImage={this.state.currentImage}
          showThumbnails={true}
          onClickThumbnail={this.gotoImage}
          backdropClosesModal={true}
        />
      </div>
    );
  }
}
