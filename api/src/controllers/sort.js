
const sorts = async(filter, state) =>{

    // console.log(filter);

    if(filter !== "notSort"){

        const eventFilter = filter === "A-Z" ? state.sort(function(a,b){

            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
            return 0;
        
        }) : state.sort(function (a,b){

            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;

            return 0;
        });

        return eventFilter;

    }else{

        return state;
    };
    

};

module.exports = sorts;