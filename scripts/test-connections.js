import prisma from "./../src/models/prisma.js"

try {
    await prisma.$connect();
    console.log("Database connected succesfully !");
}
catch(error) {
    console.error("Connection failed", error.message);
}
finally {
    await prisma.$disconnect()
}