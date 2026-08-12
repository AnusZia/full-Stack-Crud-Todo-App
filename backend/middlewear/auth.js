import  Jwt  from "jsonwebtoken";


const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = Jwt.verify(token,  process.env.JWT_SECRET);

        req.userId = decoded.id;

        console.log("AUTH DONE");

        next();

    } catch (error) {
        console.log(error);
        res.json({
            message: "Unauthenticated"
        });
    }
};

export default isAuth
