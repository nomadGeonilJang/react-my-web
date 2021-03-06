import React, { useState, useEffect, useContext, useCallback } from 'react'
import styled from 'styled-components'
import { YoutubeServiceContext } from '../../App'
import Heading from '../../components/common/Heading'

import SearchHeader from './components/search_header/search_header'
import VideoDetail from './components/video_detail/video_detail'
import VideoList from './components/video_list/video_list'
export default function Skill() {
  const youtube = useContext(YoutubeServiceContext)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videos, setVideos] = useState([])

  const selectVideo = useCallback((video: any) => {
    setSelectedVideo(video)
  }, [])

  const search = useCallback(
    (query: any) => {
      youtube
        ?.search(query) //
        .then((videos: any) => {
          setVideos(videos)
          setSelectedVideo(null)
        })
    },
    [youtube],
  )

  useEffect(() => {
    youtube
      ?.mostPopular() //
      .then((videos: any) => setVideos(videos))
  }, [youtube])

  return (
    <Container>
      <Heading heading="YouTube" />
      <SearchHeader onSearch={search} />
      <section className="content">
        {selectedVideo && (
          <div className="detail">
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className="list">
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
        </div>
      </section>
    </Container>
  )
}

const Container = styled.article`
  padding: 20px;

  .content {
    display: flex;
  }

  .detail {
    flex: 1 1 70%;
  }

  .list {
    flex: 1 1 30%;
  }

  @media screen and (max-width: 48rem) {
    .content {
      flex-direction: column;
    }
  }
`
