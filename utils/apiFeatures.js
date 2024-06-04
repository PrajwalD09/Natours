class APIFeatures {
  constructor(query, queryString) {
    // (mongoose, express)
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) FILTERING
    const queryObj = { ...this.queryString }; // hard copy of query object by destructuring
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2) ADVANCE FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this; //return entire object
  }

  sort() {
    // 4) SORTING
    if (this.queryString.sort) {
      // sort more than 1 field e.g sort('price ratingsAverage')
      const sortBy = this.queryString.sort.split(',').join(' '); // this will split the sort query
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // 5) LIMITING FIELDS
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // 6) PAGINATION
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
