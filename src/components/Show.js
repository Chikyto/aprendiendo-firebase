import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
  const [products, setProducts] = useState([])


  //2 - referenciamos a la DB firestore
  const productscollection = collection(db, "products")
  
  //3 - función para mostrar Todos los docs
  const getProducts = async () => {
    const data = await getDocs(productscollection)
    //console.log('esto es el console', data.docs)
    setProducts(
        data.docs.map( (doc) => ({ ...doc.data(), id: doc.id}))
    )
    console.log(products)
  }

  //4 - función para elimiar doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
      await deleteDoc(productDoc)
      getProducts()
  }
  
  //5 - función de confirmación para Seweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
    title: "Remove the product?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {  
        deleteProduct(id)
        Swal.fire(
        "Deleted!",
        "Your product has been deleted.",
        "success"
        )
    }
    });
  }


  //6 - usamos useEffect
  useEffect(() => {
    getProducts()
  }, [])


  //7 - devolvemos vista de nuestro componente

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-grid gap-2">
                <Link to="/create" className="btn btn-secondary mt-2 mb-2">Create</Link>
              </div> 
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                     {products.map( (product) => (
                        <tr key={product.id}>
                            <td>{product.description}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pencil"></i></Link>
                                <button onClick={()=>{confirmDelete(product.id)}} className="btn btn-danger"><i className='fa-solid fa-trash'></i></button>
                            </td>
                        </tr>
                     ))}

                    </tbody>
                </table>
              
            </div>
          </div>
        </div>
      </>
    );
}

export default Show;
