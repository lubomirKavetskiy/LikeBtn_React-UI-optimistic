import React from "react";

import { Tweet } from "./Tweet";

const failedTweet = 2;

const shouldFail = id => id === failedTweet;

const initialState = {
  tweets: [0, 3].map((likes, idx) => ({
    id: idx + 1,
    likes,
    username: "Rajat S",
    content: `${
      shouldFail(idx + 1)
        ? "Peter Parker is Spiderman"
        : "Bruce Wayne is Batman"
    }`
  })),
  likedTweets: [2]
};

const likeTweetRequest = (tweetId, like) => {
  console.log(`HTTP /like_tweet/${tweetId}?like=${like} (begin)`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldSucceed = !shouldFail(tweetId);

      console.log(
        `HTTP /like_tweet/${tweetId}?like=${like} (${
          shouldSucceed ? "success" : "failure"
        })`
      );

      shouldSucceed ? resolve() : reject();
    }, 1000);
  });
};

const App = () => {
  const [tweets, setTweets] = React.useState(initialState.tweets);
  const [likedTweets, setLikedTweets] = React.useState(
    initialState.likedTweets
  );
  const [likeRequestPending, setLikeRequestPending] = React.useState(false);

  const setTweetLiked = (tweetId, isLiked) => {
    setTweets(prevTweets =>
      prevTweets.map(tweet =>
        tweetId === tweet.id
          ? {
              ...tweet,
              likes: tweet.likes + (isLiked ? -1 : 1)
            }
          : tweet
      )
    );

    setLikedTweets(prevLikedTweets =>
      isLiked
        ? prevLikedTweets.filter(id => id !== tweetId)
        : [...prevLikedTweets, tweetId]
    );
  };

  const onClickLike = tweetId => {
    console.log(`Clicked like: ${tweetId}`);

    if (likeRequestPending) {
      console.log("return ");
      return;
    }

    console.log(`Update state: ${tweetId}`);

    const isLiked = likedTweets.includes(tweetId);

    setLikeRequestPending(true);
    setTweetLiked(tweetId, isLiked);

    likeTweetRequest(tweetId, true)
      .then(() => {
        console.log(`then: ${tweetId}`);
      })
      .catch(() => {
        console.error(`catch: ${tweetId}`);
        setTweetLiked(tweetId, !isLiked);
      })
      .then(() => {
        console.log(likeRequestPending);
        setLikeRequestPending(false);
      });
  };

  return (
    <div className="container">
      <h3 className="text-muted text-center lead pt-2">
        Optimistic User Interface in React
      </h3>
      <div className="list-group">
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isLiked={likedTweets.includes(tweet.id)}
            onClickLike={onClickLike}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
