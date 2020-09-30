import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Heading from '../../components/common/Heading'
import SearchHeader from './components/search_header/search_header'
import VideoList from './components/video_list/video_list'
export default function Skill() {
  const [videos, setVideos] = useState([])
  const search = (query: any) => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    }
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=25&q=${query}&type=video&key=${process.env.REACT_APP_API_KEY}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result =>
        result.items.map((item: any) => ({ ...item, id: item.id.videoId })),
      )
      .then(result => setVideos(result))
      .catch(error => console.log('error', error))
  }

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    }
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${process.env.REACT_APP_API_KEY}`,
      requestOptions,
    )
      .then(response => response.json())

      .then(result => {
        setVideos(result.items)
      })
      .catch(error => console.log('error', error))
  }, [])

  return (
    <Container>
      <Heading heading="YouTube" />
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </Container>
  )
}

const Container = styled.article`
  padding: 20px;
`
