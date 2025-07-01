import psycopg2

class MenuManager:
    connection = psycopg2.connect(host="localhost", user="postgres", password="test", dbname="DAY4")
    cursor = connection.cursor()
    print("Database connection established in MenuManager.")

    @classmethod
    def get_by_name(cls, item_name):
        """Get a single item by its name from the Menu_Items table."""
        query = f"SELECT * FROM Menu_Items WHERE item_name = '{item_name}'"
        cls.cursor.execute(query)
        result = cls.cursor.fetchone()
        if result:
            item_id, name, price = result
            return {"item_id": item_id, "item_name": name, "item_price": price}
        return None

    @classmethod
    def all_items(cls):
        """Return a list of all items from the Menu_Items table."""
        query = "SELECT * FROM Menu_Items"
        cls.cursor.execute(query)
        items = cls.cursor.fetchall()
        return [{"item_id": item[0], "item_name": item[1], "item_price": item[2]} for item in items]

    @classmethod
    def close_connection(cls):
        cls.cursor.close()
        cls.connection.close()
        print("Database connection closed.") 