class MultiLanguageQueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      // Add search logic for both "bn" and "en" fields
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.flatMap((field) => [
          { [`${field}.bn`]: { $regex: searchTerm, $options: "i" } },
          { [`${field}.en`]: { $regex: searchTerm, $options: "i" } },
        ]),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 3;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = this?.query?.fields
      ? this.query.fields.split(",").join(" ")
      : "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default MultiLanguageQueryBuilder;
