import { prisma } from "../config/db";

async function main(){
    await prisma.role.createMany({
        data:[
           {name:"ADMIN" },
           {name:"USER"},
           {name:"AIRLINE_BUSINESS"}
        ]
    });
}

main().then(async() => {
    await prisma.$disconnect()
}).catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1)
});