# MongoDB Complete Guide

## Table of Contents
1. [Introduction to MongoDB](#introduction-to-mongodb)
2. [MongoDB vs. SQL Databases](#mongodb-vs-sql-databases)
3. [MongoDB Basic Concepts](#mongodb-basic-concepts)
4. [Setting Up MongoDB](#setting-up-mongodb)
5. [MongoDB CRUD Operations](#mongodb-crud-operations)
   - [Create Operations](#create-operations)
   - [Read Operations](#read-operations)
   - [Update Operations](#update-operations)
   - [Delete Operations](#delete-operations)
6. [MongoDB Query Operators](#mongodb-query-operators)
7. [Aggregation Framework](#aggregation-framework)
8. [Indexing in MongoDB](#indexing-in-mongodb)
9. [MongoDB Data Modeling](#mongodb-data-modeling)
10. [MongoDB Atlas](#mongodb-atlas)
11. [Mongoose with Node.js](#mongoose-with-nodejs)
12. [Advanced MongoDB Features](#advanced-mongodb-features)
13. [Performance Optimization](#performance-optimization)
14. [MongoDB Security](#mongodb-security)
15. [Real-world Examples](#real-world-examples)

## Introduction to MongoDB

MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB doesn't require a predefined schema, making it ideal for applications with evolving data requirements.

**Key Features:**
- Document-oriented storage
- High performance
- High availability with replica sets
- Horizontal scalability with sharding
- Flexible schema design
- Support for ad hoc queries
- Indexing

**MongoDB Use Cases:**
- Content management systems
- Mobile applications
- Real-time analytics
- IoT applications
- Catalog management
- Personalization systems

## MongoDB vs. SQL Databases

| Feature | MongoDB | SQL Databases |
|---------|---------|---------------|
| Data Model | Document-oriented (BSON) | Table-oriented (Rows & Columns) |
| Schema | Dynamic/Flexible | Rigid/Predefined |
| Relationships | Embedded documents & References | Foreign keys |
| Query Language | JSON-based | SQL |
| Transactions | Multi-document (since v4.0) | ACID compliant |
| Scaling | Horizontal (Sharding) | Vertical (primarily) |
| Best for | Unstructured/Semi-structured data | Structured data with complex relationships |

### Terminology Comparison

| SQL | MongoDB |
|-----|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| JOIN | $lookup, Embedded Documents |
| Primary Key | _id field |
| Index | Index |

## MongoDB Basic Concepts

### Documents

The basic unit of data in MongoDB is a document - a JSON-like data structure composed of field-value pairs:

```json
{
  "_id": ObjectId("5f8d94c52cb5c66e126deada"),
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "hobbies": ["reading", "hiking", "coding"]
}
```

Key characteristics:
- Documents map to objects in programming languages
- Can contain nested documents and arrays
- Dynamic schema: documents in the same collection can have different fields
- Maximum BSON document size is 16MB

### Collections

Collections in MongoDB are analogous to tables in relational databases. They store documents and typically contain documents with similar or related purpose.

```
database
  └── collections
        └── documents
              └── fields
```

### _id Field

Every document in MongoDB must have an `_id` field that serves as a primary key:
- If not provided, MongoDB automatically generates an ObjectId
- Must be unique within a collection
- Cannot be changed once assigned
- Can be any type except arrays

## Setting Up MongoDB

### Installation

**For macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

**For Windows:**
1. Download the MongoDB Community Server from the official website
2. Run the installer and follow the instructions
3. Optionally install MongoDB Compass (GUI)

### Starting MongoDB

**For macOS/Linux:**
```bash
# Start MongoDB service
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

**For Windows:**
```
# MongoDB is installed as a service and starts automatically
# To start manually:
net start MongoDB
```

### MongoDB Shell

Connect to MongoDB using the mongo shell:

```bash
# Connect to local MongoDB instance
mongo

# Connect to remote MongoDB instance
mongo "mongodb://username:password@hostname:port/database"
```

MongoDB Shell commands:
```javascript
// Show all databases
show dbs

// Use a specific database
use mydatabase

// Show collections in the current database
show collections

// Display help
help
```

## MongoDB CRUD Operations

### Create Operations

MongoDB provides several methods for inserting documents into a collection:

#### insertOne()
Inserts a single document into a collection.

```javascript
db.products.insertOne({
  name: "Smartphone",
  brand: "Samsung",
  price: 699.99,
  specs: {
    storage: "128GB",
    ram: "8GB",
    camera: "64MP"
  },
  colors: ["Black", "Blue", "White"],
  inStock: true
})
```

#### insertMany()
Inserts multiple documents into a collection.

```javascript
db.products.insertMany([
  {
    name: "Laptop",
    brand: "Dell",
    price: 1299.99,
    specs: { storage: "512GB SSD", ram: "16GB" },
    colors: ["Silver", "Black"],
    inStock: true
  },
  {
    name: "Tablet",
    brand: "Apple",
    price: 499.99,
    specs: { storage: "64GB", ram: "4GB" },
    colors: ["Space Gray", "Silver", "Gold"],
    inStock: false
  }
])
```

### Read Operations

MongoDB offers various methods to query data from collections:

#### find()
Retrieves documents from a collection that match a query.

```javascript
// Find all documents in the collection
db.products.find()

// Find documents that match specific criteria
db.products.find({ brand: "Samsung" })

// Find with multiple criteria (AND)
db.products.find({ brand: "Apple", inStock: true })

// Find with nested fields
db.products.find({ "specs.storage": "128GB" })

// Find with array elements
db.products.find({ colors: "Black" })
```

#### findOne()
Returns the first document that matches a query.

```javascript
// Find the first document that matches the criteria
db.products.findOne({ brand: "Dell" })
```

#### Query Projection
Specify which fields to include or exclude in the results.

```javascript
// Include only specific fields (1 = include)
db.products.find({ brand: "Samsung" }, { name: 1, price: 1 })

// Exclude specific fields (0 = exclude)
db.products.find({ brand: "Samsung" }, { specs: 0, colors: 0 })
```

#### Cursor Methods
The find() method returns a cursor that can be modified with additional methods:

```javascript
// Sort results (1 = ascending, -1 = descending)
db.products.find().sort({ price: -1 })

// Limit the number of results
db.products.find().limit(5)

// Skip a number of documents
db.products.find().skip(5).limit(5)

// Count documents
db.products.find({ inStock: true }).count()

// Combine methods
db.products.find({ brand: "Samsung" }).sort({ price: 1 }).limit(3)
```

### Update Operations

MongoDB provides several methods to update existing documents:

#### updateOne()
Updates a single document that matches a specified filter.

```javascript
// Update a single document
db.products.updateOne(
  { name: "Smartphone" },
  { $set: { price: 649.99, "specs.camera": "108MP" } }
)
```

#### updateMany()
Updates all documents that match a specified filter.

```javascript
// Update multiple documents
db.products.updateMany(
  { brand: "Samsung" },
  { $set: { onSale: true }, $inc: { price: -50 } }
)
```

#### replaceOne()
Replaces a single document that matches a specified filter.

```javascript
// Replace an entire document
db.products.replaceOne(
  { name: "Tablet" },
  {
    name: "Tablet Pro",
    brand: "Apple",
    price: 799.99,
    specs: { storage: "256GB", ram: "8GB" },
    colors: ["Space Gray", "Silver"],
    inStock: true
  }
)
```

#### Update Operators

MongoDB provides various update operators to modify documents:

- `$set`: Sets field values
- `$unset`: Removes fields
- `$inc`: Increments field values
- `$mul`: Multiplies field values
- `$min`/`$max`: Updates if value is less/greater than specified value
- `$push`: Adds elements to arrays
- `$pop`: Removes first or last element from an array
- `$pull`: Removes elements from arrays that match a condition
- `$addToSet`: Adds elements to arrays only if they don't exist

Examples:

```javascript
// Increment a value
db.products.updateOne({ name: "Laptop" }, { $inc: { price: 100 } })

// Add an element to an array
db.products.updateOne({ name: "Smartphone" }, { $push: { colors: "Red" } })

// Remove a field
db.products.updateOne({ name: "Tablet" }, { $unset: { onSale: "" } })

// Add to array only if not exists
db.products.updateOne({ name: "Laptop" }, { $addToSet: { colors: "Red" } })
```

### Delete Operations

MongoDB provides methods to remove documents from collections:

#### deleteOne()
Deletes the first document that matches a specified filter.

```javascript
// Delete a single document
db.products.deleteOne({ name: "Tablet" })
```

#### deleteMany()
Deletes all documents that match a specified filter.

```javascript
// Delete multiple documents
db.products.deleteMany({ inStock: false })

// Delete all documents in a collection
db.products.deleteMany({})
```

## MongoDB Query Operators

MongoDB provides powerful query operators to create complex queries:

### Comparison Operators

- `$eq`: Equals
- `$ne`: Not equals
- `$gt`: Greater than
- `$gte`: Greater than or equal to
- `$lt`: Less than
- `$lte`: Less than or equal to
- `$in`: In an array
- `$nin`: Not in an array

```javascript
// Price greater than 500
db.products.find({ price: { $gt: 500 } })

// Price between 300 and 800
db.products.find({ price: { $gte: 300, $lte: 800 } })

// Brand is one of multiple values
db.products.find({ brand: { $in: ["Apple", "Samsung"] } })
```

### Logical Operators

- `$and`: Logical AND
- `$or`: Logical OR
- `$not`: Logical NOT
- `$nor`: Logical NOR

```javascript
// Logical AND
db.products.find({
  $and: [
    { price: { $lt: 1000 } },
    { inStock: true }
  ]
})

// Logical OR
db.products.find({
  $or: [
    { brand: "Apple" },
    { price: { $gt: 1000 } }
  ]
})

// Combined logical operators
db.products.find({
  $or: [
    { brand: "Apple" },
    { $and: [{ price: { $lt: 500 } }, { inStock: true }] }
  ]
})
```

### Element Operators

- `$exists`: Matches documents that have the specified field
- `$type`: Matches if field is of specified type

```javascript
// Field exists
db.products.find({ discount: { $exists: true } })

// Field is of specific type
db.products.find({ price: { $type: "number" } })
```

### Array Operators

- `$all`: Matches arrays containing all specified elements
- `$elemMatch`: Matches documents with array field containing at least one element matching criteria
- `$size`: Matches array with specific number of elements

```javascript
// Array contains all elements
db.products.find({ colors: { $all: ["Black", "White"] } })

// Array element matches criteria
db.users.find({
  orders: { $elemMatch: { status: "shipped", total: { $gt: 100 } } }
})

// Array has specific length
db.products.find({ colors: { $size: 3 } })
```

### Evaluation Operators

- `$regex`: Matches using regular expression pattern
- `$text`: Performs text search
- `$expr`: Allows use of aggregation expressions

```javascript
// Regex search
db.products.find({ name: { $regex: /^S/, $options: "i" } })

// Text search (requires text index)
db.products.createIndex({ description: "text" })
db.products.find({ $text: { $search: "wireless headphones" } })

// Expression
db.sales.find({ $expr: { $gt: ["$revenue", "$target"] } })
```

## Aggregation Framework

The MongoDB Aggregation Framework is a powerful tool for data processing and analysis. It allows you to transform and analyze data using a pipeline of stages.

### Basic Aggregation Pipeline

An aggregation pipeline consists of stages that process documents:

```javascript
db.collection.aggregate([
  { $stage1 },
  { $stage2 },
  ...
])
```

### Common Aggregation Stages

#### $match
Filters documents to pass only those that match specified conditions.

```javascript
db.sales.aggregate([
  { $match: { date: { $gte: new Date("2023-01-01") } } }
])
```

#### $group
Groups documents by specified expression and applies accumulator operators.

```javascript
db.sales.aggregate([
  { $group: {
      _id: "$category",
      totalSales: { $sum: "$amount" },
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  }
])
```

#### $project
Reshapes documents by including, excluding, or computing new fields.

```javascript
db.products.aggregate([
  { $project: {
      _id: 0,
      name: 1,
      category: 1,
      price: 1,
      tax: { $multiply: ["$price", 0.07] },
      totalPrice: { $add: ["$price", { $multiply: ["$price", 0.07] }] }
    }
  }
])
```

#### $sort
Sorts documents by specified fields.

```javascript
db.products.aggregate([
  { $sort: { price: -1 } }
])
```

#### $limit and $skip
Limits the number of documents or skips a number of documents.

```javascript
db.products.aggregate([
  { $sort: { price: -1 } },
  { $skip: 5 },
  { $limit: 10 }
])
```

#### $unwind
Deconstructs an array field to create a document for each element.

```javascript
db.products.aggregate([
  { $unwind: "$colors" },
  { $group: {
      _id: "$colors",
      count: { $sum: 1 }
    }
  }
])
```

### Complex Aggregation Example

```javascript
db.sales.aggregate([
  // Stage 1: Filter sales from 2023
  { $match: { 
    date: { $gte: new Date("2023-01-01"), $lt: new Date("2024-01-01") } 
  }},
  
  // Stage 2: Group by month and calculate totals
  { $group: {
    _id: { month: { $month: "$date" }, year: { $year: "$date" } },
    totalSales: { $sum: "$amount" },
    averageOrder: { $avg: "$amount" },
    count: { $sum: 1 }
  }},
  
  // Stage 3: Add month name
  { $project: {
    _id: 0,
    year: "$_id.year",
    month: "$_id.month",
    monthName: {
      $arrayElemAt: [
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        { $subtract: ["$_id.month", 1] }
      ]
    },
    totalSales: 1,
    averageOrder: 1,
    count: 1
  }},
  
  // Stage 4: Sort by year and month
  { $sort: { year: 1, month: 1 }}
])
```

## Indexing in MongoDB

Indexes improve query performance by allowing MongoDB to limit the number of documents it must scan.

### Creating Indexes

```javascript
// Create a single field index
db.products.createIndex({ name: 1 }) // 1 for ascending, -1 for descending

// Create a compound index
db.products.createIndex({ category: 1, price: -1 })

// Create a unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Create a text index
db.products.createIndex({ description: "text" })

// Create a geospatial index
db.places.createIndex({ location: "2dsphere" })
```

### Index Types

1. **Single Field**: Indexes on a single field
2. **Compound**: Indexes on multiple fields
3. **Multikey**: Indexes on array values
4. **Geospatial**: Indexes for geospatial coordinates
5. **Text**: Indexes for text search
6. **Hashed**: Indexes for hashing of the field value

### Index Management

```javascript
// List all indexes in a collection
db.products.getIndexes()

// Drop a specific index
db.products.dropIndex("name_1")

// Drop all indexes
db.products.dropIndexes()
```

### Index Options

```javascript
// Create an index with options
db.products.createIndex(
  { name: 1 },
  {
    unique: true,
    sparse: true,
    expireAfterSeconds: 3600,
    background: true
  }
)
```

### Index Performance and Analysis

```javascript
// Explain a query to see index usage
db.products.find({ category: "Electronics" }).explain("executionStats")

// Check which indexes a query would use
db.products.find({ name: "Smartphone", price: { $gt: 500 } }).hint({ name: 1 }).explain()
```

## MongoDB Data Modeling

Unlike relational databases, MongoDB offers multiple approaches to model relationships between data:

### Embedded Documents
Best for "contains" relationships and when the embedded data is always accessed with the parent document.

```javascript
// User document with embedded address
{
  "_id": ObjectId("5f8d94c52cb5c66e126deada"),
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
}
```

### Document References
Best for "many-to-many" relationships or when the referenced data is frequently accessed independently.

```javascript
// Product document with category reference
{
  "_id": ObjectId("5f8d94c52cb5c66e126deada"),
  "name": "Smartphone",
  "price": 699.99,
  "category_id": ObjectId("5f8d94c52cb5c66e126deade")
}

// Category document
{
  "_id": ObjectId("5f8d94c52cb5c66e126deade"),
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```

### Denormalization
Duplicating data across documents to optimize read performance.

```javascript
// Order with duplicated customer information
{
  "_id": ObjectId("5f8d94c52cb5c66e126deadb"),
  "order_id": "ORD12345",
  "customer": {
    "_id": ObjectId("5f8d94c52cb5c66e126deada"),
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [
    {
      "product_id": ObjectId("5f8d94c52cb5c66e126deadb"),
      "name": "Smartphone",
      "price": 699.99,
      "quantity": 1
    }
  ],
  "total": 699.99,
  "date": ISODate("2023-07-15T10:30:00Z")
}
```

### Data Modeling Considerations

When designing MongoDB schemas, consider:

1. **Read/Write Ratio**: Optimize for read-heavy or write-heavy workloads
2. **Query Patterns**: Model data based on how it will be queried
3. **Data Size**: Consider document growth over time
4. **Data Consistency**: Balance between consistency and performance
5. **Schema Flexibility**: Use dynamic schema to your advantage

### One-to-One Relationship Example

User and profile information:

```javascript
// Embedded approach (preferred for 1:1)
{
  "_id": ObjectId("..."),
  "username": "johndoe",
  "email": "john@example.com",
  "profile": {
    "fullName": "John Doe",
    "dateOfBirth": ISODate("1990-01-01"),
    "address": {
      "street": "123 Main St",
      "city": "New York"
    }
  }
}

// Referenced approach
// User document
{
  "_id": ObjectId("user123"),
  "username": "johndoe",
  "email": "john@example.com",
  "profile_id": ObjectId("profile123")
}

// Profile document
{
  "_id": ObjectId("profile123"),
  "user_id": ObjectId("user123"),
  "fullName": "John Doe",
  "dateOfBirth": ISODate("1990-01-01"),
  "address": {
    "street": "123 Main St",
    "city": "New York"
  }
}
```

### One-to-Many Relationship Example

Blog posts and comments:

```javascript
// Embedded approach (when "many" is relatively small)
{
  "_id": ObjectId("post123"),
  "title": "MongoDB Data Modeling",
  "content": "This is a post about MongoDB data modeling...",
  "comments": [
    {
      "user": "user456",
      "text": "Great post!",
      "date": ISODate("2023-07-20T14:30:00Z")
    },
    {
      "user": "user789",
      "text": "Very informative.",
      "date": ISODate("2023-07-20T15:45:00Z")
    }
  ]
}

// Referenced approach (when "many" could be large)
// Post document
{
  "_id": ObjectId("post123"),
  "title": "MongoDB Data Modeling",
  "content": "This is a post about MongoDB data modeling..."
}

// Comment documents
{
  "_id": ObjectId("comment1"),
  "post_id": ObjectId("post123"),
  "user": "user456",
  "text": "Great post!",
  "date": ISODate("2023-07-20T14:30:00Z")
}

{
  "_id": ObjectId("comment2"),
  "post_id": ObjectId("post123"),
  "user": "user789",
  "text": "Very informative.",
  "date": ISODate("2023-07-20T15:45:00Z")
}
```

### Many-to-Many Relationship Example

Students and courses:

```javascript
// Approach 1: References in both directions
// Student document
{
  "_id": ObjectId("student1"),
  "name": "Alice",
  "course_ids": [ObjectId("course1"), ObjectId("course2")]
}

// Course document
{
  "_id": ObjectId("course1"),
  "name": "MongoDB Basics",
  "student_ids": [ObjectId("student1"), ObjectId("student2")]
}

// Approach 2: Separate collection for relationships
// Student document
{
  "_id": ObjectId("student1"),
  "name": "Alice"
}

// Course document
{
  "_id": ObjectId("course1"),
  "name": "MongoDB Basics"
}

// Enrollment document
{
  "_id": ObjectId("enrollment1"),
  "student_id": ObjectId("student1"),
  "course_id": ObjectId("course1"),
  "enrolledDate": ISODate("2023-06-15"),
  "grade": "A"
}
```

## MongoDB Atlas

MongoDB Atlas is a fully managed cloud database service for MongoDB, offering:

- Automated backups and point-in-time recovery
- Auto-scaling
- Global clusters for low-latency global reads
- Advanced security features
- Performance monitoring and alerts
- Database access via multiple methods (MongoDB Shell, Compass, or Drivers)

### Setting Up MongoDB Atlas

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Configure network access (IP whitelisting)
4. Create database users
5. Connect to your cluster:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database>
   ```

### MongoDB Atlas Features

- **Data Explorer**: Browse and query your data
- **Performance Advisor**: Get index recommendations
- **Real-time Monitoring**: Track database performance
- **Backup & Restore**: Automated backups with point-in-time recovery
- **Security Features**: Network isolation, encryption, access controls
- **Integration**: Seamless integration with other MongoDB products

## Mongoose with Node.js

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data.

### Installing Mongoose

```bash
npm install mongoose
```

### Connecting to MongoDB

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
```

### Defining a Schema

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  age: {
    type: Number,
    min: 18,
    max: 120
  },
  isActive: {
    type: Boolean,
    default: true
  },
  roles: {
    type: [String],
    enum: ['user', 'admin', 'editor'],
    default: ['user']
  },
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model from schema
const User = mongoose.model('User', userSchema);
```

### CRUD Operations with Mongoose

#### Create

```javascript
// Create a new user
async function createUser() {
  try {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      roles: ['user', 'admin'],
      address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001'
      }
    });
    
    const result = await user.save();
    console.log('User created:', result);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}

// Alternative create method
async function createUser2() {
  try {
    const result = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 28
    });
    console.log('User created:', result);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}
```

#### Read

```javascript
// Find all users
async function findAllUsers() {
  try {
    const users = await User.find();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error finding users:', error.message);
  }
}

// Find user by ID
async function findUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) return console.log('User not found');
    console.log('User found:', user);
  } catch (error) {
    console.error('Error finding user:', error.message);
  }
}

// Find users with filters
async function findUsers() {
  try {
    const users = await User.find({ age: { $gte: 25 } })
      .select('name email age')
      .sort({ name: 1 })
      .limit(10);
    console.log('Filtered users:', users);
  } catch (error) {
    console.error('Error finding users:', error.message);
  }
}
```

#### Update

```javascript
// Update a user
async function updateUser(id) {
  try {
    const user = await User.findByIdAndUpdate(id, 
      { 
        $set: { 
          age: 31,
          'address.city': 'San Francisco'
        }
      },
      { new: true } // Return updated document
    );
    
    if (!user) return console.log('User not found');
    console.log('Updated user:', user);
  } catch (error) {
    console.error('Error updating user:', error.message);
  }
}

// Update multiple users
async function updateUsers() {
  try {
    const result = await User.updateMany(
      { isActive: true },
      { $set: { isVerified: true } }
    );
    
    console.log(`${result.modifiedCount} document(s) updated`);
  } catch (error) {
    console.error('Error updating users:', error.message);
  }
}
```

#### Delete

```javascript
// Delete a user
async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    
    if (!user) return console.log('User not found');
    console.log('Deleted user:', user);
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
}

// Delete multiple users
async function deleteUsers() {
  try {
    const result = await User.deleteMany({ isActive: false });
    console.log(`${result.deletedCount} document(s) deleted`);
  } catch (error) {
    console.error('Error deleting users:', error.message);
  }
}
```

### Mongoose Schemas - Advanced Features

#### Validation

```javascript
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive'],
    validate: {
      validator: function(value) {
        return value % 0.01 === 0; // Validates to 2 decimal places
      },
      message: 'Price can only have up to 2 decimal places'
    }
  },
  sku: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[A-Z]{3}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid SKU format!`
    }
  }
});
```

#### Middleware (Pre/Post Hooks)

```javascript
// Pre-save middleware (runs before saving)
userSchema.pre('save', function(next) {
  // 'this' refers to the document being saved
  if (this.isModified('password')) {
    // Hash password logic would go here
    this.password = hashPassword(this.password);
  }
  
  this.updatedAt = Date.now();
  next();
});

// Post-save middleware (runs after saving)
userSchema.post('save', function(doc, next) {
  console.log(`${doc.name} has been saved`);
  next();
});

// Other common hooks: 'remove', 'updateOne', 'findOneAndUpdate', etc.
```

#### Instance Methods

```javascript
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  // Example password comparison
  return await bcrypt.compare(candidatePassword, this.password);
};

// Usage
const user = await User.findById(id);
console.log(user.getFullName());
const isMatch = await user.comparePassword('password123');
```

#### Static Methods

```javascript
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true });
};

// Usage
const user = await User.findByEmail('john@example.com');
const activeUsers = await User.findActiveUsers();
```

#### Virtual Properties

```javascript
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts[1];
});

// Usage
const user = new User({ firstName: 'John', lastName: 'Doe' });
console.log(user.fullName); // 'John Doe'

user.fullName = 'Jane Smith';
console.log(user.firstName); // 'Jane'
console.log(user.lastName); // 'Smith'
```

## Advanced MongoDB Features

### Transactions

MongoDB supports multi-document transactions (fully ACID compliant since version 4.0):

```javascript
const session = client.startSession();

try {
  session.startTransaction();
  
  // Perform operations within the transaction
  await accounts.updateOne(
    { _id: fromAccount },
    { $inc: { balance: -amount } },
    { session }
  );
  
  await accounts.updateOne(
    { _id: toAccount },
    { $inc: { balance: amount } },
    { session }
  );
  
  // Commit the transaction
  await session.commitTransaction();
} catch (error) {
  // If an error occurred, abort the transaction
  await session.abortTransaction();
  console.error('Transaction failed:', error);
} finally {
  // End the session
  session.endSession();
}
```

### Change Streams

Change streams allow applications to watch for changes in the database in real-time:

```javascript
const changeStream = collection.watch();

changeStream.on('change', (change) => {
  console.log('Detected change:', change);
  
  // React to the change (e.g., update UI, trigger actions)
  if (change.operationType === 'insert') {
    console.log('New document:', change.fullDocument);
  } else if (change.operationType === 'update') {
    console.log('Updated fields:', change.updateDescription.updatedFields);
  } else if (change.operationType === 'delete') {
    console.log('Deleted document ID:', change.documentKey._id);
  }
});
```

### Time Series Collections

MongoDB 5.0+ supports time series collections for efficient storage and querying of time-based data:

```javascript
// Create a time series collection
db.createCollection("deviceReadings", {
  timeseries: {
    timeField: "timestamp",
    metaField: "deviceId",
    granularity: "minutes"
  }
});

// Insert data
db.deviceReadings.insertOne({
  deviceId: "D001",
  timestamp: new Date(),
  temperature: 23.5,
  humidity: 45.2,
  batteryLevel: 82
});

// Query by time range
db.deviceReadings.find({
  timestamp: {
    $gte: ISODate("2023-07-01T00:00:00Z"),
    $lt: ISODate("2023-07-02T00:00:00Z")
  }
});
```

### Schema Validation

MongoDB allows you to enforce document validation rules:

```javascript
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        price: {
          bsonType: "number",
          minimum: 0,
          description: "must be a positive number and is required"
        },
        category: {
          bsonType: "string",
          enum: ["Electronics", "Clothing", "Food", "Books"],
          description: "must be one of the enum values and is required"
        },
        description: {
          bsonType: "string",
          description: "must be a string if the field exists"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
```

### Atlas Search

MongoDB Atlas provides full-text search capabilities:

```javascript
// Create search index
db.products.createIndex({
  name: "text",
  description: "text"
});

// Perform text search
db.products.find({
  $text: {
    $search: "wireless headphones",
    $caseSensitive: false,
    $diacriticSensitive: false
  }
}).sort({ score: { $meta: "textScore" } });
```

## Performance Optimization

### Query Optimization

1. **Use Proper Indexes**:
   ```javascript
   // Check if a query is using an index
   db.products.find({ category: "Electronics" }).explain("executionStats")
   
   // Create appropriate indexes
   db.products.createIndex({ category: 1, price: -1 })
   ```

2. **Limit Fields Returned**:
   ```javascript
   // Only return needed fields
   db.products.find({ category: "Electronics" }, { name: 1, price: 1 })
   ```

3. **Use Limit and Skip Efficiently**:
   ```javascript
   // Implement pagination
   db.products.find().sort({ _id: 1 }).skip(20).limit(10)
   ```

4. **Avoid Regex Queries Without Anchors**:
   ```javascript
   // Prefer
   db.products.find({ name: /^Apple/ }) // Can use index
   
   // Avoid
   db.products.find({ name: /Apple/ }) // Cannot use index efficiently
   ```

### Schema Optimization

1. **Embed or Reference**:
   - Embed when data is always accessed together
   - Reference when data is frequently accessed independently

2. **Avoid Unbounded Arrays**:
   - Limit the size of arrays in documents
   - Consider separate collections for potentially large arrays

3. **Data Types Matter**:
   - Use appropriate BSON types for your data
   - Integers (32-bit) use less space than doubles

4. **Normalize When Necessary**:
   - Normalize data that changes frequently
   - Denormalize data that is read frequently but rarely changes

### Server-Side Optimization

1. **Use Projections**:
   ```javascript
   // Only return needed fields
   db.products.find({}, { name: 1, price: 1, _id: 0 })
   ```

2. **Use Covered Queries**:
   ```javascript
   // Create an index that covers all fields in the query
   db.products.createIndex({ category: 1, price: 1 })
   
   // Covered query (all fields in query are part of the index)
   db.products.find({ category: "Electronics" }, { _id: 0, category: 1, price: 1 })
   ```

3. **Use Explain for Analysis**:
   ```javascript
   // Analyze query performance
   db.products.find({ price: { $gt: 100 } }).explain("executionStats")
   ```

4. **Monitor Performance**:
   - Use MongoDB Compass or Atlas monitoring
   - Check for slow queries and optimize them

## MongoDB Security

### Authentication

1. **Enable Authentication**:
   ```javascript
   // In configuration file (mongod.conf)
   security:
     authorization: enabled
   ```

2. **Create Admin User**:
   ```javascript
   use admin
   db.createUser({
     user: "adminUser",
     pwd: "securePassword",
     roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
   })
   ```

3. **Create Database-Specific Users**:
   ```javascript
   use myDatabase
   db.createUser({
     user: "appUser",
     pwd: "appPassword",
     roles: [{ role: "readWrite", db: "myDatabase" }]
   })
   ```

### Network Security

1. **Bind to Localhost Only**:
   ```
   # In mongod.conf
   net:
     bindIp: 127.0.0.1
   ```

2. **Use TLS/SSL**:
   ```
   # In mongod.conf
   net:
     ssl:
       mode: requireSSL
       PEMKeyFile: /path/to/ssl/cert.pem
   ```

3. **Use IP Whitelisting**:
   - In MongoDB Atlas: Configure IP Access Lists
   - On-premise: Use firewall rules

### Data Security

1. **Field-Level Encryption**:
   - Encrypt sensitive fields client-side before storing
   - Available in MongoDB Enterprise and Atlas

2. **Role-Based Access Control**:
   ```javascript
   // Create a read-only role
   db.createRole({
     role: "readOnly",
     privileges: [
       { resource: { db: "myDatabase", collection: "" }, actions: ["find"] }
     ],
     roles: []
   })
   
   // Assign the role to a user
   db.grantRolesToUser("appUser", ["readOnly"])
   ```

3. **Auditing**:
   - Enable auditing to track user activities
   - Available in MongoDB Enterprise and Atlas

## Real-world Examples

### E-commerce Product Catalog

```javascript
// Product schema
{
  "_id": ObjectId("..."),
  "name": "Wireless Headphones",
  "sku": "AUDIO-1234",
  "price": {
    "amount": 99.99,
    "currency": "USD"
  },
  "category": {
    "_id": ObjectId("..."),
    "name": "Audio",
    "path": "Electronics > Audio"
  },
  "attributes": [
    { "name": "Color", "value": "Black" },
    { "name": "Connectivity", "value": "Bluetooth 5.0" },
    { "name": "Battery Life", "value": "20 hours" }
  ],
  "images": [
    {
      "url": "https://example.com/images/headphones-1.jpg",
      "alt": "Front view",
      "isPrimary": true
    },
    {
      "url": "https://example.com/images/headphones-2.jpg",
      "alt": "Side view",
      "isPrimary": false
    }
  ],
  "inventory": {
    "inStock": true,
    "quantity": 45,
    "warehouse": [
      { "location": "East", "quantity": 32 },
      { "location": "West", "quantity": 13 }
    ]
  },
  "metadata": {
    "createdAt": ISODate("2023-01-15"),
    "updatedAt": ISODate("2023-07-20")
  }
}
```

### User Profile System

```javascript
// User document
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "passwordHash": "hashed_password_here",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://example.com/avatars/john.jpg",
    "dateOfBirth": ISODate("1990-05-15"),
    "phoneNumber": "+1234567890"
  },
  "address": [
    {
      "type": "home",
      "isPrimary": true,
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    {
      "type": "work",
      "isPrimary": false,
      "street": "456 Office Ave",
      "city": "New York",
      "state": "NY",
      "zipCode": "10002",
      "country": "USA"
    }
  ],
  "paymentMethods": [
    {
      "type": "credit_card",
      "isPrimary": true,
      "provider": "Visa",
      "lastFourDigits": "4242",
      "expiryMonth": 12,
      "expiryYear": 2025
    }
  ],
  "preferences": {
    "language": "en",
    "currency": "USD",
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    },
    "theme": "light"
  },
  "security": {
    "mfaEnabled": true,
    "lastLogin": ISODate("2023-07-25T14:30:00Z"),
    "loginHistory": [
      {
        "timestamp": ISODate("2023-07-25T14:30:00Z"),
        "ip": "192.168.1.1",
        "device": "iPhone, iOS 16.5"
      }
    ]
  },
  "roles": ["user"],
  "status": "active",
  "createdAt": ISODate("2022-11-10"),
  "updatedAt": ISODate("2023-07-25")
}
```

### Blog Platform

```javascript
// Post document
{
  "_id": ObjectId("..."),
  "title": "Understanding MongoDB Aggregation",
  "slug": "understanding-mongodb-aggregation",
  "author": {
    "_id": ObjectId("..."),
    "name": "Jane Smith",
    "username": "janesmith",
    "avatar": "https://example.com/avatars/jane.jpg"
  },
  "content": "MongoDB aggregation framework is a powerful tool...",
  "summary": "Learn how to use MongoDB's aggregation framework for complex data analysis.",
  "categories": ["Database", "MongoDB", "Tutorial"],
  "tags": ["aggregation", "pipeline", "data-analysis", "mongodb"],
  "coverImage": "https://example.com/images/mongodb-aggregation.jpg",
  "status": "published",
  "featured": true,
  "commentCount": 12,
  "likes": 45,
  "views": 1250,
  "readingTime": "8 min",
  "publishedAt": ISODate("2023-06-15T10:00:00Z"),
  "updatedAt": ISODate("2023-06-20T14:30:00Z")
}

// Comment document
{
  "_id": ObjectId("..."),
  "postId": ObjectId("..."),
  "author": {
    "_id": ObjectId("..."),
    "name": "John Doe",
    "username": "johndoe",
    "avatar": "https://example.com/avatars/john.jpg"
  },
  "content": "This is a really helpful explanation of aggregation!",
  "likes": 3,
  "replies": [
    {
      "_id": ObjectId("..."),
      "author": {
        "_id": ObjectId("..."),
        "name": "Jane Smith",
        "username": "janesmith",
        "avatar": "https://example.com/avatars/jane.jpg"
      },
      "content": "Thanks, glad you found it useful!",
      "createdAt": ISODate("2023-06-16T09:45:00Z")
    }
  ],
  "createdAt": ISODate("2023-06-15T15:30:00Z"),
  "updatedAt": ISODate("2023-06-16T09:45:00Z")
}
```

### IoT Data Collection

```javascript
// Device document
{
  "_id": ObjectId("..."),
  "deviceId": "THERMO-1234",
  "type": "temperature_sensor",
  "location": {
    "building": "Warehouse A",
    "floor": 1,
    "room": "Storage Room 3",
    "coordinates": {
      "type": "Point",
      "coordinates": [-73.856077, 40.848447]
    }
  },
  "status": "active",
  "firmware": "v2.1.5",
  "lastMaintenance": ISODate("2023-03-15"),
  "installedAt": ISODate("2022-10-10")
}

// Sensor reading (in a time series collection)
{
  "deviceId": "THERMO-1234",
  "timestamp": ISODate("2023-07-26T14:30:00Z"),
  "readings": {
    "temperature": 22.5,
    "humidity": 45.2,
    "batteryLevel": 87
  },
  "alerts": [
    {
      "type": "battery_low",
      "threshold": 15,
      "value": 12,
      "timestamp": ISODate("2023-07-26T14:30:00Z")
    }
  ]
}
```

## Conclusion

MongoDB is a powerful and flexible NoSQL database that excels in handling various types of data with its document-oriented approach. Its flexible schema design, rich query capabilities, and scalable architecture make it suitable for a wide range of applications, from simple websites to complex enterprise systems.

Key takeaways:
1. MongoDB's document model aligns naturally with objects in application code
2. The flexible schema allows for agile development and adaptation to changing requirements
3. MongoDB scales horizontally through sharding for handling large data volumes
4. The aggregation framework provides powerful data processing capabilities
5. A rich ecosystem of tools and services (Atlas, Compass, Drivers) enhances the development experience

As you continue working with MongoDB, remember to focus on proper data modeling, indexing strategies, and query optimization to get the most out of this powerful database system.
