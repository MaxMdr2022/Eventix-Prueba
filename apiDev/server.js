
//|||||||||||||||||||||||API EVENTOS||||||||||||||||||||||||||||||||||||||||||||||

//NOTA:  parados dentro de la carpeta apiDev  Hacen npm i para instalar puppeteer y random-useragent
// y con node server.js corren en consola.  CONTROL + C SI SE QUEDA COLGADO XD


const puppeteer = require("puppeteer");  // simula un browser de chrome
const randomUseragent = require("random-useragent"); // simula un usuario recorriendo el browser


// esta funcion 
const initialization = async ()=>{
    
    let api = [];
    
    const header = randomUseragent.getRandom(); // generamos un usuario virtual

    const browser = await puppeteer.launch(); // inicializamos el launcher de puppetter ( seria como abrir el browser)

    const page = await browser.newPage();  // abrimos una pestaña en el browser

    //-----------------------------------------------------------
    const page2 = await browser.newPage();  // lo mismo pero en una pag2

    await page2.setUserAgent(header);       // idem

    await page2.setViewport({width: 1920, height: 1080});  //idam
    //---------------------------------------------------------------

    await page.setUserAgent(header);  // usa el usuario virtual que va arecorrer la pagina

    await page.setViewport({width: 1920, height: 1080}); // simula que el sitio web que estamos abriendo tenga una pantalla de determiado tamaño. Eso es para que el sitio web sepa en que formato mostrar al pag

    await page.goto("https://www.passline.com/argentina"); //este es el sitio web que quiero que visite.  https://www.passline.com/eventos?page=1   https://www.passline.com/eventos/campana-de-abonados-nublense-temporada-2023-138744 https://www.passline.com/eventos?page=1  "https://www.passline.com/home"

    await page.waitForSelector(".grid-wrap"); // le digo que se pare en un determinado tag, le paso el tag, la .clase o el #id

    const listaEventos = await page.$$("#grid li");  // cuando se termine de renderizar el elemento de arriba, entramos a este elemento que le pasamos, que contiene cada evento de la primer pag. El $$ es para que puppeteer traiga todos los elementos que se repiten, si pongo $ trae el primero que encuentra.

    // console.log(listaEventos);
    let url = [];
    
    // const l = await listaEventos[0].$$("li")

    for(const item of listaEventos){  // recorre el arreglo listaDeItems que contiene todos los <li> con los eventos

        const link = await item.$("a");  // dentro del <li> hay un tag <a> que contiene la url del evento. (seria como el detalil del PI)

        // console.log(link)
        const getLink = await page.evaluate(e => e.getAttribute("href"), link);  // me traigo la URL
    
        // console.log(getLink);

        url.push(getLink); // pusheo la url al arreglo url
     
    };
    

    // console.log(url);

    

    for( const i of url){  // recorro el arreglo de url para entrar a cada detail (evento) de la primer pagina. 


        //--------------------------------NOMBRE EVENTO------------------------

        await page2.goto(i); // le paso la url del evento 


        await page2.waitForSelector(".contenedor"); // Lo mismo que arriba, que se pare en el tag X donde esta en este caso el nombre del evento.

        const listaDeItems = await page2.$("h3"); //  El nombre del evento esta en un h3  

        const nombre = await page2.evaluate( e => e.innerText, listaDeItems); // con innerText lo convierto en string y me lo guardo 

        // console.log("nombre: ",nombre);  
        
        
        // api.push({nombre});                     
 


        //----------------- FECHA EVENTO-------------------------------------------

        await page2.waitForSelector(".contenedor");    // lo mismo pero con la fecha XD
   
        const lislali = await  page2.$$("li");

        let arreglo = [];
 
        for (const i of lislali){


            const fecha = await i.evaluate(e => e.innerText, lislali);

            arreglo.push(fecha);
        }
        // console.log(arreglo);

        let arreglo2 = arreglo.filter(e=> e.includes("-"));

        // console.log(arreglo2);
        

        // api.push({fecha});

        //-----------------------UBICACION DEL EVENTO---------------------------

        await page2.waitForSelector(".donde");

        //    const p = await page.$("strong");

        //    const lugar = await page.evaluate(e => e.innerText, p);

        //    console.log(lugar);
    
        const p2 = await page2.$("p");

        const lugar2 = await page2.evaluate( e => e.innerText, p2);

        // console.log("lugar: ",lugar2);

        // api.push({ubication: lugar2});

        //---------------------------PRECIO DEL EVENTO-------------------------------

        await page2.waitForSelector(".sin-borde, .cont-desc")  
    
        const c = await page2.$$(".td-modify")
        
        
        let objeto = {}

        let pre = []
        if(c.length >0 ){

               

            let arr = []

            
            for(const i of c){

                const precio = await i.evaluate(e => e.innerText, c);

                arr.push( precio);
                // console.log(precio);
            };


            // let mapArr = arr.map(e=> e.toString().replace("\t", "")) //replace(/<[^>]*>?/g, '');
            // console.log(arr);

            let daa = arr.map(e => e.replace(/(\r\n\t|\n|\r|\t)/gm, " ").trim());
            // let daa = arr[0].a.replace(/(\r\n|\n|\r)/gm, "");
            // let daa2 = daa.find(e =>  e.includes("$"));

            let daa2 = daa.map(e => e.replace(/^\s+|\s+$|\s+(?=\s)/g, ""));
            // console.log(daa2);

            let daa3 = daa2.filter(e=> !e.includes("0 1"));

            // console.log(daa3);

           let daa4 = daa3.filter(e => e !== "Tipo de Ticket" && e !== "Valor" && e !== "Cantidad" && e !== "")

            if(daa4.length > 0){

                for (let i=0; i< daa4.length ; i++){


                 
                    // if(objeto.hasOwnProperty("tipoDeTicket") && objeto.hasOwnProperty("precio") ){

                    //     objeto.cantidad = daa4[i]  === "AGOTADO" || daa4[i] === "FINALIZADO" ? daa4[i] : "1000"
                    // }

                    if(daa4[i] !== "AGOTADO" && daa4[i] !== "FINALIZADO" && !daa4[i]?.includes("$") && daa4[i] !== "Entrada Liberada"){

                        objeto.tipoDeTicket = daa4[i];
                    }

                    if(daa4[i]?.includes("$") || daa4[i] == "Entrada Liberada" ){

                        objeto.precio = daa4[i]
                    }

                    if (objeto.hasOwnProperty("tipoDeTicket") && objeto.hasOwnProperty("precio") ){

                        // objeto.cantidad = "1000"
                        pre.push(objeto);
                        objeto = {};
                        
                    }


                }
                
                // console.log(pre);
            }

            // api.push(daa3);

        }else{

            // await page2.waitForSelector(".cont-desc");

            // const c1 = await page2.$(".text-mobile");
        
        
            // const c2 = await page2.evaluate(e => e.innerText, c1)

            // console.log("sin precio")
            
            daa3 = "Sin precio";
        }
    

        //---------------------------descripcion del evento -------------------------------------

        await page2.waitForSelector(".cont-desc");

        const q = await page2.$$("p");
        
        let arrS = [];
        for (const i of q){
        
            const summary = await i.evaluate(e => e?.innerText, q);
        
            arrS.push(summary)
            // console.log(summary);
        };
        
        let arrS2 = arrS.map( e=> e.replace(/(\r\n\t|\n|\r|\t)/gm, " ").trim());
        // console.log(arrS2);
        
        let arrS3 = arrS2.filter( e => e.length >0);
        
        // console.log(arrS3);
        
        // api.push(arrS3);

        //-------------------------IMAGEN DEL EVENTO ----------------------------

        await page2.waitForSelector(".nivoSlider")

        const d = await page2.$(".nivo-main-image");

        const imagen = await page2.evaluate(e => e.getAttribute("src"), d);

        // console.log(imagen);
        // api.push({img: imagen});


        //--------------PUSH A API------------------:

        api.push({

            name: nombre,
            date: arreglo2,
            location: lugar2,
            price: pre,
            description: arrS3,
            image: imagen

        });

    }

    // console.log(api);


    // let obj = {results: api};

    // return obj;





    //--------------------------------------------------------------------------------------------------------------------------



};

