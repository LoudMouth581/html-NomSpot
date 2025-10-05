import random

# Sample question data structure
questions = [
    {
        "type": "multiple_choice",
        "question": "What is 7 + 8?",
        "options": ["13", "14", "15", "16"],
        "answer": "15"
    },
    {
        "type": "true_false",
        "question": "Is 9 * 6 = 54? (True/False)",
        "answer": "True"
    },
    {
        "type": "multiple_choice",
        "question": "What is 12 / 4?",
        "options": ["2", "3", "4", "6"],
        "answer": "3"
    },
    {
        "type": "true_false",
        "question": "Is 5 squared equal to 30? (True/False)",
        "answer": "False"
    }
]

def ask_question(q):
    print("\n" + q["question"])
    if q["type"] == "multiple_choice":
        for idx, option in enumerate(q["options"], start=1):
            print(f"{idx}. {option}")
        while True:
            try:
                choice = int(input("Choose the correct option number: "))
                if 1 <= choice <= len(q["options"]):
                    selected = q["options"][choice - 1]
                    break
                else:
                    print("Invalid option number. Try again.")
            except ValueError:
                print("Please enter a number.")
        is_correct = (selected == q["answer"])
    elif q["type"] == "true_false":
        while True:
            choice = input("Enter True or False: ").strip().capitalize()
            if choice in ["True", "False"]:
                break
            else:
                print("Please enter True or False.")
        is_correct = (choice == q["answer"])
    else:
        is_correct = False  # Unsupported question type

    if is_correct:
        print("Correct! 🎉")
    else:
        print(f"Wrong! The correct answer is: {q['answer']}")
    return is_correct

def run_quiz():
    print("Welcome to the Arithmetic Quiz & Trivia Game!")
    random.shuffle(questions)
    score = 0

    for q in questions:
        if ask_question(q):
            score += 1

    print(f"\nGame over! Your score: {score} out of {len(questions)}")
    print("Thanks for playing!")

if __name__ == "__main__":
    run_quiz()
