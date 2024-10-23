import React, { useContext, useState, useEffect } from 'react';
import './Explore.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const Explore = () => {
    const { url, addToCart } = useContext(StoreContext);
    const [allServices, setAllServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [categories] = useState([
        "Haircuts", "Beard Grooming", "Shaving", "Hair Styling", 
        "Hair Coloring", "Hair Treatments", "Facial Grooming", 
        "Special Packages", "Additional Services"
    ]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const fetchService = async () => {
        try {
            const response = await axios.get(`${url}/api/service/list`);
            if (response.data.success) {
                setAllServices(response.data.data);
                setFilteredServices(response.data.data);
            } else {
                toast.error('Error fetching services');
            }
        } catch (error) {
            toast.error('Failed to fetch services');
        }
    };

    const handleSearch = () => {
        if (selectedCategory) {
            const filtered = allServices.filter(item => item.category === selectedCategory);
            setFilteredServices(filtered);
        } else {
            setFilteredServices(allServices);
        }
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    useEffect(() => {
        fetchService();
    }, [url]);

    return (
        <div className="explore-container">
            <h1>Explore Our Services</h1>

            <div className="search-bar">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            <br />

            <div className="list-table-container">
                <div className="list-table">
                    <div className="list-table-format title">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Description</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Action</b>
                    </div>

                    {filteredServices.map((item, index) => (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>{item.category}</p>
                            <p>&#8377; {item.price}</p>
                            <button onClick={() => handleAddToCart(item)}>Add</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;
