def polycarp(resting_days):
    counter = 0
    maxm = 0
    for i in resting_days:
        if i == 1:
            counter += 1
            maxm = max(maxm, counter)
        else:
            counter = 0
    return maxm

def eraser(list_inp):
    mark = 0
    for i in range(len(list_inp)):
        if list_inp[i] == 1:
            mark = 1

        else:
            mark = 0

def dragon(s, mat_inp):
    for strength, bonus in sorted(mat_inp.items()):
        if s < strength:
            return "NO"
        s += bonus
    return "YES"


s, n = map(int, input().split())
dragons = {}
for i in range(n):
    strength, bonus = map(int, input().split())
    dragons[strength] = bonus
print(dragon(s, dragons))

        
        

