import React, {useEffect, useState, useContext} from 'react'
import StateContext from '../Contexts/StateContext'
import { getSearch1, getSearch2, getSearch3} from '../Services/BusquedasDB'


function BotonBusq (props){
    

    console.log('ENTRA EN BOTONBUSQ')  

    const {menuDoc,funcSetMenuDoc, estado, funcSetEstado, trans, funcSetTrans, mens, funcSetMens} = useContext(StateContext)



    const {pases} = props

    const {pase, pasando, variab1}  = pases
    
    const {variab, setVariable, ruta, setRutas }  = variab1
   
    const [pedidoFinal, setPedidoFinal] = useState({})
    
    const[loading, setLoading] = useState(false)


    const paseCero=  {
        provincia:"", localidad:"", actividad:"", descripcion:"", avance:"", url:"TODAS", oferta:"", destacado:""
      }

      const [comodin, setComodin]  = useState(false)

      const [comodin2, setComodin2]  = useState(false)

    console.log('Entra en BotonBusq estado', estado )  
    
    console.log('CCCCCCCCCCCCCCC]Entrega variab BotonBusq ', variab);

    console.log('BotonBusq entrega variab variab, pase, pasando, ruta ', variab, pase, pasando, ruta );

    console.log(' pedidoFinal :',  pedidoFinal, 'loading :',loading, 'comodin', comodin, 'comodin2', comodin2, 'variab.length ', variab.length)


    if(comodin === true & variab.length === 0 ){

        var alfa = !comodin2

        setComodin2(alfa)

        console.log('comodin2', comodin2)
    }



    function handleForm() { 

                        console.log('ENTRA EN HANDLERFORM BOTONBUSQ')  

                        console.log(' pase en handleForm BotonBusq', pase)

                        console.log(' estado en handleForm BotonBusq', estado)

                        // funcSetEstado(true)

                        const {provincia, localidad, actividad, descripcion, url, destacado, oferta }= pase
                        
                        const copiaB = {provincia, localidad, actividad}

                        console.log(' copiaB en handleForm BotonBusq', provincia, localidad, actividad)
                        
                        const copiaA = {}

                            console.log('copiaA entra en handleForm  BotonBusq', copiaA)


                                        for( let prop in copiaB) {
                                

                                            (copiaB[prop] === '' ) ?  
                                            (console.log ('Aqui',   prop, copiaB[prop]) ) : copiaA[prop] = copiaB[prop] 


                                        }   

                                        console.log('copiaA final ', copiaA)

                                        setPedidoFinal(copiaA) 

                                        console.log('setPedidoFinal(copiaA)', pedidoFinal)
          
                                        console.log('fin de handleForm pedidoFinal :',  pedidoFinal, 'loading :',loading)

                                        setComodin(true)

                                    }


    useEffect (()=> async () => {

                var long= Object.values(pedidoFinal).length

                console.log(' ENTRA EN USEEFFECT BOTONBUSQ')

                console.log(' pedidoFinal useEffect BotonBusq ', pedidoFinal)

                console.log('long useefect BotonBusq', long)


                if (long === 0) {

                            funcSetMens('Debe introducir un campo')
                            console.log(' entra en useEffect if (long === 0)', long)
                            console.log('setMensaje(Debe ingresar un campo)' , mens)
                            console.log('loading if useEffect:', loading)

                } else {

                        console.log('Entra en else if (long !== 0 )', long )

                            funcSetMens('Resultado de la búsqueda')

                            console.log('setMensaje("0") en else' , mens)

                                    setLoading(true)

                                    console.log("Entra switch long, pedidoFinal",long, pedidoFinal )

                                    console.log('loading else useEffect:', loading)


                                        switch(long) {
                                                
                                            case 1: 
                                            
                                                console.log("Entra switch 1")
                                                getSearch1(pedidoFinal)
                                                .then(res => { const query = res.docs;
                                                                console.log('ressss1', query);
                                                                setVariable(query);
                                                                return variab
                                                                }
                                                    )
                                                    .catch(e=> console.log(e))
                                                    break;
                                                
                                            case 2: 

                                                    console.log("Entra switch 2 ")
                                                    getSearch2(pedidoFinal)
                                                    .then( res => { const query = res.docs;
                                                        console.log('ressss2', query);
                                                        setVariable(query);
                                                        return variab
                                                        })
                                                        .catch(e=> console.log(e))
                                                        break;


                                            case 3: 

                                                    console.log("Entra switch 3")
                                                    getSearch3(pedidoFinal)
                                                    .then( res => { const query = res.docs;
                                                        console.log('ressss3', query);
                                                        setVariable(query);
                                                        return variab
                                                        })
                                                        .catch(e=> console.log(e))
                                                        break;

                                                                    
                                            default : 
                                                    console.log("Entra switch 0")
                                                
                                                    break;
                                        }


                               
                }
                
                

                console.log('fin de useefect pedidoFinal :',  pedidoFinal, 'loading :',loading, 'mensaje :', mens, 'variab :', variab)


    },[pedidoFinal, mens, variab, loading, comodin, comodin2]);
                





        return (

                    <div className= {'inputBotBus'}>
                                                
                    <button className="boton" onClick={handleForm}> Buscar</button>

                    </div>



                        
                        )
    }

export default BotonBusq
