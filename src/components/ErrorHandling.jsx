import React from 'react'
import '../styles/ErrorHandling.css'

export default function ErrorHandling({err: {response}}) {
  return (
    <div className="ErrorComp">
      <h2>Error!</h2>
      <h3>Status: {response.status}</h3>
      <h4>{response.data.msg}</h4>
    </div>
  )
}
