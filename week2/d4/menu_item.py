import psycopg2

class MenuItem:

    def __init__(self, name, price):
        self.name = name
        self.price = price
        
        try:
            self.connection = psycopg2.connect(
                host="localhost",
                user="postgres",
                password="0000",
                database="d4"  
            )
            self.cursor = self.connection.cursor()
            
            self.cursor.execute("SELECT version();")
            
            print("✅ Database connection established successfully!")
            
        except psycopg2.Error as e:
            print("❌ Database connection failed!")
            print(f"Error details: {e}")
            raise 

    def save(self):
        query = f"insert into Menu_items (item_name, item_price) VALUES ('{self.name}', {self.price})"
        try:
            self.cursor.execute(query)
            self.connection.commit()
            print(f"{self.name } saved successfully! ")
        except Exception as e :
            print(f"Error saving {self.name}: {e}")

    def delete(self):
        query = f"DELETE FROM Menu_items WHERE item_name = '{self.name}'"
        try:
            self.cursor.execute(query)
            self.connection.commit()
            print(f"{self.name} deleted successfully! ")
        except Exception as e :
            print(f"Error deleting {self.name}: {e}")

    def update(self, new_name=None, new_price=None):
        updates = []
        if new_name:
            updates.append(f"item_name = '{new_name}'")
        if new_price is not None:
            updates.append(f"item_price = {new_price}")

        if updates:
            query = f"UPDATE Menu_items SET {', '.join(updates)} WHERE item_name = '{self.name}'"
            try:
                self.cursor.execute(query)
                self.connection.commit()
                print(f"{self.name} updated successfully! ")
            except Exception as e:
                print(f"Error updating {self.name}: {e}")

    def close_connection (self):
        self.cursor.close()
        self.connection.close()
        print("Database connection closed successfully!")
    

if __name__ == "__main__":
    try:
        # Test the class
        item = MenuItem("Test Pizza", 8)
        item.save()
        item.update(new_name="Deluxe Pizza", new_price=10)
        item.delete()
    finally:
        if 'item' in locals():
            item.close_connection()