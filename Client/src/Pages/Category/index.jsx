import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import notify from '../../Utils/Notify'
import Card from './Card'

export default function Category() {
  const [categories,setCategories]=useState()
  useEffect(()=>{
    (async ()=>{
      try {
          const res=await fetch(import.meta.env.VITE_BASE_API+'category')
          const data=await res.json()
          setCategories(data.data)
      } catch (error) {
        notify('error','connect to api failed')
      }
    })()
  },[])
  const items=categories?.map((e,index)=><Card key={index} id={e._id} image={e.image} title={e.title} />)
  return (
    <Stack mt={'50px'} flexDirection={'row'} gap={'20px'} flexWrap={'wrap'} justifyContent={'center'}>
      {items}
    </Stack>
  )
}
