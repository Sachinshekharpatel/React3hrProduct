import React, { useState, useEffect, useRef } from 'react';

function InputForm(){
  const initialData= [
    { id: 1, Name: "Laptop", Price: '49999', category: "technology"}
  ];
      const [data,setData] = useState(initialData);
      const [selectedCategory,setSelectedCategory] = useState('technology');
      

      const productIDRef = useRef(null);
      const productNameRef = useRef(null);
      const productPriceRef = useRef(null);

      useEffect(() => {
        const ls = JSON.parse(localStorage.getItem('array')) || [];
        if (ls.length>0) {
          setData(ls);
        }
      }, []);
      
      const handleCategoryChange=(e)=>{
        setSelectedCategory(e.target.value);  
        }

      const sendData=()=>{
        const Id = productIDRef.current.value;
        const Name = productNameRef.current.value;  
        const Price = productPriceRef.current.value;
        if(Id>0 && Name.length>0  && Price>0){

        const obj = {
          id:Id,
          Name:Name,
          Price:Price,
          category:selectedCategory
        }
        const newData = [...data, obj];
        setData(newData);
        
        localStorage.setItem('array',JSON.stringify(newData));
        
         productIDRef.current.value ="";
         productNameRef.current.value="";  
         productPriceRef.current.value="";
       }else {
        alert("Please Fill All The Detail")
       }
      }

    const deletebtn =(itemId)=>{
      const deleteItem = data.filter((item)=> item.id !== itemId)
      localStorage.setItem('array',JSON.stringify(deleteItem));
      setData(deleteItem);
    }

  return (
    <React.Fragment>
      <div>
        <label>Product id :</label>
        <input type='number'placeholder='Enter ID' ref={productIDRef} ></input>
        <label>Selling price :</label>
        <input type='number'placeholder='Enter Price' ref={productPriceRef}></input>
        <label>Product Name :</label>
        <input type='text' placeholder='Enter Product Name' ref={productNameRef}></input>
        <label>Choose a category :</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="technology">Technology</option>
          <option value="SkinCare">SkinCare</option>
          <option value="Food">Food</option>
        </select>
        <button onClick={sendData}>Click To add Data</button>
      </div>
      <div>
        <div>
          <h2 style={{textAlign:'start'}}>Technology Items:</h2>
          {data.filter((item)=> item.category === 'technology')
          .map((items)=>{
            return(
            <React.Fragment key={items.id}>
              <div style={{ textAlign:'start'}}>
              <p>{items.Name}-{items.Price}</p>
              <button onClick={()=> deletebtn(items.id)}>Delete</button>
             </div>
            </React.Fragment>
            )
          })}
        </div>
        <div>
          <h2 style={{ textAlign:'start'}}>Food Items:</h2>
          {data.filter((item)=>item.category === 'Food')
          .map((items)=>{
            return(
              <React.Fragment key={items.id}>
              <div style={{ textAlign:'start'}}>
              <p>{items.Name}-{items.Price}</p>
              <button onClick={()=> deletebtn(items.id)}>Delete</button>
             </div>
            </React.Fragment>
            )
          })}
        </div>
        <div>
          <h2 style={{ textAlign:'start'}}>SkinCare Items:</h2>
          {data.filter((item)=>item.category === 'SkinCare')
          .map((items)=>{
            return(
              <React.Fragment key={items.id}>
              <div style={{ textAlign:'start'}}>
              <p>{items.Name}-{items.Price}</p>
              <button onClick={()=> deletebtn(items.id)}>Delete</button>
             </div>
            </React.Fragment>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
export default InputForm;
