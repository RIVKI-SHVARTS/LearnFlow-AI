import React, { useState, useEffect } from 'react';
import api from '../api/api';
import PromptInput from './PromptInput';

const CategorySelector = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data));
  }, []);

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    setSubCategories([]); 

    if (catId) {
      api.get(`/sub-categories?category_id=${catId}`)
         .then(res => setSubCategories(res.data));
    }
  };

  return (
    <div className="category-selection-container">
      <label>Category:</label><br />
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
<br />
      <label>Sub-Category:</label><br />
      <select disabled={!selectedCategory}>
        <option value="">Select Sub-Category</option>
        {subCategories.map(sub => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>
      <PromptInput selectedCategoryId={selectedCategory} />
    </div>
  );
};

export default CategorySelector;