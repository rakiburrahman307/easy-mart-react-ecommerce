import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Accordion, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './SearchBar.css';

const SearchBar = ({searchBarShow, handleSearchBarClose, searchBox, ...props}) => {
    const {getStarting, handleSearchClick, handleSearch, categories, handleAllCategory, handleCategory, selectedCategory} = useAuth();
    const [searchText, setSearchText] = useState('');
    
    const handleSearchChange = e => {
        handleSearch(e.target.value);
        setSearchText( e.target.value );
    }
    
    const handleSearchKeypress = e => {
      if (e.key === 'Enter') {
        handleSearchClick(e.target.value);
        handleSearchBarClose();
       }
    };

    useEffect(() => {
        handleAllCategory();
    }, [])
    

    return (
        <>  
             <style type="text/css">
                {
                  `
                    .tmp-searchbar-category div:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `
                }
            </style>
            <div>
                <Offcanvas {...props} show={searchBarShow} onHide={handleSearchBarClose} style={{overflow: searchBox === false ? 'visible' : 'hidden'}}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>SEARCH</Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr />
                    <Offcanvas.Body>
                        <form className="tmp-searchbar">
                            <input value={searchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" className="tmp-searchbar-input" placeholder="Search......." style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                            <span onClick={() => setSearchText('')} style={{position: 'absolute', right: '100px', top: '8px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </span>
                            <span onClick={() => setSearchText('')}>
                                <Link to='/products' onClick={handleSearchBarClose}>
                                    <button onClick={()=> handleSearchClick(searchText)} style={{backgroundColor: `${getStarting.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                                </Link>
                            </span>
                            
                            <h4 className="pt-3">Popular Category</h4>
                            {/* <Link to='/products' onClick={() => setSearchText('')}> */}
                                {/* <div className='tmp-searchbar-category' onClick={handleSearchBarClose}> */}
                                <div className='tmp-searchbar-category'>
                                    {
                                        categories.slice(0).reverse().map(unique => <div key={unique.name} onClick={() => setSearchText('')}>
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    {
                                                        unique?.subCategories?.length === 0 ?
                                                        <Link to='/products' onClick={handleSearchBarClose}>
                                                            <div className="categories" onClick={handleCategory} style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#666666'}`}}>{unique.name}</div>
                                                        </Link>
                                                        :
                                                        <>
                                                            <Accordion.Header>
                                                                <Link to='/products' onClick={handleSearchBarClose}>
                                                                    <div onClick={handleCategory} style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#666666'}`}}>{unique.name}</div>
                                                                </Link>
                                                            </Accordion.Header>
                                                            {
                                                                unique?.subCategories?.map( subCat =>  <div key={subCat._id}>
                                                                    <Accordion.Body>
                                                                        <Accordion>
                                                                            <Accordion.Item eventKey="0">
                                                                            {
                                                                                subCat?.childs?.length === 0 ?
                                                                                <Link to='/products' onClick={handleSearchBarClose}>
                                                                                    <div className="categories" onClick={handleCategory} style={{color: `${selectedCategory === subCat.name ? getStarting?.primaryColor : '#666666'}`}}>{subCat.name}</div>
                                                                                </Link>
                                                                                :
                                                                                <>
                                                                                    <Accordion.Header>
                                                                                        <Link to='/products' onClick={handleSearchBarClose}>
                                                                                            <div onClick={handleCategory} style={{color: `${selectedCategory === subCat.name ? getStarting?.primaryColor : '#666666'}`}}>{subCat.name}</div>
                                                                                        </Link>
                                                                                    </Accordion.Header>
                                                                                    {
                                                                                        subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                                                            <Accordion.Body>
                                                                                                <Link to='/products' onClick={handleSearchBarClose}>
                                                                                                    <div onClick={handleCategory} style={{color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor : '#666666'}`, fontSize: '13px', fontWeight: '400', fontFamily: 'sans-serif', padding: '3px 20px', cursor: 'pointer'}}>{subCatChild.name}</div>
                                                                                                </Link>
                                                                                            </Accordion.Body>
                                                                                        </div>)
                                                                                    }
                                                                                </>
                                                                            }
                                                                            </Accordion.Item>
                                                                        </Accordion>
                                                                    </Accordion.Body>
                                                                </div>)
                                                            }
                                                        </>
                                                    }
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>)
                                    }
                                </div>
                            {/* </Link> */}
                        </form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default SearchBar;