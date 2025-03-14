import React from 'react'
import ApologeticsBlogList from './ApologeticsBlogList'
import BibleStudiesBlogList from './BibleStudiesBlogList'
import SermonsBlogList from './SermonsBlogList'

type Props = {}

export default function TriList({}: Props) {
  return (
    <div className='flex flex-col md:flex-row space-x-2 p-4 border-b-2'>
        <div><ApologeticsBlogList/></div>
        <div><BibleStudiesBlogList/></div>
        <div><SermonsBlogList/></div>
    </div>
  )
}