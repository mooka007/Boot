import psycopg2
from getpass import getpass  

class AuthSystem:
    def __init__(self):
        self.logged_in = None
        self.connection = self._connect_to_db()
        
    def _connect_to_db(self):
        try:
            return psycopg2.connect(
                host="localhost",
                user="postgres",
                password="0000",
                database="auth_db"
            )
        except psycopg2.Error as e:
            print(f"Database connection failed: {e}")
            raise

    def login(self, username, password):
        with self.connection.cursor() as cursor:
            cursor.execute(
                "SELECT username FROM users WHERE username = %s AND password = %s",
                (username, password)
            )
            result = cursor.fetchone()
            if result:
                self.logged_in = username
                return True
            return False

    def user_exists(self, username):
        with self.connection.cursor() as cursor:
            cursor.execute(
                "SELECT username FROM users WHERE username = %s",
                (username,)
            )
            return cursor.fetchone() is not None

    def signup(self, username, password):
        with self.connection.cursor() as cursor:
            try:
                cursor.execute(
                    "INSERT INTO users (username, password) VALUES (%s, %s)",
                    (username, password)
                )
                self.connection.commit()
                return True
            except psycopg2.IntegrityError:
                print("Username already exists!")
                return False

    def run(self):
        while True:
            action = input("Enter 'login', 'signup', or 'exit': ").lower()
            
            if action == "exit":
                break
                
            elif action == "login":
                username = input("Username: ")
                password = getpass("Password: ")
                
                if self.login(username, password):
                    print(f"You are now logged in as {username}!")
                else:
                    print("Invalid credentials. Would you like to sign up? (yes/no)")
                    if input().lower() == "yes":
                        self.signup_flow()
                        
            elif action == "signup":
                self.signup_flow()
                
            else:
                print("Invalid command")

    def signup_flow(self):
        while True:
            username = input("Choose a username: ")
            if not self.user_exists(username):
                break
            print("Username taken. Try another.")
            
        password = getpass("Choose a password: ")
        if self.signup(username, password):
            print("Account created successfully! You can now login.")
        else:
            print("Failed to create account.")

    def __del__(self):
        if hasattr(self, 'connection'):
            self.connection.close()

if __name__ == "__main__":
    auth = AuthSystem()
    auth.run()