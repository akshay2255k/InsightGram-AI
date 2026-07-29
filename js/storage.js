const Storage={

    completed:[],

    favourite:[],

    init(){

        this.completed=

        Utils.load("completed")||[];

        this.favourite=

        Utils.load("favourite")||[];

    },

    save(){

        Utils.save(

            "completed",

            this.completed

        );

        Utils.save(

            "favourite",

            this.favourite

        );

    }

};