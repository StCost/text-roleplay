import React from 'react';

const YoutubeEmbed = (props: { link: string}) => {
  const { link } = props;

  const getVideoId = (body: string) => {
    if (body.indexOf('youtu.be') > -1) {
      const regExMatch = body.match(/youtu\.be\/.* /i);
      if (regExMatch) {
        const lastMatch = regExMatch.pop();
        if (lastMatch) {
          return lastMatch.split('/').pop() || '';
        }
      }
    } else {
      return new URL(body).searchParams.get('v') || '';
    }
    return ''
  };

  const searchParams = new URL(link).searchParams;
  let params = 'listType=playlist';
  const videoId = getVideoId(link);

  if (videoId) {
    const listId = searchParams.get('list');
    if (listId)
      params += '&list=' + listId;

    const time = searchParams.get('t');
    if (time)
      params += '&start=' + time;

    return (
      <iframe
        title={videoId}
        id="ytplayer"
        width="100%"
        height="360"
        src={`https://www.youtube.com/embed/${videoId}?${params}`}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return null;
};

export default YoutubeEmbed;
