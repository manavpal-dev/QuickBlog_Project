import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user:"manavapp",
  password:"123456",
  database:"quickblog",
  waitForConnections:true,
  connectionLimit:10
});

const connectDB = async () =>{
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Connected");
    connection.release();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export {pool};
export default connectDB;