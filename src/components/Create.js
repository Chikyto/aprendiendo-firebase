import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const [ description, setDescription] = useState('')
  const [ stock, setStock] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, 'products')
  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, {description: description, stock: stock, })
    navigate('/')
}

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Crear Producto</h1>
          <form onSubmit={store}>
            <div className="form-group">
              <label for="description">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
