import React from 'react'

function Navbar() {
    return (

        <nav className='flex bg-green-600 justify-between items-center h-10 '>

            <div className="logo text-1xl mx-2">
                <span className='font-bold cursor-pointer'>Itask</span>
            </div>

            <ul className='flex gap-3 mr-10 '>
                <li className='cursor-pointer hover:font-bold transition-all  duration-50'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>YourTask</li>
            </ul>






        </nav>







    )
}

export default Navbar
