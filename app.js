const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "users-api-secretkey";
const apiKey = "users-api-key";
const app = express();
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "sql7.freemysqlhosting.net",
  user: "sql7613448",
  password: "EUStilBCn2",
  database: "sql7613448",
});

// Get all users
app.get("", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from user", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log("The data from user table are: \n", rows);
    });
  });
});

// Get an user by id
app.get("/:id", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE id = ?";
    const values = [req.params.id];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by name
app.get("/name/:name", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE name = ?";
    const values = [req.params.name];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by email

app.get("/email/:email", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE email = ?";
    const values = [req.params.email];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by phone_number
app.get("/phone_number/:phone_number", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE phone_number = ?";
    const values = [req.params.phone_number];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by birthdate
app.get("/birthdate/:birthdate", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE birthdate = ?";
    const values = [req.params.birthdate];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by city
app.get("/city/:city", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE city = ?";
    const values = [req.params.city];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by height
app.get("/height/:height", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE height = ?";
    const values = [req.params.height];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by number_cc
app.get("/number_cc/:number_cc", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE number_cc = ?";
    const values = [req.params.number_cc];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by gender
app.get("/gender/:gender", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE gender = ?";
    const values = [req.params.gender];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

// Get an user by shoe_size
app.get("/shoe_size/:shoe_size", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE shoe_size = ?";
    const values = [req.params.shoe_size];

    connection.query(sql, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      console.log("The data from user table are: \n", rows);
      return res.send(rows);
    });
  });
});

//DELETE SPECIFIC USER BY number_cc
app.delete("/number_cc/:number_cc", function (req, responce) {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return responce.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM user WHERE number_cc= ?",
      [req.params.number_cc],
      function (err, res) {
        if (err) {
          console.error("An error occurred:", err.message);
          responce.status(500).json({
            status: 500,
            message: "An error occurred: " + err.message,
          });
        } else {
          if (res.length) {
            console.log("User deleted successfully.");
            connection.query("DELETE FROM user WHERE number_cc= ?", [
              req.params.number_cc,
            ]);
            responce.status(200).json({
              message: "User deleted successfully.",
              data: res,
            });
          } else {
            console.log("User not found.");
            responce.status(404).send({ message: "User not found." });
          }
        }
      }
    );
  });
});

//DELETE SPECIFIC USER BY email
app.delete("/email/:email", function (req, responce) {
  pool.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM user WHERE email= ?",
      [req.params.email],
      function (err, res) {
        if (err) {
          console.error("An error occurred:", err.message);
          responce.status(500).json({
            status: 500,
            message: "An error occurred: " + err.message,
          });
        } else {
          if (res.length) {
            console.log("User deleted successfully.");
            connection.query("DELETE FROM user WHERE email= ?", [
              req.params.email,
            ]);
            responce.status(200).json({
              message: "User deleted successfully.",
              data: res,
            });
          } else {
            console.log("User not found.");
            responce.status(404).send({ message: "User not found." });
          }
        }
      }
    );
  });
});

//DELETE SPECIFIC USER BY id
app.delete("/:id", function (req, responce) {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return responce.status(401).json({ error: "Invalid API_KEY" });
  }
  pool.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM user WHERE id= ?",
      [req.params.id],
      function (err, res) {
        if (err) {
          console.error("An error occurred:", err.message);
          responce.status(500).json({
            status: 500,
            message: "An error occurred: " + err.message,
          });
        } else {
          if (res.length) {
            console.log("User deleted successfully.");
            connection.query("DELETE FROM user WHERE id= ?", [req.params.id]);
            responce.status(200).json({
              message: "User deleted successfully.",
              data: res,
            });
          } else {
            console.log("User not found.");
            responce.status(404).send({ message: "User not found." });
          }
        }
      }
    );
  });
});

