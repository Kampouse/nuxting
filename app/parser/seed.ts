import {MockData } from  "./index"
import { useDB } from '~/server/db/drizzle';
import { userTable  } from '~/server/db/schema';




 const  main = () => {


const db = useDB()

MockData()
db.select().from(userTable).execute().then((result) => {
    console.log(result);
});



}


main()




