import requests
import psycopg2

# Database connection
def connect_db():
    return psycopg2.connect(
        host="localhost", 
        user="postgres", 
        password="0000", 
        dbname="ChallengeDAY4")

def create_countries_table(conn):
    with conn.cursor() as cursor:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Countries (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                capital VARCHAR(100) NOT NULL,
                flag VARCHAR(255) NOT NULL,
                subregion VARCHAR(100) NOT NULL,
                population INT NOT NULL
            )
        ''')
        conn.commit()

def fetch_random_countries():
    response = requests.get("https://restcountries.com/v3.1/all?fields=name,flags")
    if response.status_code == 200:
        countries = response.json()
        return countries
    else:
        print("Error fetching data from API.")
        return []

def save_countries_to_db(countries):
    conn = connect_db()
    create_countries_table(conn)
    with conn.cursor() as cursor:
        count = 0
        for country in countries:
            if count >= 10:
                break
            try:
                name = country["name"]["common"]
                capital = country["capital"][0] if "capital" in country else "N/A"
                flag = country["flags"]["svg"] if "flags" in country else "N/A"
                subregion = country["subregion"] if "subregion" in country else "N/A"
                population = country["population"] if "population" in country else 0

                cursor.execute('''
                    INSERT INTO Countries (name, capital, flag, subregion, population)
                    VALUES (%s, %s, %s, %s, %s)
                ''', (name, capital, flag, subregion, population))
                count += 1
            except Exception as e:
                print(f"An error occurred: {e}")
        conn.commit()
    conn.close()
    print("Data saved successfully.")

def display_countries():
    try:
        conn = psycopg2.connect(
            host="localhost",
            user="postgres",
            password="0000",
            dbname="ChallengeDAY4"
        )
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Countries")
            countries = cursor.fetchall()
            
            # Print column headers
            print("\n{:<5} {:<30} {:<20} {:<15} {:<20} {:<15}".format(
                "ID", "Name", "Capital", "Subregion", "Population", "Flag URL"
            ))
            print("-" * 100)
            
            # Print each country's data
            for country in countries:
                print("{:<5} {:<30} {:<20} {:<15} {:<20} {:<15}".format(
                    country[0],  # id
                    country[1],  # name
                    country[2],  # capital
                    country[4],  # subregion
                    f"{country[5]:,}",  # population (formatted with commas)
                    country[3][:15] + "..." if len(country[3]) > 15 else country[3]  # truncated flag URL
                ))
                
    except psycopg2.Error as e:
        print(f"Database error: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    display_countries()
    countries = fetch_random_countries()
    save_countries_to_db(countries[:10]) 