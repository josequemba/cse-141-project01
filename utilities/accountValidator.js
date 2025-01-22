const { body, validationResult } = require("express-validator");
const validate = {}

validate.saveUserRules = () => {
    return [
        body("firstName")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide a first name.")
            .isLength({ min: 1 })
            .withMessage("First name must be at least 1 character long."),
        
        body("lastName")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide a last name.")
            .isLength({ min: 1 })
            .withMessage("Last name must be at least 1 character long."),
        
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide an email.")
            .isEmail()
            .withMessage("Please provide a valid email address.")
            .isLength({ min: 1 })
            .withMessage("Email must be at least 1 character long."),
        
        body("favoriteColor")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide your favorite color.")
            .isString()
            .withMessage("Favorite color must be a valid string."),
        
        body("birthday")
            .trim()
            .notEmpty()
            .withMessage("Please provide your birthday.")
            .isISO8601()
            .withMessage("Please provide a valid date in the format YYYY-MM-DD.")
    ];
};

validate.checkData = async (req, res, next) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If validation errors are found, send a 400 response with error details
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array() // Returns the list of validation errors
        });
    }

    // If validation is successful, pass control to the next middleware
    next();
};

module.exports = validate;

