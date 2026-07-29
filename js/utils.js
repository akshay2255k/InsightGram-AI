const Utils = {

    $(selector){

        return document.querySelector(selector);

    },

    $all(selector){

        return [...document.querySelectorAll(selector)];

    },

    save(key,data){

        localStorage.setItem(

            key,

            JSON.stringify(data)

        );

    },

    load(key){

        return JSON.parse(

            localStorage.getItem(key)

        );

    },

    toast(title,message){

        Toast.show(title,message);

    }

};