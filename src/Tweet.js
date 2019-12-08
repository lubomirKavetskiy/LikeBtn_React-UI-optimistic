import React from "react";

import { ActionIcon } from "./ActionIcon";

export const Tweet = ({ tweet, isLiked, onClickLike }) => (
  <div className="list-group-item" style={{ maxWidth: 500, margin: "0 auto" }}>
    <div className="media">
      <img
        className="mr-3 rounded-circle"
        src="https://twitter.com/LKavetskiy/photo"
        alt="Avatar"
      />
      <div className="media-body">
        <div className="font-weight-bold">Rajat S</div>
        <p>{tweet.content}</p>
        <div className="d-flex justify-content-around mt-4">
          <ActionIcon icon="comment-square" />
          <ActionIcon icon="loop-square" />
          <ActionIcon
            icon="heart"
            count={tweet.likes}
            highlight={isLiked}
            highlightColor="red"
            onClick={onClickLike.bind(null, tweet.id)}
          />
          <ActionIcon icon="envelope-closed" />
        </div>
      </div>
    </div>
  </div>
);
