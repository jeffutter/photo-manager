type image = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "size": option(string),
  "width": option(int),
  "height": option(int),
  "rating": option(int),
  "smallUrl": option(string),
  "mediumUrl": option(string),
  "largeUrl": option(string),
};

type moreImage = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "thumbnail": option(string),
};

type completeImage = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "size": option(string),
  "width": option(int),
  "height": option(int),
  "rating": option(int),
  "smallUrl": option(string),
  "mediumUrl": option(string),
  "largeUrl": option(string),
  "thumbnail": option(string),
};

type galleryNoDescendants = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
};

type gallery = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "descendants": option(descendants),
  "totalDescendants": option(int),
}
and descendant = [ | `Gallery(galleryNoDescendants) | `Image(image)]
and descendants = Js.Array.t(descendant);

type moreGallery = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "descendants": option(moreDescendants),
}
and moreDescendant = [ | `Gallery(galleryNoDescendants) | `Image(moreImage)]
and moreDescendants = Js.Array.t(moreDescendant);

type completeGallery = {
  .
  "id": string,
  "__typename": string,
  "name": string,
  "path": Js.Array.t(string),
  "slug": string,
  "descendants": option(completeDescendants),
  "totalDescendants": option(int),
}
and completeDescendant = [
  | `CompleteGallery(galleryNoDescendants)
  | `CompleteImage(completeImage)
]
and completeDescendants = Js.Array.t(completeDescendant);

module GalleryQuery = [%graphql
  {|
  query gallery($slug: String!) {
    gallery(slug: $slug) {
      id
      __typename
      name
      path
      slug
      totalDescendants
      descendants {
      ... on Gallery {
        id
        __typename
        name
        path
        slug
      }
      ... on Image {
        id
        __typename
        name
        path
        slug
        size
        width
        height
        rating
        smallUrl
        mediumUrl
        largeUrl
      }
      }
    }
    }
  |}
];

module MoreQuery = [%graphql
  {|
  query gallery($slug: String!, $slugs: [String!]!) {
    gallery(slug: $slug) {
      id
      __typename
      name
      path
      slug
      descendants(slugs: $slugs) {
      ... on Gallery {
        id
        __typename
        name
        path
        slug
      }
      ... on Image {
        id
        __typename
        name
        path
        slug
        thumbnail
      }
      }
    }
    }
  |}
];

module RateImage = [%graphql
  {|
    mutation rateImage($slug: String!, $rating: Int!) {
      rateImage(slug: $slug, rating: $rating) {
        id
        __typename
        name
        path
        slug
        rating
      }
    }
  |}
];
