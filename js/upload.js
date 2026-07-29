const Upload={

    init(){

        this.input=

        document.getElementById("zipInput");

        this.drop=

        document.getElementById("dropArea");

        this.button=

        document.getElementById("browseBtn");

        this.events();

    },

    events(){

        this.button.onclick=()=>{

            this.input.click();

        };

        this.input.onchange=(e)=>{

            if(e.target.files.length){

                Parser.load(

                    e.target.files[0]

                );

            }

        };

    }

};