import AppError from "../../error/AppError.js";

export   const validateSubCategory = (subCategory, validCategories) => {
    // Ensure subCategory is an object with bn and en properties
    if (!subCategory || !subCategory.bn || !subCategory.en) {
      throw new AppError(400, "Invalid subCategory format.");
    }

    // Check if the subCategory exists in the valid categories
    const isValidSubCategory = validCategories.some(
      (valid) => valid.bn === subCategory.bn && valid.en === subCategory.en
    );

    if (!isValidSubCategory) {
      const invalidPair = validCategories.find(
        (valid) => valid.bn === subCategory.bn || valid.en === subCategory.en
      );

      // Dynamic error message
      const errorMessage = invalidPair
        ? `SubCategory does not match the required values for ${invalidPair.bn} and ${invalidPair.en}`
        : "SubCategory does not match the required values for any valid category.";

      throw new AppError(400, errorMessage);
    }
  };