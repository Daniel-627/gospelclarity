import React from 'react'
import ApologeticsBlogList from './ApologeticsBlogList'
import BibleStudiesBlogList from './BibleStudiesBlogList'
import SermonsBlogList from './SermonsBlogList'

type Props = {}

export default function TriList({}: Props) {
  return (
    <div className='flex flex-col md:flex-row p-4 border-b-2 w-full'>
        <div className="w-full md:flex-1"><ApologeticsBlogList/></div>
        <div className="w-full md:flex-1"><BibleStudiesBlogList/></div>
        <div className="w-full md:flex-1"><SermonsBlogList/></div>
    </div>
  )
}
