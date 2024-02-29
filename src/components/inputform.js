import React, { useState, useEffect } from 'react';

function InputForm() {
  const initialData = [
    { id: 1, productName: "Laptop", category: "technology", price: '49999' }
  ];

  const [myData, setMyData] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState('technology');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('mydata')) || [];
    setMyData(storedData);
  }, []);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sendData = () => {
    const productId = parseInt(document.getElementById('productId').value);
    const sellingPrice = parseInt(document.getElementById('sellingPrice').value);
    const productName = document.getElementById('productName').value;

    const newDataObject = {
      id: productId,
      productName: productName,
      category: selectedCategory,
      price: sellingPrice.toString()
    };

    const updatedData = [...myData, newDataObject];
    setMyData(updatedData);
    localStorage.setItem('mydata', JSON.stringify(updatedData));

    document.getElementById('productId').value= '';
    document.getElementById('sellingPrice').value= '';
    document.getElementById('productName').value= '';
  };

  const deleteItem = (itemId) => {
    const updatedData = myData.filter(item => {
        return item.id !== itemId;
      });
    setMyData(updatedData);
    localStorage.setItem('mydata', JSON.stringify(updatedData));
  };

  return (
    <React.Fragment>
      <div>
        <label>Product id :</label>
        <input type='number' id="productId"></input>
        <label>Selling price :</label>
        <input id="sellingPrice" type='number'></input>
        <label>Product Name :</label>
        <input id="productName" type='text'></input>
        <label>Choose a category :</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="technology">Technology</option>
          <option value="SkinCare">SkinCare</option>
          <option value="Food">Food</option>
        </select>
        <button onClick={sendData}>Click To add Data</button>
      </div>
      <div>
        <div>
            <h2>Technology Items:</h2>
            {myData
            .filter(item=>item.category === 'technology')
            .map(item=> (
                <React.Fragment>
                     <p key={item.id}>{item.productName} - {item.price}</p>
                     <button onClick={() => deleteItem(item.id)}>Delete</button>
                </React.Fragment>
               
                
            ))}
        </div>
        <div>
            <h2>Food Items:</h2>
            {myData
            .filter(item => item.category === 'Food')
            .map(item => (
                <React.Fragment>
                <p key={item.id}>{item.productName} - {item.price}</p>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
           </React.Fragment>
           ))}
        </div>
        <div>
            <h2>SkinCare Items:</h2>
            {myData
            .filter(item => item.category === 'SkinCare')
            .map(item => (
                <React.Fragment>
                     <p key={item.id}>{item.productName} - {item.price}</p>
                     <button onClick={() => deleteItem(item.id)}>Delete</button>
                </React.Fragment>
            ))}
        </div>
      </div>

    </React.Fragment>
  );
}

export default InputForm;