// initialization();

module.exports = initialization;



// console.log(api);




    //||||||||||||||||~~~~~~~~DOCUMENTACION~~~~~~~~~~~|||||||||||||||||||||||||||||||

    /*
        https://www.tutorialspoint.com/puppeteer/puppeteer_with_firefox.htm

        https://www.youtube.com/watch?v=DeWyVfdgKG4
        https://www.youtube.com/watch?v=BOpRu-vsj5s
    
    
    */









    //------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------PRUEBAS-------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------



    
//     let api = []
//     //-----------------nombre-----------------------------
//     await page.waitForSelector(".contenedor"); // .grid-wrap espera hasta llegar al selector que contiene la siguente clase/id, en este caso un id=grid contiene todos los eventos que muestra en la primer pag

//     const listaDeItems = await page.$("h3"); //$$  figcaption cuando se termine de renderizar el elemento de arriba, entramos a este elemento que le pasamos, que contiene cada evento de la primer pag. El $$ es para que puppeteer traiga todos los elementos que se repiten, si pongo $ trae el primero que encuentra.

//     const nombre = await page.evaluate( e => e.innerText, listaDeItems);

//     // console.log("nombre: ",nombre);

//     api.push({name:nombre});

//     //-----------------------fecha------------------------
//    await page.waitForSelector(".cont-head-ficha")
   
