import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-3'>
        <h2>AppName</h2>
        <h2>SearchBar</h2>
        <div className='flex justify-between items-center gap-2'>
          <h2>Favoris</h2>
          <h2>Panier</h2>
          <h2>Profil</h2>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Header