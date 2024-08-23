import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateDoc, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
      
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
         e.preventDefault();
         const product = doc(db, "products", id)
         const data = {description: description, stock: stock}
         await updateDoc(product, data)
         navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "products", id) )
        if(product.exists()) { 
            // console.log(product.data());
            setDescription(product.data().description);
            setStock(product.data().stock);  // Esto es para actualizar los valores en los inputs al cargar la vista.  // Este estado se actualiza cuando se llama a getProductById(id) en el useEffect.  // Esto es para que los inputs tengan los valores correctos al cargar la vista.  // Esto es para que los inputs tengan los valores correctos al cargar la vista.  // Este estado se actualiza cuando se llama a getProductById(id) en el useEffect.  // Esto es para que los inputs tengan los valores correctos al cargar la vista.  // Este estado se actualiza cuando se llama a getProductById(id) en el useEffect.  // Esto es para que los inputs tengan los valores correctos al cargar la vista.  // Este estado se actualiza
        }else {
            console.log("El producto no existe")
        };
    }  
    

    useEffect( () => {
        if (id) {
        console.log("Buscando el producto con ID:", id);
        getProductById(id);
        } else {
          console.log("El producto no existe", id);
        }
    }, [id])


return (
  <>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Editar Producto</h1>
          <form onSubmit={update}>
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
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
);

}

export default Edit;
