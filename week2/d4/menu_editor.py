import psycopg2
from menu_item import MenuItem
from menu_manager import MenuManager


def show_user_menu():
    
    while True:
        print("\n--- Menu Management ---")
        print("V - View an Item")
        print("A - Add an Item")
        print("D - Delete an Item")
        print("U - Update an Item")
        print("S - Show the Menu")  
        print("E - Exit")

        user_input = input("Please select an option: ").strip().upper()

        if user_input == 'V':
            view_item()
        elif user_input == 'A':
            add_item_to_menu()
        elif user_input == 'D':
            remove_item_from_menu()
        elif user_input == 'U':
            update_item_from_menu()
        elif user_input == 'S':
            show_restaurant_menu()
        elif user_input == 'E':
            print("Exiting the program. Here is the restaurant menu:")
            show_restaurant_menu()
            break
        else:
            print("Invalid option. Please try again.")




def view_item():
    """View an item by its name."""
    item_name = input("Enter the name of the item to view: ")
    item = MenuManager.get_by_name(item_name)
    if item:
        print(f"\nItem Details: ID: {item['item_id']}, Name: {item['item_name']}, Price: {item['item_price']}")
    else:
        print("Item not found.")




def add_item_to_menu():
    
    item_name = input("Enter the item's name: ")
    item_price = input("Enter the item's price: ")
    
    try:
        item_price = int(item_price)
        item = MenuItem(item_name, item_price)
        item.save()
        print("Item was added successfully.")
    except Exception as e:
        print(f"An error occurred while adding the item: {e}")





def remove_item_from_menu():
    
    item_name = input("Enter the name of the item you want to remove: ")
    item = MenuItem(item_name, 0)  
    
    try:
        item.delete()
        print("Item was deleted successfully.")
    except Exception as e:
        print(f"An error occurred while deleting the item: {e}")






def update_item_from_menu():
   
    old_name = input("Enter the name of the item you want to update: ")
    new_name = input("Enter the new name (leave blank if you don't want to change it): ")
    new_price_input = input("Enter the new price (leave blank if you don't want to change it): ")

    new_price = None
    if new_price_input:
        try:
            new_price = int(new_price_input)
        except ValueError:
            print("Invalid price entry. Please enter a valid number for the price.")
            return

    item = MenuItem(old_name, 0)  
    try:
        item.update(new_name if new_name else None, new_price)
        print("Item was updated successfully.")
    except Exception as e:
        print(f"An error occurred while updating the item: {e}")





def show_restaurant_menu():
    
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"ID: {item['item_id']}, Name: {item['item_name']}, Price: {item['item_price']}")            




if __name__ == "__main__":
    show_user_menu()