//     const lislali = await  page.$("li");
 
        
//     const fecha = await page.evaluate(e => e.innerText, lislali);

//     // console.log(fecha);

//     api.push({fecha});

//     //---------------------------ubicacion----------------
//    await page.waitForSelector(".donde");

//     //    const p = await page.$("strong");

//     //    const lugar = await page.evaluate(e => e.innerText, p);

//     //    console.log(lugar);
    
//    const p2 = await page.$("p")

//    const lugar2 = await page.evaluate( e => e.innerText, p2);

// //    console.log("lugar: ",lugar2);

//    api.push({ubication: lugar2})

//     //----------------------------precio--------------------------

//     await page.waitForSelector(".sin-borde");

//     const c = await page.$$(".td-modify"); // td

//     let arr = []

//     for(const i of c){

//         const precio = await i.evaluate(e => e.innerText, c);

//         arr.push( precio)
//         // console.log(precio);
//     }
   
//     // let mapArr = arr.map(e=> e.toString().replace("\t", "")) //replace(/<[^>]*>?/g, '')
//     // console.log(arr);

//     let daa = arr.map(e => e.replace(/(\r\n\t|\n|\r|\t)/gm, " ").trim())
//     // let daa = arr[0].a.replace(/(\r\n|\n|\r)/gm, "")
//     // let daa2 = daa.find(e =>  e.includes("$"))

//     let daa2 = daa.map(e => e.replace(/^\s+|\s+$|\s+(?=\s)/g, ""))
//     // console.log(daa2);

//     let daa3 = daa2.filter(e=> !e.includes("0 1"))

//     // console.log(daa3);

//     api.push(daa3);
//    //---------------------summary-----------------------------------------
    
//     await page.waitForSelector(".cont-desc");

//     const q = await page.$$("p");

//     let arrS = [];
//     for (const i of q){

//         const summary = await i.evaluate(e => e?.innerText, q);

//         arrS.push(summary)
//         // console.log(summary);
//     }

//     let arrS2 = arrS.map( e=> e.replace(/(\r\n\t|\n|\r|\t)/gm, " ").trim())
//     // console.log(arrS2);

//     let arrS3 = arrS2.filter( e => e.length >0)

//     // console.log(arrS3)

//     api.push(arrS3);

//     //----------------imagen-------------------------------------------------

//     await page.waitForSelector(".nivoSlider")

//     const d = await page.$(".nivo-main-image");

//     const imagen = await page.evaluate(e => e.getAttribute("src"), d);

//     // console.log(imagen);
//     api.push({img: imagen})




    // console.log(api);
    //--------------------------------------------------------------------------