import random
import string
import sys


# Constants
ROWS = ['A', 'B', 'C', 'D', 'E']
COLS = ['1', '2', '3', '4', '5']
MAX_GUESSES = 10
NUM_SHIPS = 3

# Initialize boards
board = [[' ' for _ in COLS] for _ in ROWS]
ship_locations = []

# Helper Functions
def print_board(board, reveal=False):
    print("   " + " ".join(COLS))
    for idx, row in enumerate(board):
        display_row = []
        for col_idx, cell in enumerate(row):
            if reveal and (ROWS[idx], COLS[col_idx]) in ship_locations and cell != 'X':
                display_row.append('S')
            else:
                display_row.append(cell)
        print(f"{ROWS[idx]}  " + " ".join(display_row))

# ///////////////////////////////////////////////////////

def place_ships():
    locations = set()
    while len(locations) < NUM_SHIPS:
        row = random.choice(ROWS)
        col = random.choice(COLS)
        locations.add((row, col))
    return list(locations)

def parse_guess(guess):
    guess = guess.strip().upper()
    if len(guess) < 2:
        return None
    row = guess[0]
    col = guess[1:]
    if row in ROWS and col in COLS:
        return (row, col)
    return None

def already_guessed(guess, board):
    row_idx = ROWS.index(guess[0])
    col_idx = COLS.index(guess[1])
    return board[row_idx][col_idx] != ' '

def mark_guess(board, guess, hit):
    row_idx = ROWS.index(guess[0])
    col_idx = COLS.index(guess[1])
    board[row_idx][col_idx] = 'X' if hit else 'O'

# ///////////////////////////////////////////////////////
# Main Game Loop

def main():
    global ship_locations
    ship_locations = place_ships()
    guesses = 0
    hits = 0

    print("=== Welcome to Mini Battleship ===")
    print("Enter positions like B3. You have 10 guesses to sink 3 ships.")
    print("Type 'quit' to exit.\n")

    while guesses < MAX_GUESSES and hits < NUM_SHIPS:
        print_board(board)
        print(f"\nGuesses left: {MAX_GUESSES - guesses}")
        guess_input = input("Enter your guess: ")

        if guess_input.lower() == 'quit':
            print("You quit the game.")
            break

        guess = parse_guess(guess_input)
        if not guess:
            print("Invalid input. Format should be like A1, B4, etc.")
            continue

# ////////////////////////////////////////////////////////////////////
        
        if already_guessed(guess, board):
            print("You already guessed that location.")
            continue

        guesses += 1
        if guess in ship_locations:
            print("💥 Hit!")
            mark_guess(board, guess, True)
            hits += 1
        else:
            print("❌ Miss.")
            mark_guess(board, guess, False)

    # End of game
    print("\n=== Game Over ===")
    if hits == NUM_SHIPS:
        print("🎉 Congratulations! You sank all the ships!")
    else:
        print("😢 You ran out of guesses.")
    print("\nFinal Board:")
    print_board(board, reveal=True)

if __name__ == '__main__':
    main()
