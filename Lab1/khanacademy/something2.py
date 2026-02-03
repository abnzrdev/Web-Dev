def dragons(s, dragons_list):
    dragons_list.sort()
    for strength, bonus in dragons_list:
        if s > strength:
            s += bonus
        else:
            return "NO"
    return "YES"

s, n = map(int, input().split())
dragons_list = []
for i in range(n):
    x, y = map(int, input().split())
    dragons_list.append((x, y))
print(dragons(s, dragons_list))
