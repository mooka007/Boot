family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
arr = ["Hello", "Imad", "7", "sykono"]

def calculate(obj):
    sum = 0
    for x, y in obj.items():
        print(x, y)
        sum += y
    return sum


def salam(str):
    print(str)

# salam("Hello world")
# print(calculate(family))
str= ''
for v in arr:
    # if type str
    print(type(v))
    str += v + ' '
print(str)
