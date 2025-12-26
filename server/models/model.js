
//For creating table if table is not available
//you have to run only one time to create user table

import db from "../config/Db.js";

const model =async() => {
    const table=await db.execute("create table user (id int auto_increament primary key,name varchar(50) not null,email varchar(50) not null, image varchar(200))")
    if (!table) {
        console.log("Model is not created..!")
    }
    console.log("Model is created")
}

export default model