//ADD Check if user already exists by number_cc and email
app.post("", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  const {
    name,
    email,
    phone_number,
    birthdate,
    city,
    height,
    number_cc,
    gender,
    shoe_size,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone_number ||
    !birthdate ||
    !city ||
    !height ||
    !number_cc ||
    !gender ||
    !shoe_size
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const params = req.body;
    const sql = "SELECT * FROM user WHERE number_cc = ? OR email = ?";
    const values = [params.number_cc, params.email];

    connection.query(sql, values, (err, rows) => {
      if (err) {
        console.error("An error occurred:", err.message);
        connection.release();
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (rows.length > 0) {
        connection.release();
        const existingUser = rows.find(
          (row) =>
            row.number_cc === params.number_cc || row.email === params.email
        );
        console.log("User already exists:", existingUser);
        return res.status(409).json({ message: "User already exists" });
      }

      connection.query("INSERT INTO user SET ?", params, (err, rows) => {
        connection.release(); // return the connection to pool

        if (err) {
          console.error("An error occurred:", err.message);
          return res
            .status(500)
            .json({ message: "An error occurred: " + err.message });
        }

        console.log("The data from user table are: \n", rows);
        return res
          .status(200)
          .json({ status: 200, message: "User created successfully." });
      });
    });
  });
});

//EDIT BY id
app.put("/:id", function (req, res) {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  const {
    name,
    email,
    phone_number,
    birthdate,
    city,
    height,
    number_cc,
    gender,
    shoe_size,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone_number ||
    !birthdate ||
    !city ||
    !height ||
    !number_cc ||
    !gender ||
    !shoe_size
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE id = ?";
    const values = [req.params.id];

    connection.query(sql, values, function (err, results) {
      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (results.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      const sql =
        "UPDATE user SET name = ?, email = ?, phone_number = ?, birthdate = ?, city = ?, height = ?, number_cc = ?, gender = ?, shoe_size = ? WHERE id = ?";
      const values = [
        name,
        email,
        phone_number,
        birthdate,
        city,
        height,
        number_cc,
        gender,
        shoe_size,
        req.params.id,
      ];

      connection.query(sql, values, (err, results) => {
        connection.release();

        if (err) {
          console.error("An error occurred:", err.message);
          return res
            .status(500)
            .json({ message: "An error occurred: " + err.message });
        }

        console.log("User updated successfully.");
        return res.status(200).json({ message: "User updated successfully." });
      });
    });
  });
});

//EDIT BY number_cc
app.put("/number_cc/:number_cc", function (req, res) {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }
  const {
    name,
    email,
    phone_number,
    birthdate,
    city,
    height,
    number_cc,
    gender,
    shoe_size,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone_number ||
    !birthdate ||
    !city ||
    !height ||
    !number_cc ||
    !gender ||
    !shoe_size
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to connect to database." });
    }

    const sql = "SELECT * FROM user WHERE number_cc = ?";
    const values = [req.params.number_cc];

    connection.query(sql, values, function (err, results) {
      if (err) {
        console.error("An error occurred:", err.message);
        return res
          .status(500)
          .json({ message: "An error occurred: " + err.message });
      }

      if (results.length === 0) {
        console.log("User not found.");
        return res.status(404).json({ message: "User not found." });
      }

      const sql =
        "UPDATE user SET name = ?, email = ?, phone_number = ?, birthdate = ?, city = ?, height = ?, number_cc = ?, gender = ?, shoe_size = ? WHERE number_cc = ?";
      const values = [
        name,
        email,
        phone_number,
        birthdate,
        city,
        height,
        number_cc,
        gender,
        shoe_size,
        req.params.number_cc,
      ];

      connection.query(sql, values, (err, results) => {
        connection.release();

        if (err) {
          console.error("An error occurred:", err.message);
          return res
            .status(500)
            .json({ message: "An error occurred: " + err.message });
        }

        console.log("User updated successfully.");
        return res.status(200).json({ message: "User updated successfully." });
      });
    });
  });
});

app.use(express.json());

//Register
app.post("/register", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }

  const { name, email, password } = req.body;

  // Verificar se o user já existe na base de dados
  pool.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
        return res.status(409).json({ message: "User already exist" });
      }

      // Hash da senha do user antes de inserir na base de dados
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Inserir o novo user na base de dados
      pool.query(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (error, results) => {
          if (error) throw error;

          // Gerar o token JWT
          const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "90d" });

          return res
            .status(201)
            .json({ message: "User created successfully.", token });
        }
      );
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const apiKeyHeader = req.headers["apikey"];

  if (apiKeyHeader !== apiKey) {
    return res.status(401).json({ error: "Invalid API_KEY" });
  }

  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Verificar se a password é válida
      const user = results[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Gerar o token JWT
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "90d" });

      return res.status(200).json({ message: "Login successfully", token });
    }
  );
});

// Listen on environment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`));
