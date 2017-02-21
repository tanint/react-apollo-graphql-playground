import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'

import query from '../queries/fetchSongs'

class SongList extends Component {
  onDeleteSong (id) {
    this.props.mutate({ variables: { id } })
  }

  renderSongs () {
    return this.props.data.songs.map(({id, title}) => {
      return <li key={id} className='collection-item'>
        {title}
        <i
          className='material-icons'
          onClick={() => this.onDeleteSong(id)}
        >
          delete
        </i>
      </li>
    })
  }

  render () {
    if (this.props.data.loading) return (<div>Loading...</div>)

    return (
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link
          to='/songs/new'
          className='btn-floating btn-large red right'
        >
          <i className='material-icons'>add
          </i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(
  graphql(query)(SongList)
)
