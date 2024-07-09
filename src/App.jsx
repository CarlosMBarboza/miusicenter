import { useState } from "react";
import { Guitar } from "./components/Guitar.jsx";
import { Header } from "./components/Header.jsx";
import { db } from './data/db.js'

export const App = () => {
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists === 0) { // Si no existe el item en el carrito, lo agregamos
            const updatedCart = [...cart]// Si existe, incrementamos la cantidad
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }
    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }
    function increaseQuantity(id){
        const itemIndex = cart.findIndex(guitar => guitar.id === id)
        if(itemIndex!== -1){
            const updatedCart = [...cart]
            updatedCart[itemIndex].quantity++
            setCart(updatedCart)
        }
    }
    function decreaseQuantity(id){
        const itemIndex = cart.findIndex(guitar => guitar.id === id)
        if(itemIndex!== -1 && cart[itemIndex].quantity > 1){
            const updatedCart = [...cart]
            updatedCart[itemIndex].quantity--
            setCart(updatedCart)
        }
    }

    return (
        <>
            <Header
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}/>

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {
                        data.map((guitar) => (
                            <Guitar
                                key={guitar.id}
                                guitar={guitar}
                                setCart={setCart}
                                cart={cart}
                                addToCart={addToCart}
                            />
                        ))
                    }
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA </p>
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        Instrumentos y Cursos{" "}
                    </p>
                </div>
            </footer>
        </>
    );
};
