import { faker } from '@faker-js/faker';
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const DB_NAME = "ecommerce";

// Utility
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);

    const customersCol = db.collection("Customers");
    const productsCol = db.collection("Products");
    const ordersCol = db.collection("Orders");
    const reviewsCol = db.collection("Reviews");

    // 🧹 साफ करो पहले (optional for fresh seed)
    await Promise.all([
      customersCol.deleteMany({}),
      productsCol.deleteMany({}),
      ordersCol.deleteMany({}),
      reviewsCol.deleteMany({})
    ]);

    console.log("🧹 Old data cleared");

    // --------------------------
    // 👤 CUSTOMERS
    // --------------------------
    const customers = Array.from({ length: 80 }).map(() => {
      return {
        _id: new ObjectId(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number("9#########"),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          pincode: faker.string.numeric(6)
        },
        registeredDate: faker.date.past(),
        totalSpent: 0 // will update later
      };
    });

    // --------------------------
    // 📦 PRODUCTS
    // --------------------------
    const categories = ["Electronics", "Appliances", "Fashion", "Mobile", "Sports", "Home Decor"];

    const products = Array.from({ length: 60 }).map(() => {
      return {
        _id: new ObjectId(),
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        category: getRandom(categories),
        price: Number(faker.commerce.price({ min: 500, max: 60000 })),
        stock: faker.number.int({ min: 10, max: 200 }),
        tags: faker.helpers.arrayElements(
          ["new", "popular", "discount", "limited", "premium"],
          faker.number.int({ min: 1, max: 3 })
        ),
        ratings: {
          average: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
          count: faker.number.int({ min: 10, max: 500 })
        },
        createdAt: new Date()
      };
    });

    // --------------------------
    // 🧾 ORDERS
    // --------------------------
    const orders = [];

    for (let i = 0; i < 120; i++) {
      const customer = getRandom(customers);

      const itemCount = faker.number.int({ min: 1, max: 3 });

      let items = [];
      let total = 0;

      for (let j = 0; j < itemCount; j++) {
        const product = getRandom(products);
        const qty = faker.number.int({ min: 1, max: 3 });

        items.push({
          productId: product._id,
          productName: product.name,
          quantity: qty,
          price: product.price
        });

        total += product.price * qty;
      }

      customer.totalSpent += total;

      orders.push({
        _id: new ObjectId(),
        orderId: "ORD-" + faker.string.alphanumeric(6).toUpperCase(),
        customerId: customer._id,
        orderDate: faker.date.recent({ days: 60 }),
        status: getRandom(["pending", "shipped", "delivered", "cancelled"]),
        items,
        totalAmount: total,
        shippingAddress: customer.address,
        paymentMethod: getRandom(["Credit Card", "UPI", "Cash On Delivery"]),
        createdAt: new Date()
      });
    }

    // --------------------------
    // ⭐ REVIEWS
    // --------------------------
    const reviews = Array.from({ length: 100 }).map(() => {
      const customer = getRandom(customers);
      const product = getRandom(products);

      return {
        _id: new ObjectId(),
        productId: product._id,
        productName: product.name,
        customerId: customer._id,
        customerName: customer.name,
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        verified: faker.datatype.boolean(),
        helpful: faker.number.int({ min: 0, max: 50 }),
        reviewDate: faker.date.recent({ days: 30 })
      };
    });

    // --------------------------
    // 💾 INSERT DATA
    // --------------------------
    await Promise.all([
      customersCol.insertMany(customers),
      productsCol.insertMany(products),
      ordersCol.insertMany(orders),
      reviewsCol.insertMany(reviews)
    ]);

    console.log("🎉 Database Seeded Successfully!");
    console.log(`✔ Customers: ${customers.length}`);
    console.log(`✔ Products: ${products.length}`);
    console.log(`✔ Orders: ${orders.length}`);
    console.log(`✔ Reviews: ${reviews.length}`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
    console.log("🔌 Connection Closed");
  }
}

run();
