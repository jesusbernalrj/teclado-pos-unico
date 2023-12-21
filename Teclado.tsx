import { useState } from "react";
import { useHomePageContext } from "../../page/Private/HomePage/Context/HomePageContext";
import useDraggable from "../../helpers/Dragger";
import './teclado.css'
import { FiDelete, FiArrowDown, FiArrowUp } from "react-icons/fi";
import { TbLetterCaseUpper } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import {GoNumber} from 'react-icons/go'
interface VirtualKeyboardProps {
  activeInputId: string;
  onInputChange: (newValue: string) => void; 

}
const VirtualKeyboard = ({activeInputId, onInputChange}: VirtualKeyboardProps) => {
      const {cartItems, indice, setCartItems} = useHomePageContext()
     const quantityCartItems = cartItems && cartItems[indice];

  const getItemQuantity = (producto_identificador: string) => {
    return quantityCartItems?.find((item) => item.id === producto_identificador)?.quantity || 0;
  };
  const getValue = getItemQuantity(activeInputId);
  const [inputValue, setInputValue] = useState(getValue);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setInputValue(newValue);
  
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [indice]: prevCartItems[indice].map((item) =>
          item.id === activeInputId ? { ...item, quantity: newValue } : item
        ),
      }));
    }
    if (newValue === 0) {
      setInputValue(1);
    }
  };
  const handleKeyPress = (keyValue: string) => {
    const activeInput = document.getElementById(activeInputId) as HTMLInputElement;
    if (activeInput ) {
      activeInput.value += keyValue;
       const event = {
        target: activeInput
      } as React.ChangeEvent<HTMLInputElement>;
     
      if(activeInputId === 'search') {
        onInputChange(activeInput.value)
      }
      handleInputChange(event);
    }
  };
  const handleBackspace = () => {
    const activeInput = document.getElementById(activeInputId) as HTMLInputElement;
    if (activeInput) {
      activeInput.value = activeInput.value.slice(0, -1);
  
      const event = {
        target: activeInput
      } as React.ChangeEvent<HTMLInputElement>;
      if(activeInputId === 'search') {
        onInputChange(activeInput.value)
      }
      handleInputChange(event);
    }
  };
  const [openTeclado, setOpenTeclado] = useState(false)
  const handleOpenTeclado = () => {
    setOpenTeclado(true)
  }
  const handleCloseTeclado = () => {
    setOpenTeclado(false)
  }
  const draggableRef = useDraggable('draggable-element');
  const draggableRefText = useDraggable('draggable-element-teclado');

  const [tecladoVisibles, setTecladoVisibles] = useState(true);
 
  const handleBackspaceClean = () => {
    const activeInput = document.getElementById(activeInputId) as HTMLInputElement;
    if (activeInput) {
      activeInput.value = '';
      const event = {
        target: activeInput
      } as React.ChangeEvent<HTMLInputElement>;
      if(activeInputId === 'search') {
        onInputChange(activeInput.value)
      }
      handleInputChange(event);
    }
  } 

  const addtoCarrito = (producto_identificador: string) => {
    const findCartItems = quantityCartItems?.find((item) => item.id === producto_identificador);
    if (findCartItems) {
      // Si ya existe en el carrito, incrementar la cantidad
      setCartItems((cart) => ({
        ...cart,
        [indice]: cart[indice]?.map((item) =>
          item.id === producto_identificador ? { ...item, quantity: findCartItems.quantity + 1 } : item
        ),
      }));
    } 
  };

  const decrementCarrito = (producto_identificador: string) => {
    const findProduct = quantityCartItems?.find((item) => item.id === producto_identificador);
    if (findProduct && findProduct.quantity > 1) {
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [indice]: prevCartItems[indice].map((item) =>
          item.id === producto_identificador ? { ...item, quantity: findProduct.quantity - 1 } : item
        ),
      }));
    } else {
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [indice]: prevCartItems[indice]?.filter((item) => item.id !== producto_identificador),
      }));
    
    }
  };

  const handleSpace = () => {
    const activeInput = document.getElementById(activeInputId) as HTMLInputElement;
    if (activeInput) {
      activeInput.value += ' ';
      const event = {
        target: activeInput
      } as React.ChangeEvent<HTMLInputElement>;
      if(activeInputId === 'search') {
        onInputChange(activeInput.value)
      }
      handleInputChange(event);
    }
  }
  return (
    <>
    <button  className="btn w-100 btn-success mr-2 fs-2" style={{position: 'relative', height:'80px'}}  onClick={handleOpenTeclado}>Teclado</button>
    { openTeclado && 
    <>
   { tecladoVisibles ?
   <>
   <div ref={draggableRef} id='draggable-element' className={`bg-white teclado container-teclado`} style={{position:'absolute', left: '50%', top: '-50px', transform: 'translate(-50%, -50%)'}}>

   <form className='formsss'>
    <button className='btn text-danger buttonXe teclado-styles' onClick={handleCloseTeclado}><IoMdClose/></button>
    </form>
        <div className="box containerT">
      
            <div>
                <button className='btn buttonN teclado-styles'  onClick={() =>handleKeyPress('10')} >10</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('7')}>7</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('8')}>8</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('9')}>9</button>
              <button className='btn text-danger buttonT teclado-styles'  onClick={handleBackspace}><FiDelete/></button>
                <button className='btn buttonT teclado-styles' onClick={() => addtoCarrito(activeInputId)}><FiArrowUp/></button>
           </div>

            <div>
                <button className='btn buttonN teclado-styles' onClick={() =>handleKeyPress('20')} >20</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('4', )}>4</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('5', )}>5</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('6', )}>6</button>
                <button className='btn text-danger buttonT teclado-styles' onClick={handleBackspaceClean} >C</button>
                <button className='btn buttonT teclado-styles' onClick={() => decrementCarrito(activeInputId)}><FiArrowDown/></button>
            </div>

            <div>
                <button className='btn buttonN teclado-styles' onClick={() =>handleKeyPress('50')} >50</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('1', )}>1</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('2', )}>2</button>
                <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyPress('3', )}>3</button>
                <button className='btn buttonTcm' onClick={() => setTecladoVisibles(false)}><TbLetterCaseUpper/></button>
           </div>

            <div>
                <button className='btn buttonCn teclado-styles' onClick={() =>handleKeyPress('100')}>100</button>
                <button className='btn buttonC teclado-styles'  onClick={() =>handleKeyPress('0', )}>0</button>
                <button className='btn buttonP teclado-styles'  onClick={() =>handleKeyPress('.')}>.</button>
            </div>
          
        </div>
        </div> 
    
        </>
       :
       <>
           <div className={`box containerTc 'teclado-letras-visible' `} ref={draggableRefText} id='draggable-element-teclado' style={{position:'absolute', left: '50%', top: '-50px', transform: 'translate(-50%, -50%)'}}>
       <form className='formsss'><button className='btn text-danger buttonXe teclado-styles' onClick={handleCloseTeclado} ><IoMdClose/></button></form>
       <div>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('1')}>1</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('2')}>2</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('3')}>3</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('4')}>4</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('5')}>5</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('6')}>6</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('7')}>7</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('8')}>8</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('9')}>9</button>
 <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('0')}>0</button>
 </div>

 <div>
   
 <div>
     <button className='btn buttonL teclado-styles'  onClick={(event) => { event?.stopPropagation(); handleKeyPress('Q')}}>Q</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('W')}>W</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('E')}>E</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('R')}>R</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('T')}>T</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('Y')}>Y</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('U')}>U</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('I')}>I</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('O')}>O</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('P')}>P</button>
   
 </div>

 <div>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('A')}>A</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('S')}>S</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('D')}>D</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('F')}>F</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('G')}>G</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('H')}>H</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('J')}>J</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('K')}>K</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('L')}>L</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('Ñ')}>Ñ</button>
 </div>

 <div>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('Z')}>Z</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('X')}>X</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('C')}>C</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('V')}>V</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('B')}>B</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('N')}>N</button>
     <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyPress('M')}>M</button>
     <button className='btn text-danger buttonL teclado-styles' onClick={handleBackspace} ><FiDelete/></button>
     <button className='btn text-danger buttonLct teclado-styles' onClick={handleBackspaceClean} >C</button>
     <button className='btn buttonSE teclado-styles' onClick={handleSpace} >_____</button>
     <button className='btn buttonE' onClick={() => setTecladoVisibles(true)}><GoNumber/></button>
   
   
 </div>

 </div>
 </div>
 </>
       }
       </>

    }
    </>
  );
};

export default VirtualKeyboard;

