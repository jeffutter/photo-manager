// @flow
import { Component } from "react";
import * as React from "react";
import style from "./style";
import { $$default as MasonryInfiniteScroller } from "../../../infiniteScroll.re";

type PropTypes = {
  children: Array<React$Element<any>>,
  total: number,
  loading: boolean,
  loadNextPage: () => void
};

/**
 * React component for Gallery Body
 * @param {object} props
 * @return {ReactElement}
 */
export default function GalleryBody({
  children,
  total,
  loading,
  loadNextPage
}: PropTypes) {
  const loadMore = loading
    ? () => {}
    : _pg => {
        loadNextPage();
      };
  const hasMore = children.length < total;

  const imageWidth = 300;
  const baseGutter = 32;

  return (
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
      {children}
    </MasonryInfiniteScroller>
  );
}
